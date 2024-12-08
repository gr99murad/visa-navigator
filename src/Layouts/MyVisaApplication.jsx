import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const MyVisaApplication = () => {
    const {user} = useAuth();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if(user){
            fetch(`http://localhost:5000/api/myApplications?email=${user.email}`)
            .then(res => res.json())
            .then(data => setApplications(data));


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
            <div>
                <h1>My Visa Applications</h1>
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <div key= {app._id} className='visa-card'>
                            <h3>{app.country}</h3>
                            <p>Visa Type: {app.visa_type}</p>
                            <p>Fee:{app.fee}</p>
                            <p>Applied Date: {new Date(app.appliedDate).toLocaleDateString()}</p>
                            <p>Applicant:{app.firstName} {app.lastName}</p>
                            <button onClick={() => handleCancel(app._id)}>Cancel</button>

                        </div>
                    ))
                ) : (
                    <p>You have no visa applications</p>
                )}
                
            </div>
        </div>
    );
};

export default MyVisaApplication;