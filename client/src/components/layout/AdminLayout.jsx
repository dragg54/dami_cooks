/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu'
import { Header } from './Header'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import GlobalModal from '../GlobalModal';
import { useSelector } from 'react-redux';
import PopUp from '../PopUp';

const AdminLayout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    const globalModal = useSelector(state => state.globalModal)
    return (
        <div className={`admin w-full overflow-y-hidden  h-screen ${globalModal.opened && 'overflow-y-hidden'}`}>
         <GlobalModal />
         <PopUp />
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