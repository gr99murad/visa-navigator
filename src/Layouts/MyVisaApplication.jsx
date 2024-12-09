import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import useAuth from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer';


const MyVisaApplication = () => {
    const {user} = useAuth();
  

    const [applications, setApplications] = useState([]);
    const [visaDetailsMap, setVisaDetailsMap] = useState({});

    useEffect(() => {
        if(user){
            fetch(`http://localhost:5000/api/myApplications?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setApplications(data);

                // fetching corresponding visa details for each application
                data.forEach((app) => {
                    fetch(`http://localhost:5000/api/visaData/${app.visaId}`)
                    .then(res => res.json())
                    .then((visaData) =>{
                        setVisaDetailsMap((prev) => ({
    
                            ...prev,
                            [app._id]: visaData,
                        }));
                    })
                    .catch((error) => console.error("Error fetching visa data:", error));
                });
            })
            .catch((error) => console.error("Error fetching applications:", error));

        }
    }, [user]);

    const handleCancel = (applicationId) => {
        fetch('http://localhost:5000/api/cancelApplication',{
            method: 'DELETE',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify({applicationId}),
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message);
            setApplications(applications.filter((app) => app._id !== applicationId));
        })
        .catch((error) => toast.error('Error canceling application'));
    };
    return (
        <div>
            <Navbar></Navbar>
            <ToastContainer></ToastContainer>
            <div>
                <h1 className='text-3xl font-bold text-center mb-10'>My Visa Applications</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">


                {applications.length > 0 ? (
                    applications.map((app) => {

                        const visaDetails = visaDetailsMap[app._id];

                        if(!visaDetails){
                            return(
                                <div key={app._id} className='card bg-base-100 mx-auto w-64 lg:w-96 shadow-xl p-6'>
                                    <p>Loading visa Details...</p>

                                </div>
                            );
                        }

                        return(
                            <div key= {app._id} className='card bg-base-100 mx-auto w-64 lg:w-96 shadow-xl p-6'>
                             <figure className="px-10 pt-10">
                              <img
                               src={visaDetails.CountryImage}
                               alt={visaDetails.CountryName}
                            className="rounded-xl"
                             />
                            </figure>
                            <h3>{visaDetails.CountryName}</h3>
                            <p>Visa Type: {visaDetails.Visa_type}</p>
                            <p>Processing Time:{visaDetails.Processing_time}</p>
                            <p>Fee:{visaDetails.Fee}</p>
                            <p>Validity:{visaDetails.Validity}</p>
                            <p>Application Method:{visaDetails.Application_method}</p>
                            <p>Applied Date: {new Date(app.appliedDate).toLocaleDateString()}</p>
                            <p>Applicant:{app.firstName} {app.lastName}</p>
                            <button className='btn btn-error mt-4' onClick={() => handleCancel(app._id)}>Cancel</button>

                        </div>
                    );
                })
                ) : (
                    <p>You have no visa applications</p>
                )}

                </div>
               
                
            </div>

            <Footer></Footer>
            
        </div>
    );
};

export default MyVisaApplication;