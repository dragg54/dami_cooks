import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Switch from '../../../components/input/Switch';

const Settings = () => {
  return (
    <div className='w-full bg-white h-[80vh] flex shadow-md shadow-gray-500'>
      <div className='w-[20%] flex gap-6 pl-6 flex-col items-start pt-20 bg-gray-100 h-full shadow-md shadow-gray-400'>
        <p className='text-2xl font-semibold'>Settings</p>
        <ul className='flex text-sm font-medium flex-col gap-5 text-gray-600'>
          <NavLink
            to="user-management"
            className={({ isActive }) =>
              isActive ? 'font-bold text-black' : ''
            }
          >
            <li>User Management</li>
          </NavLink>
          <NavLink
            to="availability"
            className={({ isActive }) =>
              isActive ? 'font-bold text-black' : ''
            }
          >
            <li className='flex items-center gap-1'>
              <span>Availability</span>
            </li>
          </NavLink>
          <NavLink
            to="reports"
            className={({ isActive }) =>
              isActive ? 'font-bold text-black' : ''
            }
          >
            <li>Reports</li>
          </NavLink>
          <NavLink
            to="notifications"
            className={({ isActive }) =>
              isActive ? 'font-bold text-black' : ''
            }
          >
            <li>Notifications</li>
          </NavLink>
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              isActive ? 'font-bold text-black' : ''
            }
          >
            <li>Change Password</li>
          </NavLink>
        </ul>
      </div>
      <div className='w-[80%] h-screen'>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
