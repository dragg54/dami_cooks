/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import Search from './Search'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    return (
        <div className='w-full bg-[#efefef]'>
            <Header {...{ navIsOpen, setNavIsOpen }} />
            <div className='w-full  overflow-hidden  md:w-full mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout