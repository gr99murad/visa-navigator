import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Swal from 'sweetalert2'
import Footer from '../Components/Footer';

const AddVisa = () => {
    
    const handleAddVisa = e =>{
        e.preventDefault();
        const form = e.target;
        const CountryImage = form.CountryImage.value;
        const CountryName = form.CountryName.value;
        const Visa_type = form.Visa_type.value;
        const Processing_time = form.Processing_time.value;
        const Description = form.Description.value;
        const Age_restriction = form.Age_restriction.value;
        const Fee = form.Fee.value;
        const Validity = form.Validity.value;

        const Application_method = form.Application_method.value;
        const email = localStorage.getItem("userEmail");

        const newVisa = {
            CountryImage,
            CountryName,
            Visa_type,
            Processing_time,
            Description,
            Age_restriction,
            Fee,
            Validity,
            Application_method,
            email,

        }
        // console.log(newVisa);

        //send data to  the server
        fetch('https://visa-navigator-server-lovat.vercel.app/api/visaData',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newVisa)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'User Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })



    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='card bg-base-100 w-full shrink-0 shadow-2xl'>
            <form onSubmit={handleAddVisa} className='card-body'>


                {/* form first row */}
                <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Country Image</span>
                            </label>
                            <input type="text" name='CountryImage'  className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Country Name</span>
                            </label>
                            <input type="text"name='CountryName'  className="input input-bordered" required />
                        </div>
                    </div>
                    {/* form second row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Visa Type</span>
                            </label>
                            <select name='Visa_type'   required>
                               <option value="">Select Visa Type</option>
                               <option value="Tourist Visa">Tourist Visa</option>
                               <option value="Student Visa">Student Visa</option>
                               <option value="Official Visa">Official Visa</option>


                           </select>
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Processing Time</span>
                            </label>
                            <input type="text" name='Processing_time' className="input input-bordered" required />
                        </div>
                    </div>
                    {/* form third row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Required Documents</span>
                            </label>
                            <input type="checkbox" name='Valid passport'   /> Valid  passport
                            <input type="checkbox" name='Visa application form'   /> Visa application form
                            <input type="checkbox" name='Recent passport-sized photograph'  /> Recent passport-sized photograph
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" name='Description' className="input input-bordered" required />
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Age Restriction</span>
                        </label>
                        <input type="number" name='Age_restriction' className="input input-bordered" required />

                    </div>
                    {/* form 4th  row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                       
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Fee</span>
                            </label>
                            <input type="number" name='Fee' className="input input-bordered" required />
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Validity</span>
                        </label>
                        <input type="text" name='Validity' className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Application Method</span>
                        </label>
                        <input type="text" name='Application_method' className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Visa</button>
                    </div>








                


            </form>

            <Footer></Footer>
        </div>
        </div>
    );
};

export default AddVisa;