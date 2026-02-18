import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full p-6 flex justify-between items-center z-50 relative">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    D
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">Desk</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                {/* Navigation links removed for personal version */}
            </div>

            <div className="flex items-center gap-4">
                {/* <a href="#" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Log in</a> */}
                <Link
                    to="/dashboard"
                    className="bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                    Start for free
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
