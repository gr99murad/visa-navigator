import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';
import LatestVisas from '../Components/LatestVisas';
import WhyChooseUs from '../Components/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='my-40'>
            <Banner></Banner>
            </div>
            <LatestVisas></LatestVisas>
            <WhyChooseUs></WhyChooseUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;