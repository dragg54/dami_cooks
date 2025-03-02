/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const AdminLayout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    return (
        <div className='w-full h-screen'>
            <NavigationMenu {...{ navIsOpen, setNavIsOpen }} />
            <Header {...{ navIsOpen, setNavIsOpen }} />
            <div className='w-full flex h-full'>
                <SideBar />
                <div className='w-full p-1 md:pl-24 md:p-12 pb-0 h-full bg-[#efefef] overflow-hidden flex justify-center'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout