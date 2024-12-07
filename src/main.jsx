import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Layouts/Home.jsx';
import AllVisas from './Layouts/AllVisas.jsx';
import AddVisa from './Layouts/AddVisa.jsx';
import MyAddedVisas from './Layouts/MyAddedVisas.jsx';
import MyVisaApplication from './Layouts/MyVisaApplication.jsx';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
  },
  {
    path: "/allVisas",
    element:<AllVisas></AllVisas>,
  },
  {
    path: "/addVisa",
    element: <PrivateRoute></PrivateRoute>,
    children:[
      {
        path: "/addVisa",
        element:<AddVisa></AddVisa>,
      },
    ]
  },
  {
    path: "/myAddedVisas",
    element:<PrivateRoute></PrivateRoute>,
    children:[
      {
        path: "/myAddedVisas",
        element:<MyAddedVisas></MyAddedVisas>,
      },
    ]
  },
  {
    path: "/myVisaApplication",
    element:<PrivateRoute></PrivateRoute>,
    children:[
      {
        path: "/myVisaApplication",
        element:<MyVisaApplication></MyVisaApplication>,
      },
    ]
  },
  {
    path: "/auth/login",
    element:<Login></Login>,
  },
  {
    path: "/auth/register",
    element:<Register></Register>,
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
)
