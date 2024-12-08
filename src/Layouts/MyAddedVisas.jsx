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

    const email = "user@example.com";

    useEffect(() => {
        fetch(`http://localhost:5000/api/myApplications?email=${email}`)
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
                const res = await fetch('http://localhost:5000/api/cancelApplication',{
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({applicationId: id})
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
                setShow(false);
                Swal.fire('Updated!','Visa information updated successfully.', 'success');
                setVisas(visas.map(visa => (visa._id === updatedVisa._id ? updatedVisa : visa)));
            }else{
                Swal.fire('Error!', 'Failed to update visa.', error);
            }

        } catch(error){
            console.error("Error updating visa:",error);
            toast.error("Failed to update visa");
        }
    };
    return (
      <div>
        <Navbar></Navbar>
        <ToastContainer></ToastContainer>

        <div className="container mt-4">
          <h2>My Added Visas</h2>
          <div className="row">
            {visas.map((visa) => (
              <div className="" key={visa._id}>
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
                    <p>Visa Type : <b></b>{visa.Visa_type}</p>
                    <p>Processing Time: <b></b>{visa.Processing_time}</p>
                    <p>Fee: <b></b>{visa.Fee}</p>
                    <p>Validity: <b></b>{visa.Validity}</p>
                    <p>Application Method: <b></b>{visa.Application_method}</p>
                    <div className="card-actions">
                      <button className="btn btn-primary" onClick={() => {setSelectedVisa(visa); setUpdatedVisa(visa); setShowModal(true); }}>Update</button> {''}
                      <button className="btn btn-primary" onClick={() => handleDelete(visa._id)}>Delete</button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* update visa modal */}
        {showModal && (
            <div className='modal' style={{display: 'block'}}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'> Updated Visa </h5>
                            <button type='button' className='close' onClick={setShowModal(false)}>&times;</button>

                        </div>
                        <div className='modal-body'>
                            {updatedVisa && (
                                <form onSubmit={handleUpdate}>
                                    <div className='form-group'>
                                        <label> Country</label>
                                        <input type="text" className='form-control' value={updatedVisa.CountryName} onChange={(e) => setUpdatedVisa({...updatedVisa, countryName: e.target.value}) }/>


                                    </div>

                                    <div className='form-group'>
                                        <label> Visa Type</label>
                                        <input type="text"
                                        className='form-control' 
                                        value={updatedVisa.Visa_type} 
                                        onChange={(e) => setUpdatedVisa({...updatedVisa, Visa_type: e.target.value}) }/>
                                        

                                    </div>
                                    <button type="submit" className='btn btn-success mt-3'>Update</button>

                                </form>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        )}

        <Footer></Footer>
      </div>
    );
};

export default MyAddedVisas;