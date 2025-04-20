/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import Search from './Search'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Cart from '../cart/Cart';
import GlobalModal from '../GlobalModal';
import PopUp from '../PopUp';
import UserAccount from './UserAccount';
import Orders from '../order/Orders';

const Layout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false)
    const [userAccountOpen, setUserAccountOpen] = useState(false)
    const [userOrdersOpened, setUserOrdersOpened] = useState(false)
  return (
    <div className='w-full h-screen relative '>
      <GlobalModal />
      <NavigationMenu {...{navIsOpen, setNavIsOpen}}/>
      <Cart {...{cartOpen, setCartOpen}}/>
      <Orders {...{userOrdersOpened, setUserOrdersOpened}}/>
      <Header {...{navIsOpen, setNavIsOpen, cartOpen, setCartOpen, setUserAccountOpen}}/>
      <UserAccount {...{userAccountOpen, setUserAccountOpen, setUserOrdersOpened}}/>
      <Search />
      <div className='w-full overflow-hidden  md:w-2/3 mx-auto md:p-3  md:mt-6 mb-16'>
      <Outlet />
      </div>
      <Footer />
      <PopUp />
    </div>
  )
}

export default Layout