import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/navBar/navBar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='bg-base-200'>
            <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default RootLayout;