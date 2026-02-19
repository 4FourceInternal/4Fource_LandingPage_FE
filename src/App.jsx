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
import Team from './pages/Team';

import Layer from './assets/Layer.png';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Soft tech background blobs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-tech-500/15 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -left-32 w-72 h-72 bg-tech-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 pt-4 pb-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/info" element={<Info />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
