/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import Search from './Search'
import Footer from './Footer';

const Layout = ({children}) => {
    const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <div className='w-full h-screen'>
      <NavigationMenu {...{navIsOpen, setNavIsOpen}}/>
      <Header {...{navIsOpen, setNavIsOpen}}/>
      <Search />
      <div className='w-full md:w-2/3 mx-auto md:p-3 md:border md:mt-6'>
      {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout