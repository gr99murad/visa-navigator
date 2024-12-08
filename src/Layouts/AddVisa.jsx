import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const AddVisa = () => {
    const [formData, setFromData] = useState({
        CountryImage: '',
        CountryName: '',
        Visa_type: '',
        Processing_time: '',
        Required_documents: [ ],
        Description: '',
        Age_restriction: '',
        Fee: '',
        Validity: '',
        Application_method: ''

    });
    const history = useHistory();

    const handleChange = (e) =>{
        
         const {name, value} = e.target;
         setFromData({...formData,
            [name]:value

         });
    };
    const handleCheckboxChange = (e) => {
        
        const {name, checked} = e.target;
         setFromData({...formData, 
            Required_documents:checked
            ?[...formData.Required_documents,name]
            :form_document.Required_documents.filter((item) => item != name)
                
            

         });

    };
    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("/api/addVisa",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if(result.success){
                alert('Visa added successfully!');
                history.push('/allVisas');
            } else{
                alert('Failed to add visa');
            }
        }
        catch(error){
            console.error('Error adding Visa:',error

            )
        }
    };
    return (
        <div>
            <Navbar></Navbar>
            <form onSubmit={handleSubmit}>
                <label>Country Image:</label>
                <input type="text" name='CountryImage' value={formData.CountryImage} onChange={handleChange} required />

                <label>Country Name:</label>
                <input type="text" name='CountryName' value={formData.CountryName} onChange={handleChange} required />

                <label>Visa Type:</label>
                <select name='Visa_type' value={formData.Visa_type} onChange={handleChange} required>
                    <option value="">Select Visa Type</option>
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Official Visa">Official Visa</option>


                </select>
                <label>Processing Time:</label>
                <input type="text" name='Processing_time' value={formData.Processing_time} onChange={handleChange} required />
                
                <label>Required Documents:</label>
                <input type="checkbox" name='Valid passport'  onChange={handleCheckboxChange} /> Valid  passport
                <input type="checkbox" name='Visa application form'  onChange={handleCheckboxChange} /> Visa application form
                <input type="checkbox" name='Recent passport-sized photograph'  onChange={handleCheckboxChange} /> Recent passport-sized photograph


                <label>Description:</label>
                <textarea name='Description' value={formData.Description} onChange={handleChange} ></textarea>

                <label>Age Restriction:</label>
                <input type="number" name='Age_restriction' value={formData.Age_restriction} onChange={handleChange} required />

                <label>Fee:</label>
                <input type="number" name='Fee' value={formData.Fee} onChange={handleChange} required />

                <label>Validity:</label>
                <input type="text" name='Validity' value={formData.Validity} onChange={handleChange} required />

                <label>Application Method:</label>
                <input type="text" name='Application_method' value={formData.Application_method} onChange={handleChange} required />

                <button type='submit'>Add Visa</button>


            </form>
        </div>
    );
};

export default AddVisa;