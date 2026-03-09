import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        alert('Please login or register an account to search for accommodations.');
        navigate('/login');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] overflow-hidden pt-20 lg:pt-0">
            
            {/* Left Content Area */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24 z-10 py-12 lg:py-0 relative">
                
                {/* Decorative blob in background */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="relative">
                    {/* Typography */}
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-semibold mb-6 shadow-sm">
                        AI-Powered Housing
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
                        MOV <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0369A1] to-[#0D9488]">Stay</span>
                    </h1>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#334155] mb-6">
                        Match <span className="text-[#0D9488]">•</span> Optimize <span className="text-[#0D9488]">•</span> Verify
                    </h2>
                    
                    <p className="text-lg text-[#475569] max-w-xl mb-10 leading-relaxed">
                        A smart platform helping students discover safe, affordable, and verified PGs and hostels using AI-powered recommendations and insights.
                    </p>

                    {/* Search Bar Container */}
                    <div className="w-full max-w-2xl bg-white p-2 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col sm:flex-row items-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-8 focus-within:ring-2 focus-within:ring-teal-500/20">
                        <div className="pl-4 w-full flex items-center py-2 sm:py-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by City, Area, or College..."
                                className="w-full bg-transparent border-none outline-none text-[#1E293B] placeholder-[#94A3B8] px-4 py-3 text-base sm:text-lg font-medium"
                            />
                        </div>
                        <button onClick={handleSearch} className="w-full sm:w-auto flex-shrink-0 bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg group mt-2 sm:mt-0">
                            <span className="font-semibold text-lg">Search</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-3">
                        {['Budget', 'Amenities', 'Gender', 'Room Type'].map((filter) => (
                            <button
                                key={filter}
                                className="px-5 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#475569] font-medium text-sm hover:bg-teal-50 hover:text-[#0D9488] hover:border-teal-200 transition-all duration-300 shadow-sm"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Video Area */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen hidden md:flex items-center justify-center relative z-20 p-8 lg:p-12 xl:p-16">
                
                {/* Framed Video Container */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(13,148,136,0.15)] ring-1 ring-gray-900/5 transform transition-transform duration-700 hover:scale-[1.02]">
                    
                    {/* Subtle dark overlay for contrast */}
                    <div className="absolute inset-0 bg-[#0F172A]/5 mix-blend-overlay z-10"></div>
                    
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/Landing Page Video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            
        </div>
    );
};

export default Hero;
