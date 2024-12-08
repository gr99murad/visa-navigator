import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const VisaDetails = () => {
    const {user} = useAuth();
    const [visaDetails,setVisaDetails] = useState(null);
    const [modalOpen,setModalOpen] = useState(false);
    const [firstName,setFirstName] = useState('');
    const [LastName,setLastName] = useState('');
    const [fee,setFee] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/auth/login');

        }
        fetch('/api/visaData')
        .then(res => res.json())
        .then(data => setVisaDetails(data[0]));
    },[user,navigate]);

    const handleApply = () =>{
        const applicationData = {
            email: user.email,
            firstName,
            LastName,
            visaId: visaDetails._id,
            fee,
        };

        fetch('/api/applyVisa',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(applicationData),
            
        })
        .then(res => res.json())
        .then((data) => {
            toast.success(data.message);
            setModalOpen(false);
        })
        .catch((error) => toast.error('Error Applying for visa'));
    };

    return (
      <div>
        <h2>Visa Details</h2>
        {visaDetails && (
          <div>
            <h2>{visaDetails.countryName}</h2>
            <p>Visa Type :{visaDetails.Visa_type}</p>
            <p>Processing Time:{visaDetails.Processing_time}</p>
            <p>Fee:{visaDetails.Fee}</p>
            <p>Validity:{visaDetails.Validity}</p>
            <button onClick={() => setModalOpen(true)}>Apply for Visa</button>
          </div>
        )}

        {modalOpen && (
            <div className='modal'>
                <div className='modal-content'>
                    <h3>Apply for Visa</h3>
                    <form>
                        <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder='Last Name' value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                        <input type="number" placeholder='Fee' value={fee} onChange={(e) => setFee(e.target.value)} required />

                        <button type='submit'>Apply</button>


                    </form>
                    <button onClick={() => setModalOpen(false)}>Close</button>

                </div>

            </div>
        )}
      </div>
    );
};

export default VisaDetails;