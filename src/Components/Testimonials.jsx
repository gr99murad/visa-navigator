import React from 'react';

const Testimonials = () => {
    return (
        <div className='bg-gray-100 p-10 text-center'>
            <h2 className='text-3xl font-bold mb-6'>What Our Clients Say?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='card shadow-md p-6'>
                <p className=''>"The visa process was seamless. I highly recommended their services!"</p>
                <h3 className='font-bold mt-4'>- Sheam Hossain</h3>
            </div>
            <div className='card shadow-md p-6'>
            <p className=''>"Excellent customer support. They answer all my question"</p>
            <h3 className='font-bold mt-4'>- Tanvir Islam</h3>
            </div>
            <div className='card shadow-md p-6'>
            <p className=''>"Got my work visa approved quickly. Amazing experience!"</p>
            <h3 className='font-bold mt-4'>- Alex Hells</h3>
            </div>
            </div>
        </div>
    );
};

export default Testimonials;