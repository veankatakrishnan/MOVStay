import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gateway from './components/Gateway';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Gateway />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
