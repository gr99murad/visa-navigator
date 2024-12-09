import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const LatestVisas = () => {
    const [latestVisas, setLatestVisas] = useState([]);
    const navigate = useNavigate();
    
    

    // fetch latest visas from backend api
    useEffect(() => {
        fetch("http://localhost:5000/api/latestVisas")
        .then((res) => res.json())
        .then((data) => setLatestVisas(data))
        .catch((error) => console.error(error));

   
       
    }, []);

    const handleSeeDetails = (visaId) => {
      navigate(`/visaDetails/${visaId}`);
    }

    

    return (
      <div>
        <h2 className='text-3xl font-bold text-center mb-8'>Latest Visas</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {latestVisas.map((visa, index) => (
            <div key={index} className="card bg-base-100 mx-auto w-64 lg:w-96 shadow-xl">
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
          </div>
        ))}
        </div>
        <NavLink className="items-center" to="/allVisas"><button className='btn btn-secondary mt-4 ml-44 md:ml-72 lg:ml-96 ' >See All Visas</button></NavLink>
      </div>
    );
};

export default LatestVisas;