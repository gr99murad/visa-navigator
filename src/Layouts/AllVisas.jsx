import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1733679148406.json';
import { Fade, Zoom } from 'react-awesome-reveal';

const AllVisas = () => {
    const [allVisas, setAllVisas] = useState([]);
    const navigate = useNavigate();
    const [filteredVisas, setFilteredVisas] = useState([]);
    const [visaType, setVisaType] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://visa-navigator-server-lovat.vercel.app/api/visaData")
        .then((res) => res.json())
        .then((data) => {
          setAllVisas(data);
          setFilteredVisas(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });

   
       
    }, []);

    const handleFilterChange = (e) => {
      const selectedType = e.target.value;
      setVisaType(selectedType);

      if(selectedType === "All"){
        setFilteredVisas(allVisas);
      }else{
        const filtered = allVisas.filter(
          (visa) => visa.Visa_type === selectedType
          
        );
        setFilteredVisas(filtered);
      }
    };


    const handleSeeDetails = (visaId) => {
      navigate(`/visaDetails/${visaId}`);
    };
    return (
      <div>
        <Navbar></Navbar>
        <div className='container mx-auto px-4'>
        <Fade direction='down' cascade>
        <h2 className="text-3xl font-bold text-center mb-8">All Visas</h2>
        </Fade>

        <div className='flex justify-center mb-8'>
          <Lottie animationData={animationData} className='w-80'></Lottie>

        </div>


        <div className='mb-8 text-center'>
          <label className='font-semibold mr-4'> Filter by Visa Type:</label>
          <select 
          name="" 
          id=""
          value={visaType}
          onChange={handleFilterChange}
          className='select select-bordered w-52'
          
          >
            <option value="All">All</option>
            <option value="Tourist Visa">Tourist Visa</option>

            <option value="Student Visa">Student Visa</option>
            <option value="Official Visa">Official Visa</option>
            <option value="Business Visa">Business Visa</option>
          </select>

        </div>
        

        <div>
          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin'></div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredVisas.map((visa, index) => (
              <Zoom
                key={index}
                className="card bg-base-100 mx-auto w-64 lg:w-96 shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={visa.CountryImage}
                    alt={visa.CountryName}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{visa.CountryName}</h2>
                  <p>Visa Type :{visa.Visa_type}</p>
                  <p>Processing Time:{visa.Processing_time}</p>
                  <p>Fee:{visa.Fee}</p>
                  <p>Validity:{visa.Validity}</p>
                  <p>Application Method:{visa.Application_method}</p>
                  <div className="card-actions">
                  <button onClick={() => handleSeeDetails(visa._id)} className="btn btn-primary">See Details</button>
                  </div>
                </div>
              </Zoom>
            ))}
          </div>
          )}
          
        </div>

        <Footer></Footer>
      </div>
      </div>
    );
};

export default AllVisas;