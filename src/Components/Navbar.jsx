import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const {user,logout} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/');
    };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <NavLink to="/" className=" text-xl">
          GR_Visa <br /> Navigator
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allVisas"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              All Visas
            </NavLink>
          </li>

          {/* protected routes */}

          {user && (
            <>
              <li>
                <NavLink
                  to="/addVisa"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-300"
                  }
                >
                  Add Visa
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myAddedVisas"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-300"
                  }
                >
                  My Added Visas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myVisaApplication"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-300"
                  }
                >
                  My Visa Application
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">

        
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/register">Register</NavLink>
      </div>
    </div>
  );
};

export default Navbar;