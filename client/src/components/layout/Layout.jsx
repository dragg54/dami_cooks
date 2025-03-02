/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import Search from './Search'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <div className='w-full h-screen'>
      <NavigationMenu {...{navIsOpen, setNavIsOpen}}/>
      <Header {...{navIsOpen, setNavIsOpen}}/>
      <Search />
      <div className='w-full overflow-hidden  md:w-2/3 mx-auto md:p-3  md:mt-6 mb-16'>
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout