import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Info from './pages/Info';
import Contact from './pages/Contact';

import Layer from './assets/Layer.png';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen w-full cyber-gradient">
          {/* Cyberpunk background with tech patterns */}
          <div className="min-h-screen relative">
            {/* Animated cyber background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Matrix-style rain effect */}
              <div className="absolute inset-0 bg-cyber-pattern"></div>
              
              {/* Floating cyber orbs */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-matrix-green/20 rounded-full filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-cyan/20 rounded-full filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-500/20 rounded-full filter blur-xl opacity-50 animate-float" style={{animationDelay: '4s'}}></div>
              
              {/* Cyber grid overlay */}
              <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
              
              {/* Scanning lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matrix-green to-transparent animate-cyber-scan"></div>
              <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-cyber-scan" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-500 to-transparent animate-cyber-scan" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="relative z-10">
              <Header />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/info" element={<Info />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
