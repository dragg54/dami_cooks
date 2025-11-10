import Image from '@/components/image/Image'
import React from 'react'
import FreshlyCooked from './FreshlyCooked'
import Pastry from './Pastry'
import Catering from './Catering'
import { Button } from '@/components/button/Button'
import { motion } from "framer-motion";
import ScrollFadeIn from '@/components/animations/ScrollFadeIn'
import { PiChefHatThin } from "react-icons/pi";


const Services = () => {
  return (
    <div className='w-full'>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full h-[500px] object-contain overflow-hidden'>
        <Image style={'!w-full'} src={'/images/catering2.jpg'} />
      </ScrollFadeIn>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className='mt-10 px-3 mb-10'>
        <p className='text-5xl font-semibold'>Our Catering Service -Delicious African & International Cuisine, Delivered Fresh for Every Occasion!</p>
        <p className='mt-6'>We provide delicious, freshly-prepared African and international dishes for all occasions.
          From intimate gatherings to large events, we ensure quality, flavor, and timely service. Our menu includes native rice, moin moin, jollof pasta, meats, pastries, and more.
          With attention to detail and customer satisfaction at the heart of what we do, we make every event memorable with authentic
          taste and exceptional service.</p>
        <Button {...{ className: '!rounded-full !mx-auto  !w-[200px] py-3 mt-12 md:mt-20 !font-semibold' }}>Contact Us</Button>
      </ScrollFadeIn>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full h-[500px] object-contain overflow-hidden'>
        <Image style={'!w-full'} src={'/images/CUTLERY.jpg'} />
      </ScrollFadeIn>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className='mt-10 px-3'>
        <p className='text-5xl font-semibold'>Bringing the Taste of Nigeria to the UK</p>
        <p className='mt-6'>At Dami Cooks, we’re passionate about delivering authentic Nigerian cuisine right to your doorstep. Whether you're craving traditional meals or quick snacks, our app makes it fast,
          easy, and enjoyable to experience the rich flavors of Nigeria — anywhere in the UK.</p>
      </ScrollFadeIn>
      <div className='w-full flex flex-col px-3  md:grid grid-cols-3 mb-20  gap-x-2'>
        <FreshlyCooked />
        <Pastry />
        <Catering />
      </div>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full h-[500px] object-contain mb-[100px] overflow-hidden md:mb-[50px]'>
        <Image style={'!w-full'} src={'/images/catering3.jpg'} />
      </ScrollFadeIn>
      <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className='mt-10 px-3 mb-32'>
        <p className='text-5xl font-semibold'>Let's make your event unforgettable</p>
        <p className='mt-6'>Whether you’re hosting 20 or 200 guests, our team ensures delicious meals, professional service, and a seamless dining experience from start to finish.</p>
        <p className='font-bold mt-4 text-xl underline'>What We Offer:</p>
        <ul className='list-none text-lg'>
          <li className='flex items-center gap-2'><Bullet /> Customized menu options to suit your guests’ taste</li>
          <li className='flex items-center gap-2'><Bullet /> On-site service or buffet-style setup
          </li>
          <li className='flex items-center gap-2'><Bullet /> Pastries, finger foods, and full-course meals</li>
          <li className='flex items-center gap-2'><Bullet /> Flexible packages to fit your budget
          </li>
        </ul>
        <Button {...{ className: '!rounded-full !mx-auto  !w-[200px] py-3 mt-12 md:mt-20 !font-semibold' }}>Contact Us</Button>
      </ScrollFadeIn>
    </div>
  )
}

const Bullet = () => {
  return <div className='text-red-700 '><PiChefHatThin /></div>
}

export default Services