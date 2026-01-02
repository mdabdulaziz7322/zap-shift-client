import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';

const ZapShiftLogo = () => {
    return (
        <Link to='/'>
        <div className='flex items-end '>
            <img src={logo} alt="ZapShift Logo " className='w-10' />
            <p className='text-3xl font-extrabold -ml-2 '>ZapShift</p>

        </div></Link>
    );
};

export default ZapShiftLogo;