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
            fee,
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
        <h2>Visa Details</h2>
        {visaDetails && (
          <div>
            <h2>{visaDetails.countryName}</h2>
            <p>Visa Type :{visaDetails.Visa_type}</p>
            <p>Processing Time:{visaDetails.Processing_time}</p>
            <p>Fee:{visaDetails.Fee}</p>
            <p>Validity:{visaDetails.Validity}</p>
            <button onClick={() => setModalOpen(true) }>Apply for Visa</button>
          </div>
        )}

        {modalOpen && (
            
                <div style={modalStyles}>
                <div style={modalContentStyles}>
                    <h3>Apply for Visa</h3>
                    <form onSubmit={handleApply}>
                        <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <input type="number" placeholder='Fee' value={fee} onChange={(e) => setFee(e.target.value)} required />

                        <button type='submit'>Apply</button>


                    </form>
                    <button onClick={() => setModalOpen(false)}>Close</button>

                </div>

            </div>
            
        )}
        <Footer></Footer>
      </div>
    );
};

export default VisaDetails;