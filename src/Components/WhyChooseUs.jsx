import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className='bg-white p-10 text-center'>
            <h2 className='text-3xl font-bold mb-6'>Why Choose Us?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='card shadow-md p-6'>
                <h3 className='text-xl font-bold'>Trusted Experts</h3>
                <p className=''>Our experienced consultants ensure visa success with ease.</p>
            </div>
            <div className='card shadow-md p-6'>
                <h3 className='text-xl font-bold'>Global Coverage</h3>
                <p className=''>We provide visa services for countries worldwide.</p>
            </div>
            <div className='card shadow-md p-6'>
                <h3 className='text-xl font-bold'>Secure Processing</h3>
                <p className=''>Your data is safe our state-of-the-art security measures.</p>
            </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;