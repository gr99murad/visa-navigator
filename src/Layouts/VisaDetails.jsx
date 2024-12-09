import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const VisaDetails = () => {
    const {user} = useAuth();
    const{visaId} = useParams();
    const [visaDetails,setVisaDetails] = useState(null);
    const [modalOpen,setModalOpen] = useState(false);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [fee,setFee] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/auth/login');

        } else{
            fetch(`http://localhost:5000/api/visaData/${visaId}`)
        .then(res => res.json())
        .then(data => setVisaDetails(data))
        .catch((error) => console.error("Error fetching Visa:",error));
        }
        
        
    },[user,navigate,visaId]);

    const handleApply = (e) =>{
        e.preventDefault();

        const applicationData = {
            email: user.email,
            firstName,
            lastName,
            visaId: visaDetails._id,
            fee: visaDetails.Fee,
        };

        fetch('http://localhost:5000/api/applyVisa',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(applicationData),
            
        })
        .then((res) => res.json())
        .then((data) => {
            toast.success(data.message);
            setModalOpen(false);
        })
        .catch((error) => toast.error('Error Applying for visa'));
    };


    const modalStyles ={
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        zIndex: 1000,
    };

    const modalContentStyles ={
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width:'400px',
    };

    return (
      <div>
        <Navbar></Navbar>
        <ToastContainer></ToastContainer>
        <h2 className='text-3xl font-bold text-center mb-10'>Visa Details</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       {visaDetails && (
          <div className='card bg-base-100 mx-auto w-64 lg:w-96 shadow-xl p-6'>
            <figure className="px-10 pt-10">
                  <img
                    src={visaDetails.CountryImage}
                    alt={visaDetails.CountryName}
                    className="rounded-xl"
                  />
                </figure>
            <h2>{visaDetails.CountryName}</h2>
            <p>Visa Type :{visaDetails.Visa_type}</p>
            <p>Processing Time:{visaDetails.Processing_time}</p>
            <p>Fee:{visaDetails.Fee}</p>
            <p>Validity:{visaDetails.Validity}</p>
            <p>Application Method:{visaDetails.Application_method}</p>
            <button className='btn my-4' onClick={() => setModalOpen(true) }>Apply for Visa</button>
          </div>
        )}

       </div>
        {modalOpen && (
            
                <div style={modalStyles}>
                <div style={modalContentStyles}>
                    <h3 className='text-3xl font-bold text-center mb-10'>Apply for Visa</h3>
                    <form onSubmit={handleApply} className='grid gap-5'>
                        <input type="email" className="input input-bordered" value={user.email} disabled />
                        <input type="text" className="input input-bordered" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" className="input input-bordered" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <input type="number" className="input input-bordered" placeholder={visaDetails?.Fee || ''} value={visaDetails?.Fee || ''}  />

                        <button className='btn btn-success' type='submit'>Apply</button>


                    </form>
                    <button className='btn btn-warning my-10' onClick={() => setModalOpen(false)}>Close</button>

                </div>

            </div>
            
        )}
        <Footer></Footer>
      </div>
    );
};

export default VisaDetails;