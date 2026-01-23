/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Header } from './Header'
import { Outlet } from 'react-router-dom';
import PopUp from '../PopUp';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    return (
        <div className='w-full bg-[#efefef] relative'>
            <Header {...{ navIsOpen, setNavIsOpen }} />
            <ToastContainer className={"border-red-600 text-xs p-3"} position="top-right" autoClose={5000} />
            <PopUp />
            <div className='w-full  overflow-hidden  md:w-full mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout