/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import Search from './Search'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import PopUp from '../PopUp';

const AuthLayout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    return (
        <div className='w-full bg-[#efefef] relative'>
            <Header {...{ navIsOpen, setNavIsOpen }} />
            <PopUp />
            <div className='w-full  overflow-hidden  md:w-full mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout