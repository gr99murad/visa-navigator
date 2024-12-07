import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();


    // default to home
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then(() => {
         
          // navigate to the desired route
          navigate (from, {replace: true , state:{message:"Login Successfully"}});  

        })
        .catch((error) => toast.error(error.message));
    };

    const handleGoogleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then(() => {
          
          navigate (from, {replace: true , state:{message:"Google Login Successfully"}});   
        })
        .catch((error) => toast.error(error.message));
    };
    
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <NavLink to="/auth/forgot-password" className="label-text-alt link link-hover">
                    Forgot password?
                  </NavLink>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
                
              </div>
            </form>
            <div className="divider">OR</div>

            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">Sign in with Google</button>
            <p className="text-sm text-center">Don't have an account?{" "}
              <NavLink to="/auth/register" className="text-blue-500">
                   Register

              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;