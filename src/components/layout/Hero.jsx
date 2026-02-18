import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-6 leading-tight z-10">
                Manage your life and <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    goals with Desk
                </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed z-10">
                Track your personal goals, manage your daily to-dos, and visualize your progress.
                Simple, focused, and effective.
            </p>

            <Link
                to="/dashboard"
                className="group relative inline-flex items-center gap-2 bg-[#0f0c29] text-white px-8 py-4 rounded-xl text-lg font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-white/20"
            >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>

            {/* Mock dashboard preview similar to image */}
            <div className="mt-20 w-full max-w-5xl rounded-xl border border-white/10 p-2 bg-white/5 backdrop-blur-sm shadow-2xl z-10 transform hover:scale-[1.01] transition-transform duration-500">
                <div className="rounded-lg overflow-hidden bg-[#0f0c29]">
                    {/* We will add a mock dashboard image or SVG here, for now simpler placeholder or verify if we have one */}
                    {/* If user uploaded image, we can't use it directly as part of UI unless we process it. 
                 Better to build a CSS/React representation of the dashboard preview for the landing page or use a generic one. 
                 For now, I'll build a simplified header of the dashboard preview. */}
                    <div className="w-full h-[400px] bg-slate-900/50 flex items-center justify-center border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-14 border-b border-white/10 flex items-center px-4 gap-4 bg-[#1a1a2e]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="flex-1 bg-white/5 h-8 rounded-md mx-4" />
                        </div>
                        {/* Content placeholder */}
                        <div className="text-center">
                            <p className="text-blue-400 font-mono text-sm mb-2">Interactive Dashboard Preview</p>
                            <h3 className="text-2xl font-semibold text-white">Your Insights Central</h3>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
