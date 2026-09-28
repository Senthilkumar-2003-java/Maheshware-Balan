import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import VideoModal from './components/VideoModal';
import VolunteerModal from './components/VolunteerModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ProgramsPage from './pages/ProgramsPage';
import Gallery from './pages/Gallery';
import Donations from './pages/Donations';
import TestimonialsPage from './pages/TestimonialsPage';
import Contact from './pages/Contact';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Navigation Bar */}
        <Navbar onOpenDonate={() => setDonateOpen(true)} />

        {/* Dynamic Route Pages */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenDonate={() => setDonateOpen(true)}
                  onOpenVideo={() => setVideoOpen(true)}
                  onOpenVolunteer={() => setVolunteerOpen(true)}
                />
              }
            />
            <Route
              path="/about"
              element={<About onOpenDonate={() => setDonateOpen(true)} />}
            />
            <Route
              path="/programs"
              element={<ProgramsPage onOpenDonate={() => setDonateOpen(true)} />}
            />
            <Route
              path="/gallery"
              element={<Gallery />}
            />
            <Route
              path="/donations"
              element={<Donations onOpenDonate={() => setDonateOpen(true)} />}
            />
            <Route
              path="/testimonials"
              element={<TestimonialsPage onOpenDonate={() => setDonateOpen(true)} />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
          </Routes>
        </div>

        {/* Global Large Footer */}
        <Footer onOpenDonate={() => setDonateOpen(true)} />

        {/* Global Modals */}
        <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
        <VideoModal
          isOpen={videoOpen}
          onClose={() => setVideoOpen(false)}
          onOpenDonate={() => setDonateOpen(true)}
        />
        <VolunteerModal
          isOpen={volunteerOpen}
          onClose={() => setVolunteerOpen(false)}
        />
      </div>
    </Router>
  );
}
