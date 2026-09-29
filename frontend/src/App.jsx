import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import VideoModal from './components/VideoModal';
import VolunteerModal from './components/VolunteerModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ProgramsPage from './pages/ProgramsPage';
import Gallery from './pages/Gallery';
import Donations from './pages/Donations';
import TestimonialsPage from './pages/TestimonialsPage';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected route — redirect to login if not authenticated
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}

// Public layout — shows Navbar + Footer
function PublicLayout({ children, onOpenDonate }) {
  return (
    <>
      <Navbar onOpenDonate={onOpenDonate} />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer onOpenDonate={onOpenDonate} />
    </>
  );
}

function AppRoutes() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const location = useLocation();

  // Admin routes — no Navbar/Footer
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />

      {isAdminRoute ? (
        // ── ADMIN ROUTES ── no public navbar/footer
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      ) : (
        // ── PUBLIC ROUTES ── with navbar/footer
        <PublicLayout onOpenDonate={() => setDonateOpen(true)}>
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
            <Route path="/about" element={<About onOpenDonate={() => setDonateOpen(true)} />} />
            <Route path="/programs" element={<ProgramsPage onOpenDonate={() => setDonateOpen(true)} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donations" element={<Donations onOpenDonate={() => setDonateOpen(true)} />} />
            <Route path="/testimonials" element={<TestimonialsPage onOpenDonate={() => setDonateOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

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
        </PublicLayout>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
