import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';
import LatestVisas from '../Components/LatestVisas';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonials from '../Components/Testimonials';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    },[theme])


    useEffect(() => {
        if(location.state?.message){
            toast.success(location.state.message);

            // clear the message from location.state after displaying the toast
            navigate(location.pathname, {replace:true,  state:{} });
        }
    },[location,navigate]);


    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='my-40'>
            <Banner></Banner>
            </div>
            <LatestVisas></LatestVisas>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            <Footer></Footer>

            <ToastContainer position='top-right' autoClose={3000}></ToastContainer>

            <button onClick={toggleTheme} className='theme-toggle-btn'>Switch to {theme === 'light' ? 'Dark' : 'light'} Mode</button>
        </div>
    );
};

export default Home;