import React from 'react';
import logo from '../../../assets/logo.png';

const ZapShiftLogo = () => {
    return (
        <div className='flex items-end '>
            <img src={logo} alt="ZapShift Logo " className='w-10' />
            <p className='text-3xl font-extrabold -ml-2 '>ZapShift</p>

        </div>
    );
};

export default ZapShiftLogo;