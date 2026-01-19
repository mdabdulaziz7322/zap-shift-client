import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import ZapShiftLogo from '../ZapShiftLogo/ZapShiftLogo';
import UseAuth from '../../../hooks/UseAuth';


const Navbar = () => {
    const { user, signOutUser } = UseAuth();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state || '/';
    // navigate(from);

    const handleSignOut = async () => {
        navigate("/");          // 👈 go home first
        try {
            await signOutUser();  // then sign out
        } catch (err) {
            console.error(err);
        }
    };

    const activeClass = ({ isActive }) =>
        isActive ? "border-b-2 border-[#CAEB66] text-green-900" : "text-gray-700 hover:text-green-900";

    const navItems = (
        <>
            <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
            <li><NavLink to="/send-parcel" className={activeClass}>Send a parcel</NavLink></li>
            <li><NavLink to="/coverage" className={activeClass}>Coverage</NavLink></li>
            <li><NavLink to="/about" className={activeClass}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={activeClass}>Contact Us</NavLink></li>
            <li><NavLink to="/rider" className={activeClass}>Be a Rider</NavLink></li>

            {/* ✅ Mobile-only auth buttons */}
            {user && (
                <>
                    <li className="lg:hidden">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="lg:hidden">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                </>
            )}

            {!user && (
                <>
                    <li className="lg:hidden">
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li className="lg:hidden">
                        <NavLink to="/register">Register</NavLink>
                    </li>
                </>
            )}
        </>
    );


    return (
        <div className="navbar bg-base-100 max-w-7xl mx-auto mb-10 p-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 ">
                        {navItems}
                    </ul>
                </div>
                <Link className="hidden lg:block" to="/"><ZapShiftLogo></ZapShiftLogo></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal  px-1">
                    {navItems}
                </ul>
            </div>
            <Link to="/" className="lg:hidden navbar-end">
                <div className="scale-90">
                    <ZapShiftLogo />
                </div>
            </Link>
            <div className="navbar-end hidden lg:flex gap-2">



                {user ? (
                    <div className='flex gap-2'>
                        <Link to='/dashboard'>
                            <button className="btn btn-dash border-[#8bb901] hover:bg-[#8bb901] ">Dashboard</button>
                        </Link>
                        <button onClick={handleSignOut} className="btn bg-[#CAEB66] rounded-xl px-6">Sign Out</button>
                    </div>
                ) : (

                    <div className='flex gap-2'>
                        <Link to='/login'>
                            <button className="btn btn-outline border-[#8bb901] rounded-xl px-6">Login</button>
                        </Link>
                        <Link to='/register'>
                            <button className="btn bg-[#CAEB66] rounded-xl px-6">Register</button>
                        </Link>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Navbar;