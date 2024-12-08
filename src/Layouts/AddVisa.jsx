import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

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

        const newVisa = {CountryImage,CountryName,Visa_type,Processing_time,Description,Age_restriction,Fee,Validity}
        console.log(newVisa);

        //send data to  the server
        fetch('http://localhost:5000/api/addVisa',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newVisa)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })



    }
    return (
        <div>
            <Navbar></Navbar>
            <form onSubmit={handleAddVisa}>
                <label>Country Image:</label>
                <input type="text" name='CountryImage'   required />

                <label>Country Name:</label>
                <input type="text" name='CountryName'   required />

                <label>Visa Type:</label>
                <select name='Visa_type'   required>
                    <option value="">Select Visa Type</option>
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Official Visa">Official Visa</option>


                </select>
                <label>Processing Time:</label>
                <input type="text" name='Processing_time'   required />
                
                <label>Required Documents:</label>
                <input type="checkbox" name='Valid passport'   /> Valid  passport
                <input type="checkbox" name='Visa application form'   /> Visa application form
                <input type="checkbox" name='Recent passport-sized photograph'  /> Recent passport-sized photograph


                <label>Description:</label>
                <textarea name='Description'   ></textarea>

                <label>Age Restriction:</label>
                <input type="number" name='Age_restriction'   required />

                <label>Fee:</label>
                <input type="number" name='Fee'  required />

                <label>Validity:</label>
                <input type="text" name='Validity'  required />

                <label>Application Method:</label>
                <input type="text" name='Application_method'   required />

                <button type='submit'>Add Visa</button>


            </form>
        </div>
    );
};

export default AddVisa;