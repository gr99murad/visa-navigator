import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
    const { createNewUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {
      e.preventDefault();
      //get form data
      const form = new FormData(e.target);
      const name = form.get("name");
      const email = form.get("email");
      const photo = form.get("photo") || "";
      const password = form.get("password");

      // clear previous error
      setError({});
      
    //   console.log(name);
      if (name.length < 5) {
        setError((prev) => ({ ...prev, name: "name should be more then 5 character" }));
        return;
      }
      // password validation
      const passwordErrors = [];
      if(password.length < 6) passwordErrors.push("Password must be at least 6 characters");
      if(!/[A-Z]/.test(password)) passwordErrors.push("Password must have an uppercase letter");
      if(!/[a-z]/.test(password)) passwordErrors.push("Password must have an lowercase letter");

      if(passwordErrors.length > 0){
        setError((prev) => ({...prev, password: passwordErrors.join(", ")}));
        return;
      }

      setLoading(true);
  
      createNewUser(email, password)
        .then((result) => {
          toast.success("Registration Successful!");
          // navigate("/");
        })
        .catch((err) => {
          // setLoading(false);
          // console.log(err);
          setError((prev) => ({...prev, register: err.message}));
          toast.error("Registration failed. please try again...");
          navigate("/");
          
        })
        .finally(() => setLoading(false));
    };
    return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
            <h2 className="text-2xl font-semibold text-center">
              Register your account
            </h2>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              {error.name && (
                <label className="label text-sx text-red-500">{error.name}</label>
              )}
    
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="photo-url"
                  className="input input-bordered"
                  required
                  
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
    
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
               
              </div>
              {error.password && (
                <label className="label text-red-500">{error.password}</label>
              )}

              {error.register && <label className="label">{error.register}</label>}
    
              <div className="form-control mt-6">
                <button
                type="submit"
                 className={`btn btn-neutral rounded-none ${loading ? "loading" : ""}`}
                 disabled={loading}

                 
                 >
                 Register</button>
              </div>
            </form>
            <p className="text-center font-semibold">
              All ready Have An Account ?{" "}
              <Link className="text-red-500" to="/auth/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      );
};

export default Register;