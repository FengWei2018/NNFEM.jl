var documenterSearchIndex = {"docs":
[{"location":"api/#API-Reference-1","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"api/#Elements-1","page":"API Reference","title":"Elements","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"Modules = [NNFEM]\nPages   = [\"FiniteStrainContinuum.jl\", \"SmallStrainContinuum.jl\", \"FiniteStrainTruss.jl\"]","category":"page"},{"location":"api/#NNFEM.FiniteStrainContinuum","page":"API Reference","title":"NNFEM.FiniteStrainContinuum","text":"FiniteStrainContinuum(coords::Array{Float64}, elnodes::Array{Int64}, props::Dict{String, Any}, ngp::Int64=2)\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.FiniteStrainContinuum","page":"API Reference","title":"NNFEM.FiniteStrainContinuum","text":"FiniteStrainContinuum\n\nConstructs a finite strain element. \n\neledim: spatial dimension of the element (default = 2).\nmat: constitutive law, a length #elem vector of materials such as PlaneStress\nelnodes: the node indices in this finite element, an integer array \nprops: property dictionary \ncoords: coordinates of the vertices of the element\ndhdx, weights, hs: data for integral \nstress: stress at each quadrature points\n\nExample\n\n#   Local degrees of freedom \n#   4 ---- 3\n#\n#   1 ---- 2\n\nnx = 10\nny = 5\nh = 0.1\nelement = FiniteStrainContinuum[]\nprop = Dict(\"name\"=> \"PlaneStrain\", \"rho\"=> 0.0876584, \"E\"=>0.07180760098, \"nu\"=>0.4)\nfor j = 1:ny\n    for i = 1:nx \n        n = (nx+1)*(j-1) + (i-1)+1\n        elnodes = [n, n + 1, n + 1 + (nx + 1), n + (nx + 1)]\n        ngp = 3 # 3 x 3 Gauss points per element \n        coords = [(i-1)*h (j-1)*h\n                    i*h (j-1)*h\n                    i*h j*h\n                    (i-1)*h j*h]\n        push!(element, FiniteStrainContinuum(coords,elnodes, prop, ngp))\n    end\nend\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.SmallStrainContinuum","page":"API Reference","title":"NNFEM.SmallStrainContinuum","text":"SmallStrainContinuum(coords::Array{Float64}, elnodes::Array{Int64}, props::Dict{String, Any}, ngp::Int64=2)\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.SmallStrainContinuum","page":"API Reference","title":"NNFEM.SmallStrainContinuum","text":"SmallStrainContinuum\n\nConstructs a small strain element. \n\neledim: spatial dimension of the element (default = 2).\nmat: constitutive law, a length #elem vector of materials such as PlaneStress\nelnodes: the node indices in this finite element, an integer array \nprops: property dictionary \ncoords: coordinates of the vertices of the element\ndhdx: list of ngp shape functions for first order derivatives nabla phi(x) (ndof×2) on the Gaussian points\nweights: weight vector of length n_gauss_points, for numerical quadrature\nhs: list of ngp shape functions for function values phi(x) (length ndof vectors) on the Gaussian points\nstress: stress at each quadrature points; this field is reserved for visualization. \n\nExample\n\n#   Local degrees of freedom \n#   4 ---- 3\n#\n#   1 ---- 2\n\nnx = 10\nny = 5\nh = 0.1\nelement = SmallStrainContinuum[]\nprop = Dict(\"name\"=> \"PlaneStrain\", \"rho\"=> 0.0876584, \"E\"=>0.07180760098, \"nu\"=>0.4)\nfor j = 1:ny\n    for i = 1:nx \n        n = (nx+1)*(j-1) + (i-1)+1\n        elnodes = [n, n + 1, n + 1 + (nx + 1), n + (nx + 1)]\n        ngp = 3 # 3 x 3 Gauss points per element \n        coords = [(i-1)*h (j-1)*h\n                    i*h (j-1)*h\n                    i*h j*h\n                    (i-1)*h j*h]\n        push!(element, SmallStrainContinuum(coords,elnodes, prop, ngp))\n    end\nend\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.commitHistory-Tuple{SmallStrainContinuum}","page":"API Reference","title":"NNFEM.commitHistory","text":"commitHistory(elem::SmallStrainContinuum)\n\nUpdates the historic parameters in the material properties. \n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getBodyForce-Tuple{SmallStrainContinuum,Array{Float64,2}}","page":"API Reference","title":"NNFEM.getBodyForce","text":"getBodyForce(elem::SmallStrainContinuum, fvalue::Array{Float64,2})\n\nReturns the body force int_e mathbffcdot delta mathbfu d mathbfx fvalue is a n_gausstimes 2 matrix. \n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getGaussPoints-Tuple{SmallStrainContinuum}","page":"API Reference","title":"NNFEM.getGaussPoints","text":"getGaussPoints(elem::SmallStrainContinuum)\n\nReturns the Gauss quadrature nodes of the element\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getInternalForce-Tuple{SmallStrainContinuum,Array{Float64,N} where N,Array{Float64,N} where N,Float64}","page":"API Reference","title":"NNFEM.getInternalForce","text":"getInternalForce(elem::SmallStrainContinuum, state::Array{Float64}, Dstate::Array{Float64}, Δt::Float64)\n\nReturns the internal force term. state and Dstate are restriction of full state variables to this element. \n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getMassMatrix-Tuple{SmallStrainContinuum}","page":"API Reference","title":"NNFEM.getMassMatrix","text":"getMassMatrix(elem::SmallStrainContinuum)\n\nReturns the mass and lumped (diagonal) mass matrix of this element. \n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getNodes-Tuple{SmallStrainContinuum}","page":"API Reference","title":"NNFEM.getNodes","text":"getNodes(elem::SmallStrainContinuum)\n\nAlias for elem.elnodes\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getStiffAndForce-Tuple{SmallStrainContinuum,Array{Float64,N} where N,Array{Float64,N} where N,Float64}","page":"API Reference","title":"NNFEM.getStiffAndForce","text":"getStiffAndForce(elem::SmallStrainContinuum, state::Array{Float64}, Dstate::Array{Float64}, Δt::Float64)\n\nReturns the internal force term and the stiffness matrix. state and Dstate are restriction of full state variables to this element. \n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.getStrain-Tuple{SmallStrainContinuum,Array{Float64,N} where N}","page":"API Reference","title":"NNFEM.getStrain","text":"getStrain(elem::SmallStrainContinuum, state::Array{Float64})\n\nReturns the strain of this element.  state is restricted to this variable. \n\n\n\n\n\n","category":"method"},{"location":"api/#Materials-1","page":"API Reference","title":"Materials","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"Modules = [NNFEM]\nPages   = [\"PlaneStress.jl\", \"PlaneStrain.jl\", \"PlaneStressIncompressibleRivlinSaunders.jl\",\n            \"PlaneStressPlasticity\"]","category":"page"},{"location":"api/#NNFEM.PlaneStress","page":"API Reference","title":"NNFEM.PlaneStress","text":"PlaneStress\n\nCreates a plane stress element\n\nH: Linear elasticity matrix, 3times3\nE: Young's modulus\nν: Poisson's ratio \nρ: density \nσ0: stress at the last time step \nσ0_: (for internal use), stress to be updated in commitHistory\nε0: strain at the last time step \nε0_: (for internal use), strain to be updated in commitHistory\n\nExample\n\nprop = Dict(\"name\"=> \"PlaneStress\", \"rho\"=> 0.0876584, \"E\"=>0.07180760098, \"nu\"=>0.4)\nmat = PlaneStress(prop)\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.PlaneStress-Tuple{Dict{String,Any}}","page":"API Reference","title":"NNFEM.PlaneStress","text":"PlaneStress(prop::Dict{String, Any})\n\nprop should contain at least the following three fields: E, nu, rho\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.PlaneStrain","page":"API Reference","title":"NNFEM.PlaneStrain","text":"PlaneStrain\n\nCreates a plane strain element\n\nH: Linear elasticity matrix, 3times3\nE: Young's modulus\nν: Poisson's ratio \nρ: density \nσ0: stress at the last time step \nσ0_: (for internal use), stress to be updated in commitHistory\nε0: strain at the last time step \nε0_: (for internal use), strain to be updated in commitHistory\n\nExample\n\nprop = Dict(\"name\"=> \"PlaneStrain\", \"rho\"=> 0.0876584, \"E\"=>0.07180760098, \"nu\"=>0.4)\nmat = PlaneStrain(prop)\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.PlaneStrain-Tuple{Dict{String,Any}}","page":"API Reference","title":"NNFEM.PlaneStrain","text":"PlaneStrain(prop::Dict{String, Any})\n\nprop should contain at least the following three fields: E, nu, rho\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.PlaneStressIncompressibleRivlinSaunders","page":"API Reference","title":"NNFEM.PlaneStressIncompressibleRivlinSaunders","text":"Pascon, João Paulo.  \"Large deformation analysis of plane-stress hyperelastic problems via triangular membrane finite elements.\"  International Journal of Advanced Structural Engineering (2019): 1-20.\n\n\n\n\n\n","category":"type"},{"location":"api/#Assembly-1","page":"API Reference","title":"Assembly","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"Domain\nGlobalData\ncommitHistory\nsetDirichletBoundary!\nsetNeumannBoundary!\nupdateStates!\nupdateDomainStateBoundary!\ngetExternalForce!","category":"page"},{"location":"api/#NNFEM.Domain","page":"API Reference","title":"NNFEM.Domain","text":"Domain\n\nDate structure for the computatational domain.\n\nnnodes: Int64, number of nodes (each quadratical quad element has 9 nodes)\nnodes: Float64[nnodes, ndims], coordinate array of all nodes\nneles: number of elements \nelements: a list of neles element arrays, each element is a struct \nndims: Int64, dimension of the problem space \nstate: a matrix of size nnodes×ndims. Current displacement of all nodal freedoms, state[1:nnodes] are for the first direction.\nDstate: nnodes×ndims. Previous displacement of all nodal freedoms, Dstate[1:nnodes] are for the first direction.\nLM:  Int64[neles][ndims], LM(e,d) is the global equation number (active freedom number) of element e's d th freedom,         -1 means fixed (time-independent) Dirichlet        -2 means time-dependent Dirichlet\nDOF: a matrix of size neles×ndims, DOF(e,d) is the global freedom number of element e's d th freedom\nID:  a matrix of size nnodes×ndims. ID(n,d) is the equation number (active freedom number) of node n's d-th freedom,         -1 means fixed (time-independent) Dirichlet        -2 means time-dependent Dirichlet\nneqs:  Int64,  number of equations, a.k.a., active freedoms\neq_to_dof:  an integer vector of length neqs, map from to equation number (active freedom number) to the freedom number (Int64[1:nnodes] are for the first direction) \ndof_to_eq:  a bolean array of size nnodes×ndims, map from freedom number(Int64[1:nnodes] are for the first direction) to booleans (active freedoms(equation number) are true)\nEBC:  Int64[nnodes, ndims], EBC[n,d] is the displacement boundary condition of node n's dth freedom,          -1 means fixed(time-independent) Dirichlet boundary nodes          -2 means time-dependent Dirichlet boundary nodes\ng:  Float64[nnodes, ndims], values for fixed(time-independent) Dirichlet boundary conditions of node n's dth freedom,\nFBC: Int64[nnodes, ndims], FBC[n,d] is the force load boundary condition of node n's dth freedom,          -1 means constant(time-independent) force load boundary nodes          -2 means time-dependent force load boundary nodes\nfext:  Float64[neqs], constant (time-independent) force load boundary conditions for these freedoms\ntime: Float64, current time\nnpoints: Int64, number of points (each quadratical quad element has 4 points, npoints==nnodes, when porder==1)\nnode_to_point: Int64[nnodes]:map from node number to point point, -1 means the node is not a geometry point\n\nAuxilliry Data Structures\n\nii_stiff: Int64[], first index of the sparse matrix representation of the stiffness matrix\njj_stiff: Int64[], second index of the sparse matrix representation of the stiffness matrix\nvv_stiff_ele_indptr: Int64[], Int64[e] is the first index entry for the e's element of the sparse matrix representation of the stiffness matrix\nvv_stiff: Float64[], values of the sparse matrix representation of the stiffness matrix\nii_dfint_dstress: Int64[], first index of the sparse matrix representation of the dfint_dstress matrix \njj_dfint_dstress: Int64[], second index of the sparse matrix representation of the dfint_dstress matrix\nvv_dfint_dstress_ele_indptr: Int64[], Int64[e] is the first index entry for the e's element of the sparse matrix representation of the dfint_dstress matrix\nvv_dfint_dstress: Float64[], values of the sparse matrix representation of the dfint_dstress matrix \nii_dstrain_dstate: Int64[], first index of the sparse matrix representation of the dstrain_dstate matrix\njj_dstrain_dstate: Int64[], second index of the sparse matrix representation of the dstrain_dstate matrix\nvv_dstrain_dstate_ele_indptr: Int64[], Int64[e] is the first index entry for the e's element of the sparse matrix representation of the stiffness matrix\nvv_dstrain_dstate: Float64[], values of the sparse matrix representation of the dstrain_dstate matrix\nhistory: Dict{String, Array{Array{Float64}}}, dictionary between string and its time-histories quantity Float64[ntime][]\n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.GlobalData","page":"API Reference","title":"NNFEM.GlobalData","text":"GlobalData\n\nStore data for finite element updates. Assume the problem has n freedoms,\n\nstate: a vector of length n. Displacement array at the current time, only for active freedoms.  The ordering is based on the equation number.\nDstate: a vector of length n. Displacement array at the previous time.\nvelo: a vector of length n. Velocity array at the current time.\nacce: a vector of length n. Acceleration array at the current time.\ntime: float, current time.\nM: a matrix of size ntimes n spares mass matrix\nMlumped: a vector of length n lumped mass array\nMID: Float64[n, nd1] off-diagonal part of the mass matrix, between the active freedoms and the time-dependent Dirichlet freedoms, assume there are nd time-dependent Dirichlet freedoms\nEBC_func: displacement d, velocity v, and acceleration a from time-dependent Dirichlet boundary conditions \n\nd v a = textEBC_func(time)\n\nThe length of each output is the same as number of \"-2\" in EBC array. The ordering is direction major, i.e., u_1 u_3 ldots v_1 v_3 ldots \n\nFBC_func: time-dependent load boundary condition. \n\nf = textFBC_func(time)\n\nHere f is a vector. Its length is the same as number of \"-2\" in FBC array. The ordering is direction major, i.e., u_1 u_3 ldots v_1 v_3 ldots \n\n\n\n\n\n","category":"type"},{"location":"api/#NNFEM.commitHistory","page":"API Reference","title":"NNFEM.commitHistory","text":"commitHistory(elem::SmallStrainContinuum)\n\nUpdates the historic parameters in the material properties. \n\n\n\n\n\ncommitHistory(domain::Domain)\n\nUpdate current step strain and stress in the history map of the domain.  This is essential for visualization and time dependent constitutive relations. \n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.setDirichletBoundary!","page":"API Reference","title":"NNFEM.setDirichletBoundary!","text":"setDirichletBoundary!(self::Domain, EBC::Array{Int64}, g::Array{Float64})\n\nBookkeepings for Dirichlet boundary conditions. Only called once in the constructor of domain.  It updates the fixed (time-independent Dirichlet boundary) state entries and builds both LM and DOF arrays.\n\nself: Domain\nEBC:  Int64[nnodes, ndims], EBC[n,d] is the displacement boundary condition of node n's dth freedom,\n∘ -1 means fixed(time-independent) Dirichlet boundary nodes\n∘ -2 means time-dependent Dirichlet boundary nodes\ng:  Float64[nnodes, ndims], values for fixed (time-independent) Dirichlet boundary conditions of node n's dth freedom,\n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.setNeumannBoundary!","page":"API Reference","title":"NNFEM.setNeumannBoundary!","text":"Bookkeepings for Dirichlet boundary conditions. Only called once in the constructor of domain.  It updates the fixed (time-independent Neumann boundary) state entries and builds both LM and DOF arrays.\n\nself: Domain\nFBC:  Int64[nnodes, ndims], FBC[n,d] is the displacement boundary condition of node n's dth freedom,\n∘ -1 means fixed (time-independent) Neumann boundary nodes\n∘ -2 means time-dependent Dirichlet boundary nodes\nf:  Float64[nnodes, ndims], values for fixed (time-independent) Neumann boundary conditions of node n's dth freedom,\n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.updateStates!","page":"API Reference","title":"NNFEM.updateStates!","text":"updateStates!(domain::Domain, globaldat::GlobalData)\n\nAt each time step, updateStates! needs to be called to update the full state and Dstate in domain from active ones in globaldat.\n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.updateDomainStateBoundary!","page":"API Reference","title":"NNFEM.updateDomainStateBoundary!","text":"updateDomainStateBoundary!(self::Domain, globaldat::GlobalData)\n\nIf there exists time-dependent boundary conditions, updateDomainStateBoundary! must be called to update  the boundaries in domain. This function is called by updateStates!\n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.getExternalForce!","page":"API Reference","title":"NNFEM.getExternalForce!","text":"getExternalForce!(self::Domain, globaldat::GlobalData, fext::Union{Missing,Array{Float64}}=missing)\n\nComputes external force vector, including external force load and time-dependent Dirichlet boundary conditions.\n\ninfo: Info\nThe function needs to be called after updateDomainStateBoundary!, which computes the external force vector from external force load\n\n\n\n\n\n","category":"function"},{"location":"api/#Solvers-1","page":"API Reference","title":"Solvers","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"ExplicitSolverStep\nGeneralizedAlphaSolverStep\nSolverInitial!","category":"page"},{"location":"api/#NNFEM.ExplicitSolverStep","page":"API Reference","title":"NNFEM.ExplicitSolverStep","text":"ExplicitSolverStep(globdat::GlobalData, domain::Domain, Δt::Float64)\n\nCentral Difference explicit solver for M a + fint(u) = fext(u). a, v, u are acceleration, velocity and displacement.\n\nbeginalign\nu_n+1 = u_n + dtv_n + dt^22 a_n \nv_n+1 = v_n + dt2(a_n + a_n+1) \nM a_n+1 + f^int(u_n+1) = f^ext_n+1 \nM a_n+1 = f^ext_n+1 - f^int(u_n+1) \nendalign\n\ninfo: Info\nYou need to call SolverInitial! before the first time step, if f^ext_0 neq 0.  Otherwise we assume the initial acceleration globdat.acce[:] = 0.\n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.GeneralizedAlphaSolverStep","page":"API Reference","title":"NNFEM.GeneralizedAlphaSolverStep","text":"GeneralizedAlphaSolverStep(globdat::GlobalData, domain::Domain, Δt::Float64, \nρ::Float64 = 0.0, ε::Float64 = 1e-8, ε0::Float64 = 1e-8, maxiterstep::Int64=100, \nη::Float64 = 1.0, failsafe::Bool = false, verbose::Bool = false)\n\nImplicit solver for  Ma  + f_int(u) = fext Here a, v, u are acceleration, velocity and displacement respectively.\n\nρ: controls the damping effect of the α-scheme, ρ∈[0,1], ρ=1 corresponds to the maximum damping\nε: Float64, absolute error for Newton convergence\nε0: Float64, relative error for Newton convergence\nmax_iter: Int64, maximum iteration number for Newton convergence\nη: Float64, Newton step size at the first iteration\nfailsafe: Bool, if failsafe is true, when the Newton fails to converge,              revert back, and return false\n\nThe nonlinear alpha\n\nu_n+1 = u_n + dtv_n + dt^22 ((1 - 2beta)a_n + 2beta a_n+1)\nv_n+1 = v_n + dt((1 - gamma)a_n + gamma a_n+1)\n2beta = 05*(1 - αm + αf)^2\ngamma = 05 - alpha_m + alpha_f\n\na_n+1-alpha_m = (1-alpha_m)a_n+1 + alpha_m a_n \nv_n+1-alpha_f = (1-alpha_f)v_n+1 + alpha_f v_n\nu_n+1-alpha_f = (1-alpha_f)u_n+1 + alpha_f u_n\nM a_n+1-alpha_m + f^int(u_n+1-alpha_f) = f^ext_n+1-alpha_f\n\n'a_{n+1}' is solved by \n\nM ((1-alpha_m)a_n+1 + alpha_m a_n)  \n+ f^int((1-alpha_f)(u_n + dtv_n + dt^22 ((1 - 2beta)a_n + 2beta a_n+1))) + alpha_f u_n) \n= f^ext_n+1-alpha_f\n\nAs for \\alpha_m and alpha_f\n\nalpha_m = (2rho_infty - 1)(rho_infty + 1)\nalpha_f = rho_infty(rho_infty + 1)\n\nuse the current states a, v, u, time in globdat, and update these stetes to next time step update domain history, when failsafe is true, and Newton's solver fails, nothing will be changed.\n\nYou need to call SolverInitial! before the first time step, if f^{ext}0 != 0. SolverInitial! updates a0 in the globdat.acce a0 = M^{-1}(- f^{int}(u0) + f^{ext}_0)\n\nWe assume globdat.acce[:] = a_0 and so far initialized to 0 We also assume the external force is conservative (it does not depend on the current deformation)\n\n\n\n\n\n","category":"function"},{"location":"api/#NNFEM.SolverInitial!","page":"API Reference","title":"NNFEM.SolverInitial!","text":"SolverInitial!(Δt::Float64, globdat::GlobalData, domain::Domain)\n\nYou need to call SolverInitial! before the first time step, if f^ext_0 neq 0\n\na_0 = M^-1(- f^int(u_0) + f^ext_0)\n\n\n\n\n\n","category":"function"},{"location":"api/#Utilities-1","page":"API Reference","title":"Utilities","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"Modules = [NNFEM]\nPages   = [\"io.jl\", \"matrix.jl\", \"shapeFunctions\", \"Testsuit.jl\", \"Visualize.jl\", \"linearConstitutiveLaw.jl\"]","category":"page"},{"location":"api/#NNFEM.readMesh-Tuple{String}","page":"API Reference","title":"NNFEM.readMesh","text":"readMesh(gmshFile::String)\n\nReads a gmsh file and extracts element, coordinates and boundaries.\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.orthotropic_H-Tuple{PyCall.PyObject}","page":"API Reference","title":"NNFEM.orthotropic_H","text":"orthotropic_H(y::PyObject)\northotropic_H(o::Array)\n\nCreates a symmetric matrix from 4 parameters\n\nH = beginbmatrix\ny_1  y_2  0 \ny_2  y_3  0  \n0  0  y_4\nendbmatrix\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.spd_Chol_Orth-Tuple{Array}","page":"API Reference","title":"NNFEM.spd_Chol_Orth","text":"spd_Chol_Orth(o::Array)\nspd_Chol_Orth(o::PyObject)\n\nCreates a SPD matrix from 4 scalars. \n\nA = LL\n\nwhere\n\nL = beginbmatrix\no_1   \no_2  o_3  \n    o_4 \nendbmatrix\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.spd_Cholesky-Tuple{Array}","page":"API Reference","title":"NNFEM.spd_Cholesky","text":"spd_Cholesky(o::Array)\nspd_Cholesky(o::PyObject)\n\nCreates a SPD matrix from 6 scalars. \n\nA = LL\n\nwhere\n\nL = beginbmatrix\no_1    \no_2  o_4  \no_3  o_5  o_6 \nendbmatrix\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.spd_H-Tuple{PyCall.PyObject,Array{Float64,2}}","page":"API Reference","title":"NNFEM.spd_H","text":"spd_H(o::PyObject, H0::Array{Float64,2})\nspd_H(o::Array, H0::Array)\n\nCreates a SPD matrix from 3 scalars\n\nH = H_0 - fracH_0nnH_01+nH_0n\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.spd_zero_to_H-Tuple{PyCall.PyObject,Array{Float64,2}}","page":"API Reference","title":"NNFEM.spd_zero_to_H","text":"spd_zero_to_H(o::Array)\nspd_zero_to_H(o::Array, H0inv::Array{Float64,2})\n\nCreates a SPD matrix from 4 scalars. \n\nA = (H_0^-1 +LL)^-1\n\nwhere\n\nL =  beginbmatrix\no_1   \no_2  o_3  \n    o_4\nendbmatrix\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.sym_H-Tuple{PyCall.PyObject}","page":"API Reference","title":"NNFEM.sym_H","text":"sym_H(y::PyObject)\nsym_H(o::Array)\n\nCreates a symmetric matrix from 6 parameters\n\nH = beginbmatrix\ny_1  y_2  y_3 \ny_2  y_4  y_5  \ny_3  y_5  y_6\nendbmatrix\n\n\n\n\n\n","category":"method"},{"location":"api/#NNFEM.gradtest-Tuple{Function,Array{Float64,N} where N}","page":"API Reference","title":"NNFEM.gradtest","text":"gradtest(f::Function, x0::Array{Float64}; scale::Float64 = 1.0)\n\nTesting the gradients of a vector function f.  Here x0 is n-dimensional vector, f takes an n-dimensional vector as inputs, and outputs a m dimensional vector. The function tests the second order convergence of f\n\nf(x_0+gamma c) - f(x_0) - gamma nabla f(x_0) c_2 = mathcalO(gamma^2)\n\n\n\n\n\n","category":"method"},{"location":"api/#Internals-1","page":"API Reference","title":"Internals","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"","category":"page"},{"location":"ex_simulation/#Simulaton-Code-Structure-1","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"","category":"section"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"We use the Newmark method or the generalized alpha scheme to solve the dynamics equation numerically. ","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"mddot mathbfu + gammadotmathbfu + kmathbfu = mathbff","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"The discretized form is ","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"Mmathbfa + Cmathbf v + K mathbf d = mathbf F","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"For a detailed description of the generalized alpha scheme, see this post. ","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"NNFEM.jl supports two types of boundary conditions, the Dirichlet boundary condition and the Neumann boundary condition. Both boundary conditions can be time independent or dependent. Read [] for how to specify time dependent boundary conditions and [] for how to specify time independent boundary conditions. ","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"Here is a script for simulation using an explicit solver. ","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"NT = 100\nΔt = 1.0e-2\nT = NT * Δt\n\nm, n =  20, 10\nh = 0.1\n\n# Create a very simple mesh\nelements = SmallStrainContinuum[]\nprop = Dict(\"name\"=> \"PlaneStrain\", \"rho\"=> 0.0876584, \"E\"=>0.07180760098, \"nu\"=>0.4)\ncoords = zeros((m+1)*(n+1), 2)\nfor j = 1:n\n    for i = 1:m\n        idx = (m+1)*(j-1)+i \n        elnodes = [idx; idx+1; idx+1+m+1; idx+m+1]\n        ngp = 3\n        nodes = [\n            (i-1)*h (j-1)*h\n            i*h (j-1)*h\n            i*h j*h\n            (i-1)*h j*h\n        ]\n        coords[elnodes, :] = nodes\n        push!(elements, SmallStrainContinuum(nodes, elnodes, prop, ngp))\n    end\nend\n\n# fixed on the bottom, push on the right\nEBC = zeros(Int64, (m+1)*(n+1), 2)\nFBC = zeros(Int64, (m+1)*(n+1), 2)\ng = zeros((m+1)*(n+1), 2)\nf = zeros((m+1)*(n+1), 2)\nfor i = 1:m+1\n    for j = 1:n+1\n        idx = (j-1)*(m+1) + i \n        if j==n+1\n            EBC[idx,:] .= -1\n        end\n        if i==m+1 && j!=n+1\n            FBC[idx,1] = -1\n            f[idx,1] = -0.001\n        end\n    end\nend\nndims = 2\ndomain = Domain(coords, elements, ndims, EBC, g, FBC, f)\n\n\nDstate = zeros(domain.neqs)\nstate = zeros(domain.neqs)\nvelo = zeros(domain.neqs)\nacce = zeros(domain.neqs)\ngt = nothing\nft = nothing\nglobdat = GlobalData(state, Dstate, velo, acce, domain.neqs, gt, ft)\n\n\nassembleMassMatrix!(globdat, domain)\nupdateStates!(domain, globdat)\n\nfor i = 1:NT\n@info i \n    global globdat, domain = ExplicitSolverStep(globdat, domain, Δt)\nend\nvisualize_displacement(domain)\nvisualize_von_mises_stress(domain)","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"The explicit solver is implemented as follows","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"function ExplicitSolverStep(globdat::GlobalData, domain::Domain, Δt::Float64)\n    u = globdat.state[:]\n    ∂u  = globdat.velo[:]\n    ∂∂u = globdat.acce[:]\n\n    fext = getExternalForce!(domain, globdat)\n\n    u += Δt*∂u + 0.5*Δt*Δt*∂∂u\n    ∂u += 0.5*Δt * ∂∂u\n    \n    domain.state[domain.eq_to_dof] = u[:]\n    fint  = assembleInternalForce( globdat, domain, Δt)\n    ∂∂up = globdat.M\\(fext - fint)\n\n    ∂u += 0.5 * Δt * ∂∂up\n\n    globdat.Dstate = globdat.state[:]\n    globdat.state = u[:]\n    globdat.velo = ∂u[:]\n    globdat.acce = ∂∂up[:]\n    globdat.time  += Δt\n    commitHistory(domain)\n    updateStates!(domain, globdat)\n\n    return globdat, domain\nend","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"We show the follow chart of the implementation. Note inside the ExplicitSolverStep function, the data is exchanged between globdat and domain. In general, globdat saves only the active components of the degrees of freedom (excluding Dirichlet boundary nodes) while domain maintains the full information. ","category":"page"},{"location":"ex_simulation/#","page":"Simulaton Code Structure","title":"Simulaton Code Structure","text":"(Image: image-20200409172855057)","category":"page"},{"location":"#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"Under Construction. ","category":"page"}]
}
