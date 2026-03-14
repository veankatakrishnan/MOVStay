import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">MOV Stay</h1>
        <p className="hero-subtitle">Match • Optimize • Verify</p>
        <p className="hero-desc">
          A smart platform helping students discover safe and reliable PG and hostel accommodations with intelligent recommendations, neighborhood insights, and transparent listings.
        </p>
        <a href="#modules" className="btn btn-primary" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
          Explore Modules
        </a>
      </div>
    </section>
  );
};

export default Hero;
