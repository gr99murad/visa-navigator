import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer';

const MyAddedVisas = () => {
    const [visas, setVisas] = useState([]);
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedVisa, setUpdatedVisa] = useState({});

    const email = localStorage.getItem("userEmail");

    useEffect(() => {

        if(!email){
            toast.error("please log in to view your added visas.");
            return;
        }
        fetch(`http://localhost:5000/api/myAddedVisas?email=${email}`)
        .then(res => res.json())
        .then(data => setVisas(data))
        .catch(error => {
            console.error("Error fetching visas:",error);
            toast.error("Failed to fetch visas");
        });
    }, [email]);

    const handleDelete = async(id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#d33',
            cancelButtonColor:'#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if(result.isConfirmed){
            try{
                const res = await fetch(`http://localhost:5000/api/visaData/${id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({applicationId: id}),
                });
                if(res.ok){
                    setVisas(visas.filter(visa => visa._id !== id));
                    Swal.fire('Deleted!', 'Your visa has been deleted.','success');
                } else{
                    Swal.fire('Error!','Failed to delete visa.','error');
                }
            } catch(error) {
                console.error("Error deleting visa:",error);
                toast.error("Failed to delete visa");
            }
        }
    };

    const handleUpdate = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:5000/api/visaData/${updatedVisa._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(updatedVisa),
            });

            if(res.ok){
                setShowModal(false);
                setVisas(visas.map(visa => (visa._id === updatedVisa._id ? updatedVisa : visa)));
                Swal.fire('Updated!','Visa information updated successfully.', 'success');
            }else{
                Swal.fire('Error!', 'Failed to update visa.', 'error');
            }

        } catch(error){
            console.error("Error updating visa:",error);
            toast.error("Failed to update visa");
        }
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
        display: 'block',
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

        <div className="container mt-4">
          <h2 className='text-3xl font-bold text-center'>My Added Visas</h2>
          <div >
            {visas.map((visa) => (
              <div key={visa._id}>
                <div className="card bg-base-100 mx-auto w-64 lg:w-96 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img
                      src={visa.CountryImage}
                      alt={visa.CountryName}
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{visa.CountryName}</h2>
                    <p>Visa Type : {visa.Visa_type}</p>
                    <p>Processing Time:{visa.Processing_time}</p>
                    <p>Fee:{visa.Fee}</p>
                    <p>Validity:{visa.Validity}</p>
                    <p>Application Method:{visa.Application_method}</p>
                    <div className="card-actions">
                      <button 
                      className="btn btn-primary" 
                      onClick={() => {setSelectedVisa(visa); setUpdatedVisa(visa); setShowModal(true); }}>
                        Update
                      </button> {''}
                      <button className="btn " onClick={() => handleDelete(visa._id)}>Delete</button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* update visa modal */}
        {showModal && (
            <div  style={modalStyles}>
                <div style={modalContentStyles}>
                    
                        <div>
                            <h5 className=''> Updated Visa </h5>
                            <button  className='' onClick={() =>setShowModal(false)}>close</button>

                        </div>
                        <div className=''>
                            {updatedVisa && (
                                <form onSubmit={handleUpdate}>
                                    <div className=''>
                                        <label> Country</label>
                                        <input type="text" className='' value={updatedVisa.CountryName} onChange={(e) => setUpdatedVisa({...updatedVisa, CountryName: e.target.value}) }/>


                                    </div>

                                    <div className=''>
                                        <label> Visa Type</label>
                                        <input type="text"
                                        className='' 
                                        value={updatedVisa.Visa_type} 
                                        onChange={(e) => setUpdatedVisa({...updatedVisa, Visa_type: e.target.value}) }/>
                                        

                                    </div>


                                    <div className=''>
                                        <label> Processing Time</label>
                                        <input type="text"
                                        className='' 
                                        value={updatedVisa.Processing_time} 
                                        onChange={(e) => setUpdatedVisa({...updatedVisa, Processing_time: e.target.value}) }/>
                                        

                                    </div>

                                    <div className=''>
                                        <label> Fee</label>
                                        <input type="text"
                                        className='' 
                                        value={updatedVisa.Fee} 
                                        onChange={(e) => setUpdatedVisa({...updatedVisa, Fee: e.target.value}) }/>
                                        

                                    </div>

                                    <div className=''>
                                        <label>Validity</label>
                                        <input type="text"
                                        className='' 
                                        value={updatedVisa.Validity} 
                                        onChange={(e) => setUpdatedVisa({...updatedVisa, Validity: e.target.value}) }/>
                                        

                                    </div>

                                    <div className=''>
                                        <label>Application Method</label>
                                        <input type="text"
                                        className='' 
                                        value={updatedVisa.Application_method} 
                                        onChange={(e) => setUpdatedVisa({...updatedVisa, Application_method: e.target.value}) }/>
                                        

                                    </div>
                                    <button type="submit" className='btn btn-success mt-3'>Update</button>

                                </form>
                            )}

                        </div>

                    </div>

                </div>

            
        )}

        <Footer></Footer>
      </div>
    );
};

export default MyAddedVisas;