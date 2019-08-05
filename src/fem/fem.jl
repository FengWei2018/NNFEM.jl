using SparseArrays
export Domain,GlobalData,updateStates!,updateDomainStateBoundary!,getExternalForce!


mutable struct GlobalData
    state::Array{Float64}    #u
    Dstate::Array{Float64}   #uk
    velo::Array{Float64}     #∂u
    acce::Array{Float64}     #∂∂u
    time::Float64
    M::Union{SparseMatrixCSC{Float64,Int64},Array{Float64}}
    Mlumped::Array{Float64}
    MID::Array{Float64}

    EBC_func::Union{Function,Nothing}  #time dependent Dirichlet boundary condition
    FBC_func::Union{Function,Nothing}  #time force load boundary condition
    
end

function GlobalData(state::Array{Float64},Dstate::Array{Float64},velo::Array{Float64},acce::Array{Float64}, neqs::Int64,
        EBC_func::Union{Function, Nothing}=nothing, FBC_func::Union{Function, Nothing}=nothing)
    time = 0.0
    M = Float64[]
    Mlumped = Float64[]
    MID = Float64[]
    GlobalData(state, Dstate, velo, acce, time, M, Mlumped, MID, EBC_func, FBC_func)
end


mutable struct Domain
    nnodes::Int64
    nodes::Array{Float64}
    neles::Int64
    elements::Array
    ndims::Int64
    state::Array{Float64}
    Dstate::Array{Float64}
    LM::Array{Array{Int64}}
    DOF::Array{Array{Int64}}
    ID::Array{Int64}
    neqs::Int64
    eq_to_dof::Array{Int64}
    dof_to_eq::Array{Bool}
    EBC::Array{Int64}  # Dirichlet boundary condition
    g::Array{Float64}  # Value for Dirichlet boundary condition
    FBC::Array{Int64}  # Nodal force boundary condition
    fext::Array{Float64}  # Value for Nodal force boundary condition
    time::Float64
    history::Dict{String, Array{Array{Float64}}}
end

@doc """
    Creating a finite element domain
    nodes: n by 2 float 64, node coordinates
    elements: element list
    ndims: 2
    EBC: n by 2 Int64, nodal Dirichlet boundary condition, -1 time-independent, -2 time-dependent
    g: n by 2 Float64, values for nodal time-independent Dirichlet boundary condition
    FBC: n by 2 Int64, nodal force boundary condition, -1 time-independent, -2 time-dependent
    f: n by 2 Float64, values for nodal force time independent force boundary condition

"""->
function Domain(nodes::Array{Float64}, elements::Array, ndims::Int64, EBC::Array{Int64}, g::Array{Float64}, FBC::Array{Int64}, f::Array{Float64})
    nnodes = size(nodes,1)
    neles = size(elements,1)
    state = zeros(nnodes * ndims)
    Dstate = zeros(nnodes * ndims)
    LM = Array{Int64}[]
    DOF = Array{Int64}[]
    ID = Int64[]
    neqs = 0
    eq_to_dof = Int64[]
    dof_to_eq = zeros(Bool, nnodes * ndims)
    fext = Float64[]
    
    history = Dict("state"=>Array{Float64}[], "acc"=>Array{Float64}[], "fint"=>Array{Float64}[],
                "fext"=>Array{Float64}[], "strain"=>[], "stress"=>[])
    domain = Domain(nnodes, nodes, neles, elements, ndims, state, Dstate, LM, DOF, ID, neqs, eq_to_dof, dof_to_eq, EBC, g, FBC, fext, 0.0, history)
    setDirichletBoundary!(domain, EBC, g)
    setNeumannBoundary!(domain, FBC, f)
    domain
end

function commitHistory(domain::Domain)
    for e in domain.elements
        commitHistory(e)
    end
    
    # 1D, nstrain=1; 2D, nstrain=3
    eledim = domain.elements[1].eledim
    nstrain = div((eledim + 1)*eledim, 2)
    ngp = domain.neles * length(domain.elements[1].weights)
    if nstrain==1
        strain = zeros(ngp)
        stress = zeros(ngp)
        k = 1
        for e in domain.elements
            for igp in e.mat
                strain[k] = igp.ε0
                stress[k] = igp.σ0
                k += 1
            end
        end
    else
        strain = zeros(ngp, nstrain)
        stress = zeros(ngp, nstrain)
        k = 1
        for e in domain.elements
            for igp in e.mat
                strain[k,:] = igp.ε0
                stress[k,:] = igp.σ0
                k += 1
            end
        end
    end

    push!(domain.history["strain"], strain)
    push!(domain.history["stress"], stress)
end



@doc """

    :param EBC[n, d] is the boundary condition of of node n's dth freedom,
        -1 means fixed Dirichlet boundary nodes
        -2 means time dependent Dirichlet boundary nodes
    :param g[n, d] is the fixed Dirichlet boundary value

    :param nbc:
    :return:
""" -> 
function setDirichletBoundary!(self::Domain, EBC::Array{Int64}, g::Array{Float64})

    # ID(n,d) is the global equation number of node n's dth freedom, -1 means no freedom
    nnodes, ndims = self.nnodes, self.ndims
    neles, elements = self.neles, self.elements
    ID = zeros(Int64, nnodes, ndims) .- 1

    eq_to_dof, dof_to_eq = Int64[], zeros(Bool, nnodes * ndims)
    neqs = 0
    for idof = 1:ndims
      for inode = 1:nnodes
          if (EBC[inode, idof] == 0)
              neqs += 1
              ID[inode, idof] = neqs
              push!(eq_to_dof,inode + (idof-1)*nnodes)
              dof_to_eq[(idof - 1)*nnodes + inode] = true
          elseif (EBC[inode, idof] == -1)
              self.state[inode + (idof-1)*nnodes] = g[inode, idof]
          end
      end
    end

    self.ID, self.neqs, self.eq_to_dof, self.dof_to_eq = ID, neqs, eq_to_dof, dof_to_eq


    # LM(e,d) is the global equation number of element e's d th freedom
    LM = Array{Array{Int64}}(undef, neles)
    for iele = 1:neles
      el_nodes = getNodes(elements[iele])
      ieqns = ID[el_nodes, :][:]
      LM[iele] = ieqns
    end
    self.LM = LM

    # DOF(e,d) is the global dof number of element e's d th freedom

    DOF = Array{Array{Int64}}(undef, neles)
    for iele = 1:neles
      el_nodes = getNodes(elements[iele])
      DOF[iele] = [el_nodes;[idof + nnodes for idof in el_nodes]]
    end
    self.DOF = DOF
    
end


@doc """

    :param FBC[n, d] is the boundary condition of node n's dth freedom,
        -1 means fixed force load boundary condition
        -2 means time dependent force load boundary condition
    :param f[n, d] is the fixed force load value
    :return:
""" -> 
function setNeumannBoundary!(self::Domain, FBC::Array{Int64}, f::Array{Float64})

    fext = zeros(Float64, self.neqs)
    # ID(n,d) is the global equation number of node n's dth freedom, -1 means no freedom

    nnodes, ndims, ID = self.nnodes, self.ndims, self.ID
    for idof = 1:ndims
      for inode = 1:nnodes
          if (FBC[inode, idof] == -1)
              @assert ID[inode, idof] > 0
              fext[ID[inode, idof]] += f[inode, idof]
          end
        end
    end
    self.fext = fext
end


@doc """
    :param disp: neqs array
    :param vel : neqs array

    update Dstate in Domain, update state in Domain
    :return:
""" ->
function updateStates!(self::Domain, globaldat::GlobalData)
    # self.Dstate = self.state[:]
    # self.Dstate[self.eq_to_dof] = globaldat.Dstate[:]
    self.state[self.eq_to_dof] = globaldat.state[:]

    #@show " 1 ",  self.state
    
    self.time = globaldat.time
    push!(self.history["state"], copy(self.state))
    push!(self.history["acc"], copy(globaldat.acce))

    updateDomainStateBoundary!(self, globaldat)
    #@show " 2 ",  self.state


    
    self.Dstate = self.state[:]
end

@doc """
    Update domain time dependent boundary information.
""" ->
function updateDomainStateBoundary!(self::Domain, globaldat::GlobalData)
    if globaldat.EBC_func != nothing
        disp, acce = globaldat.EBC_func(globaldat.time) # user defined time-dependent boundary
        dof_id = 0
        #update state of all nodes
        for idof = 1:self.ndims
            for inode = 1:self.nnodes
                if (self.EBC[inode, idof] == -2)
                    dof_id += 1
                    self.state[inode + (idof-1)*self.nnodes] = disp[dof_id]
                end
            end
        end
    end

    if globaldat.FBC_func != nothing
        ID = self.ID
        nodal_force = globaldat.FBC_func(globaldat.time) # user defined time-dependent boundary
        # @info nodal_force
        dof_id = 0
        #update fext for active nodes (length of neqs)
        for idof = 1:self.ndims
            for inode = 1:self.nnodes
                if (self.FBC[inode, idof] == -2)
                    dof_id += 1
                    @assert ID[inode, idof] > 0
                    self.fext[ID[inode, idof]] = nodal_force[dof_id]
                end
            end
        end
    end
end

@doc """
    the external force include the Dirichlet boundary condition effect
""" ->
function getExternalForce!(self::Domain, globaldat::GlobalData)
    fext = self.fext[:]
    if globaldat.EBC_func != nothing
        MID = globaldat.MID
        _, acce = globaldat.EBC_func(globaldat.time)

        fext -= MID * acce
    end
    fext
end


function getCoords(self::Domain, el_nodes::Array{Int64})
    return self.nodes[el_nodes, :]
end

@doc """
    :param el_nodes: 1d array
    :return: the corresponding dofs ids, u0,u1, .., v0, v1, ..
""" ->
function getDofs(self::Domain, iele::Int64)    
    return self.DOF[iele]
end

function getEqns(self::Domain, iele::Int64)
    return self.LM[iele]
end

function getState(self::Domain, el_dofs::Array{Int64})
    return self.state[el_dofs]
end

function getDstate(self::Domain, el_dofs::Array{Int64})
    return self.Dstate[el_dofs]
end
