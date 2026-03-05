import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const LandingPage = () => {
    return (
        <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
            <Navbar />
            <Hero />
            {/* Add additional sections here later, like features, testimonials, etc. */}
        </div>
    );
};

export default LandingPage;
