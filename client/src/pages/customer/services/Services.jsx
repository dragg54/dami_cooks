import Image from '@/components/image/Image'
import React from 'react'
import FreshlyCooked from './FreshlyCooked'
import Pastry from './Pastry'
import Catering from './Catering'
import { Button } from '@/components/button/Button'
import { motion } from "framer-motion";
import ScrollFadeIn from '@/components/animations/ScrollFadeIn'


const Services = () => {
  return (
    <div className='w-full'>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full h-[500px] object-contain overflow-hidden'>
        <Image style={'!w-full'} src={'/images/CUTLERY.jpg'}/>
      </ScrollFadeIn>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className='mt-10 px-3'>
         <p className='text-5xl font-semibold'>Our Services - Bringing the Taste of Nigeria to the UK</p>
         <p className='mt-6'>At Dami Cooks, we’re passionate about delivering authentic Nigerian cuisine right to your doorstep. Whether you're craving traditional meals or quick snacks, our app makes it fast,
           easy, and enjoyable to experience the rich flavors of Nigeria — anywhere in the UK.</p>
      </ScrollFadeIn>
      <div className='w-full flex flex-col px-3  md:grid grid-cols-3 mb-20 md:mb-[500px] gap-x-2'>
        <FreshlyCooked />
      <Pastry />
      <Catering />
      </div>
      <div className="md:absolute w-full  gap-x-5 mb-0 flex md:justify-between md:pr-[1px] items-center flex-col md:flex-row h-[840px]
                  md:h-[400px] bg-[#fdb750] text-red-700 left-0 md:px-10 py-3 md:-bottom-[60rem] ">
                <div className="md:w-[450px] md:ml-20 ml-20 flex justify-center md:justify-start items-center w-full mx-auto object-cover md:-mt-4 h-[300px] md:h-[100px] ">
                    <img className="flex justify-center mx-auto md:justify-start md:mr-0" src={'/images/FOOD3.png'} />
                </div>
                <div className="h-[200px] p-3 md:w-[500px] md:absolute md:left-[500px] md:mr-20  md:mt-0 w-full  flex flex-col items-center">
                    <p className="text-4xl font-extrabold  mb-5">We are ready</p>
                    <p className="text-center">Join thousands of food lovers who trust us to bring a taste of home, every day.</p>
                    <p className="mt-2 text-center">Rediscover the joy of African cuisine. From traditional stews to local street favorites, browse our menu and place your order with ease — we’ll handle the rest.</p>
                    <Button className={'mt-6 !py-3 !rounded-full !w-[200px]'}>Place Order</Button>
                </div>
                <div className="md:w-[450px] md:ml-60  mt-20 flex justify-center md:justify-end items-center w-full mx-auto object-cover md:-mt-4 h-[300px] md:h-[100px] ">
                    <img src="/images/DeliveryMan.png" />
                </div>
            </div>
    </div>
  )
}

export default Services