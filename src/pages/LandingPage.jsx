import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#080810] to-[#24243e] text-white overflow-x-hidden">
            <Navbar />
            <Hero />
            <div className="flex-1 flex items-center justify-center p-10">
                <h2 className="text-3xl font-light text-white/50">More features coming soon...</h2>
            </div>
        </div>
    );
};

export default LandingPage;
