import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <Swiper navigation={true} modules={[Navigation]} className='mySwiper h-96'>
            <SwiperSlide>
               <div className='bg-blue-500 text-white h-full flex items-center justify-center text-3xl font-bold'>
                Explore Global Visa Options
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className='bg-green-500 text-white h-full flex items-center justify-center text-3xl font-bold'>
                Travel Without Limits
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className='bg-purple-500 text-white h-full flex items-center justify-center text-3xl font-bold'>
                Your Visa Journey Start Here!
               </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;