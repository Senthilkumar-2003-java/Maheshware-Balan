import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Users, GraduationCap, HeartPulse,
  PersonStanding, HandHelping, MessageSquare, LogOut, Bell,
  Search, ChevronDown, Menu, X, Plus, FileText, UserPlus,
  Globe, Download, CheckCircle2, Clock, XCircle, RefreshCw,
  IndianRupee, Building2, Phone, Mail, Database, AlertCircle,
  ExternalLink, Filter, Check, ShieldCheck, Sparkles, MapPin,
  Calendar, Layers, Eye
} from 'lucide-react';
import {
  getDonationsApi,
  getDonationStatsApi,
  getContactsApi,
  updateContactStatusApi,
  getVolunteersApi,
  updateVolunteerStatusApi,
  getBeneficiariesApi,
  addBeneficiaryApi,
  updateBeneficiaryStatusApi
} from '../services/api';

function StatusBadge({ status }) {
  const map = {
    Completed: { bg: '#E8F5E9', color: '#1B5E20', border: '#C8E6C9', icon: CheckCircle2 },
    Approved: { bg: '#E8F5E9', color: '#1B5E20', border: '#C8E6C9', icon: CheckCircle2 },
    Resolved: { bg: '#E8F5E9', color: '#1B5E20', border: '#C8E6C9', icon: CheckCircle2 },
    Pending: { bg: '#FFF8E1', color: '#B45309', border: '#FDE68A', icon: Clock },
    'In Review': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: Clock },
    'In Progress': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: Clock },
    New: { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A', icon: Bell },
    Rejected: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: XCircle },
    Failed: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: XCircle },
    Inactive: { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB', icon: XCircle },
  };
  const s = map[status] || map.Pending;
  const Icon = s.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      borderRadius: '9999px', padding: '3px 10px',
      fontSize: '0.74rem', fontWeight: '700', letterSpacing: '0.02em',
    }}>
      <Icon size={12} /> {status}
    </span>
  );
}

function KPICard({ icon: Icon, label, value, subtext, iconBg, iconColor, borderColor }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: `1.5px solid ${borderColor || '#EAE3D2'}`,
      boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
      padding: '22px 24px',
      flex: '1 1 200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '14px',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={22} color={iconColor} strokeWidth={2} />
        </div>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: '700',
          color: '#064B35',
          background: 'rgba(6, 75, 53, 0.08)',
          padding: '3px 9px',
          borderRadius: '9999px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Live DB
        </span>
      </div>
      <div>
        <div style={{
          fontSize: '1.85rem',
          fontWeight: '800',
          color: '#102A43',
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
          marginBottom: '4px',
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          {value}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#486581', fontWeight: '600', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.74rem', color: '#829AB1' }}>
          {subtext}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  // Navigation & UI States
  const [activeNav, setActiveNav] = useState('overview'); // overview | donations | beneficiaries | volunteers | contacts
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState('ALL');

  // Real Database States — 100% MySQL from backend
  const [donations, setDonations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [dbStats, setDbStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Add Beneficiary Modal State
  const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState(false);
  const [beneficiarySubmitting, setBeneficiarySubmitting] = useState(false);
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    full_name: '',
    program_area: 'Education',
    location: 'Tamil Nadu',
    assistance_amount: '',
    notes: '',
  });

  const showFeedback = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 4000);
  };

  // Fetch all real data from backend API
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [donationsRes, statsRes, contactsRes, volunteersRes, beneficiariesRes] = await Promise.all([
        getDonationsApi(),
        getDonationStatsApi(),
        getContactsApi(),
        getVolunteersApi(),
        getBeneficiariesApi(),
      ]);

      setDonations(donationsRes.donations || []);
      setContacts(contactsRes.contacts || []);
      setVolunteers(volunteersRes.volunteers || []);
      setBeneficiaries(beneficiariesRes.beneficiaries || []);
      if (statsRes.stats) setDbStats(statsRes.stats);

      const isOnline = donationsRes.success !== false && contactsRes.success !== false;
      setIsLiveBackend(isOnline);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setIsLiveBackend(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Update Status Handlers (Instant DB updates)
  const handleUpdateContactStatus = async (id, newStatus) => {
    const res = await updateContactStatusApi(id, newStatus);
    if (res.success) {
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
      showFeedback(`Inquiry #${id} status updated to ${newStatus}`);
    } else {
      showFeedback('Failed to update status in database.');
    }
  };

  const handleUpdateVolunteerStatus = async (id, newStatus) => {
    const res = await updateVolunteerStatusApi(id, newStatus);
    if (res.success) {
      setVolunteers((prev) => prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)));
      showFeedback(`Volunteer #${id} status updated to ${newStatus}`);
    } else {
      showFeedback('Failed to update status in database.');
    }
  };

  const handleUpdateBeneficiaryStatus = async (id, newStatus) => {
    const res = await updateBeneficiaryStatusApi(id, newStatus);
    if (res.success) {
      setBeneficiaries((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      showFeedback(`Beneficiary #${id} status updated to ${newStatus}`);
    } else {
      showFeedback('Failed to update beneficiary status.');
    }
  };

  const handleAddBeneficiary = async (e) => {
    e.preventDefault();
    if (!beneficiaryForm.full_name) {
      alert('Please enter beneficiary full name');
      return;
    }
    setBeneficiarySubmitting(true);
    try {
      const res = await addBeneficiaryApi({
        full_name: beneficiaryForm.full_name,
        program_area: beneficiaryForm.program_area,
        location: beneficiaryForm.location,
        assistance_amount: parseFloat(beneficiaryForm.assistance_amount) || 0,
        notes: beneficiaryForm.notes,
        status: 'Approved',
      });
      if (res.success) {
        showFeedback('New beneficiary enrolled successfully into database!');
        setShowAddBeneficiaryModal(false);
        setBeneficiaryForm({
          full_name: '',
          program_area: 'Education',
          location: 'Tamil Nadu',
          assistance_amount: '',
          notes: '',
        });
        loadDashboardData();
      } else {
        alert(res.message || 'Failed to add beneficiary');
      }
    } catch (err) {
      alert('Error connecting to backend database');
    } finally {
      setBeneficiarySubmitting(false);
    }
  };

  // CSV Export helper
  const exportToCSV = (filename, data, headers) => {
    if (!data || data.length === 0) {
      alert('No data to export.');
      return;
    }
    const csvRows = [];
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header] !== undefined && row[header] !== null ? String(row[header]) : '';
        return `"${val.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed Real DB Values (no hardcoded fallback values)
  const totalAmountRaised = donations
    .filter((d) => d.status === 'Completed')
    .reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  const filteredDonations = donations.filter((d) => {
    const matchSearch =
      (d.donor_name && d.donor_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.email && d.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.transaction_id && d.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCause = causeFilter === 'ALL' || d.cause === causeFilter;
    return matchSearch && matchCause;
  });

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    const matchSearch =
      (b.full_name && b.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.program_area && b.program_area.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.location && b.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCause = causeFilter === 'ALL' || b.program_area === causeFilter;
    return matchSearch && matchCause;
  });

  const filteredVolunteers = volunteers.filter((v) => {
    return (
      (v.full_name && v.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.email && v.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.preferred_area && v.preferred_area.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const filteredContacts = contacts.filter((c) => {
    return (
      (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.subject && c.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.message && c.message.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const navMenuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, count: null },
    { id: 'donations', label: 'Donations & Funds', icon: Heart, count: donations.length },
    { id: 'beneficiaries', label: 'Beneficiary Cases', icon: Users, count: beneficiaries.length },
    { id: 'volunteers', label: 'Volunteers Network', icon: HandHelping, count: volunteers.length },
    { id: 'contacts', label: 'Inquiries & Messages', icon: MessageSquare, count: contacts.length },
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#FAF8F5',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#102A43',
    }}>
      {/* ── MOBILE BACKDROP OVERLAY ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(6, 75, 53, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
        />
      )}

      {/* ── SIDEBAR NAVIGATION ── */}
      <aside style={{
        width: '280px',
        backgroundColor: '#064B35',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 999,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: sidebarOpen ? 'translateX(0)' : 'none',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
      }}
      className={sidebarOpen ? 'sidebar-open' : 'sidebar-desktop'}
      >
        <div>
          {/* Brand Logo Header */}
          <div style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#D79A18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#064B35',
                fontWeight: '900',
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px rgba(215, 154, 24, 0.3)',
              }}>
                M
              </div>
              <div>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em',
                }}>
                  Maheswari &amp; Balan
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: '500',
                }}>
                  Admin Trust Portal
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="mobile-close-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Database Live Status Badge */}
          <div style={{ padding: '16px 20px 8px 20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isLiveBackend ? 'rgba(74, 222, 128, 0.12)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${isLiveBackend ? 'rgba(74, 222, 128, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              padding: '8px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: isLiveBackend ? '#4ADE80' : '#FCA5A5',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isLiveBackend ? '#4ADE80' : '#EF4444',
                boxShadow: isLiveBackend ? '0 0 8px #4ADE80' : '0 0 8px #EF4444',
              }} />
              <span>{isLiveBackend ? 'MySQL Connected: mbmct_db' : 'MySQL Offline (Check DB)'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '12px 14px' }}>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              padding: '8px 12px',
            }}>
              NAVIGATION
            </div>
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isActive ? '#D79A18' : 'transparent',
                    color: isActive ? '#064B35' : '#FFFFFF',
                    fontWeight: isActive ? '800' : '500',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    marginBottom: '4px',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span style={{
                      backgroundColor: isActive ? '#064B35' : 'rgba(255, 255, 255, 0.15)',
                      color: isActive ? '#FFFFFF' : '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User & Actions */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(215, 154, 24, 0.2)',
              border: '1.5px solid #D79A18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D79A18',
              fontWeight: '700',
              fontSize: '0.9rem',
            }}>
              S
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                fontSize: '0.86rem',
                fontWeight: '700',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}>
                {adminUser?.fullName || 'Senthilkumar'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#D79A18', fontWeight: '600' }}>
                Super Administrator
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: '600',
              }}
            >
              <ExternalLink size={13} />
              <span>Website</span>
            </Link>
            <button
              onClick={handleLogout}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#FCA5A5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{
        flex: 1,
        marginLeft: '280px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="main-desktop"
      >
        {/* Top Navbar */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EAE3D2',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 900,
          boxShadow: '0 2px 10px rgba(6, 75, 53, 0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="mobile-burger-btn"
              style={{
                display: 'none',
                background: '#FAF8F5',
                border: '1px solid #EAE3D2',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                color: '#064B35',
              }}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                color: '#064B35',
                margin: 0,
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: '-0.01em',
              }}>
                {activeNav === 'overview' && 'Dashboard Overview'}
                {activeNav === 'donations' && 'Donations & Contributions'}
                {activeNav === 'beneficiaries' && 'Beneficiary Case Management'}
                {activeNav === 'volunteers' && 'Volunteers Network'}
                {activeNav === 'contacts' && 'Inquiries & Contact Requests'}
              </h1>
              <p style={{ margin: 0, fontSize: '0.76rem', color: '#667085' }}>
                Real-time records from MySQL database • Last synced: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Quick Actions */}
            <button
              onClick={loadDashboardData}
              disabled={loading}
              title="Refresh database records"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid #EAE3D2',
                backgroundColor: '#FFFFFF',
                color: '#064B35',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Refreshing...' : 'Refresh DB'}</span>
            </button>

            {activeNav === 'beneficiaries' && (
              <button
                onClick={() => setShowAddBeneficiaryModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#064B35',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(6, 75, 53, 0.2)',
                }}
              >
                <Plus size={15} />
                <span>Enroll Beneficiary</span>
              </button>
            )}
          </div>
        </header>

        {/* Global Toast Alert */}
        {actionMessage && (
          <div style={{
            backgroundColor: '#064B35',
            color: '#FFFFFF',
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.86rem',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <CheckCircle2 size={16} color="#D79A18" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* ── PAGE CONTENT CONTAINER ── */}
        <div style={{ padding: '28px', flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* ═══════════════════════════════════════════════
              VIEW 1: OVERVIEW
             ═══════════════════════════════════════════════ */}
          {activeNav === 'overview' && (
            <div>
              {/* Trust Greeting Card */}
              <div style={{
                background: 'linear-gradient(135deg, #064B35 0%, #0A5C42 100%)',
                borderRadius: '24px',
                padding: '28px 32px',
                color: '#FFFFFF',
                marginBottom: '28px',
                boxShadow: '0 10px 30px rgba(6, 75, 53, 0.15)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ maxWidth: '600px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#D79A18',
                    marginBottom: '8px',
                  }}>
                    <Sparkles size={13} />
                    <span>Maheswari &amp; Balan Memorial Charitable Trust</span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.9rem',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                    lineHeight: '1.2',
                  }}>
                    Vanakkam, {adminUser?.fullName || 'Senthilkumar'}
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.5' }}>
                    Every rupee and record in this dashboard comes directly from your live MySQL database.
                    Supporting education for government school students, cancer patient nutrition, leprosy dignity care, and abandoned elderly shelter.
                  </p>
                </div>

                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  textAlign: 'right',
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#D79A18', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    TRUST MOTTO
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', fontStyle: 'italic', marginTop: '2px' }}>
                    "Serve with Love &amp; Compassion"
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
                    Registration No: 12AA &amp; 80G Certified
                  </div>
                </div>
              </div>

              {/* Real DB Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '18px',
                marginBottom: '32px',
              }}>
                <KPICard
                  icon={IndianRupee}
                  label="Total Funds Raised"
                  value={`₹${totalAmountRaised.toLocaleString('en-IN')}`}
                  subtext={`From ${donations.length} total donations`}
                  iconBg="rgba(215, 154, 24, 0.15)"
                  iconColor="#B45309"
                  borderColor="#FDE68A"
                />
                <KPICard
                  icon={Heart}
                  label="Donations Recorded"
                  value={donations.length}
                  subtext="Stored in MySQL donations table"
                  iconBg="rgba(220, 38, 38, 0.12)"
                  iconColor="#DC2626"
                  borderColor="#FECACA"
                />
                <KPICard
                  icon={Users}
                  label="Beneficiaries Enrolled"
                  value={beneficiaries.length}
                  subtext="Students, cancer, leprosy & elderly"
                  iconBg="rgba(6, 75, 53, 0.12)"
                  iconColor="#064B35"
                  borderColor="#A7F3D0"
                />
                <KPICard
                  icon={HandHelping}
                  label="Volunteers Registered"
                  value={volunteers.length}
                  subtext="Welfare workers & tutors"
                  iconBg="rgba(37, 99, 235, 0.12)"
                  iconColor="#2563EB"
                  borderColor="#BFDBFE"
                />
                <KPICard
                  icon={MessageSquare}
                  label="Inquiries Received"
                  value={contacts.length}
                  subtext="General, 80G receipts & assistance"
                  iconBg="rgba(147, 51, 234, 0.12)"
                  iconColor="#9333EA"
                  borderColor="#E9D5FF"
                />
              </div>

              {/* Two Column Layout: Recent Donations & Quick Beneficiaries */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: '24px',
              }}>
                {/* Recent Real Donations */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid #EAE3D2',
                  padding: '24px',
                  boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#064B35' }}>
                        Recent Live Donations
                      </h3>
                      <div style={{ fontSize: '0.76rem', color: '#829AB1' }}>
                        Live transactions from MySQL database
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveNav('donations')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#064B35',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      View All →
                    </button>
                  </div>

                  {donations.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '36px 12px', color: '#829AB1' }}>
                      <Heart size={32} color="#CBD2D9" style={{ margin: '0 auto 10px auto' }} />
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>No donations recorded yet in database</div>
                      <div style={{ fontSize: '0.78rem', marginTop: '4px' }}>
                        When donors contribute on the website, they will appear here instantly.
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {donations.slice(0, 5).map((d) => (
                        <div
                          key={d.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 14px',
                            backgroundColor: '#FAF8F5',
                            borderRadius: '12px',
                            border: '1px solid #F0ECE1',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#102A43' }}>
                              {d.donor_name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#627D98' }}>
                              {d.cause} • {d.payment_method || 'UPI'}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '800', fontSize: '0.96rem', color: '#064B35' }}>
                              ₹{Number(d.amount).toLocaleString('en-IN')}
                            </div>
                            <StatusBadge status={d.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Inquiries & Messages */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid #EAE3D2',
                  padding: '24px',
                  boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#064B35' }}>
                        Recent Inquiries
                      </h3>
                      <div style={{ fontSize: '0.76rem', color: '#829AB1' }}>
                        Messages submitted via Contact form
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveNav('contacts')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#064B35',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      View All →
                    </button>
                  </div>

                  {contacts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '36px 12px', color: '#829AB1' }}>
                      <MessageSquare size={32} color="#CBD2D9" style={{ margin: '0 auto 10px auto' }} />
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>No inquiries received yet</div>
                      <div style={{ fontSize: '0.78rem', marginTop: '4px' }}>
                        Messages submitted through the contact page will be listed here.
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {contacts.slice(0, 5).map((c) => (
                        <div
                          key={c.id}
                          style={{
                            padding: '12px 14px',
                            backgroundColor: '#FAF8F5',
                            borderRadius: '12px',
                            border: '1px solid #F0ECE1',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#102A43' }}>
                              {c.name}
                            </div>
                            <StatusBadge status={c.status} />
                          </div>
                          <div style={{ fontSize: '0.76rem', color: '#064B35', fontWeight: '600', marginBottom: '4px' }}>
                            {c.subject || 'General Inquiry'}
                          </div>
                          <div style={{
                            fontSize: '0.78rem',
                            color: '#627D98',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            "{c.message}"
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              VIEW 2: DONATIONS
             ═══════════════════════════════════════════════ */}
          {activeNav === 'donations' && (
            <div>
              {/* Filter and Export Bar */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #EAE3D2',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FAF8F5',
                    border: '1.5px solid #EAE3D2',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    minWidth: '240px',
                  }}>
                    <Search size={16} color="#829AB1" />
                    <input
                      type="text"
                      placeholder="Search donor name, email, txn..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '0.84rem',
                        width: '100%',
                      }}
                    />
                  </div>

                  <select
                    value={causeFilter}
                    onChange={(e) => setCauseFilter(e.target.value)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #EAE3D2',
                      backgroundColor: '#FAF8F5',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      color: '#064B35',
                    }}
                  >
                    <option value="ALL">All Causes</option>
                    <option value="Education Support">Education Support</option>
                    <option value="Cancer Care">Cancer Care</option>
                    <option value="Leprosy Support">Leprosy Support</option>
                    <option value="Elderly Care">Elderly Care</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <button
                  onClick={() => exportToCSV('mbmct_donations', filteredDonations, ['id', 'donor_name', 'email', 'phone', 'amount', 'cause', 'payment_method', 'transaction_id', 'status', 'created_at'])}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #EAE3D2',
                    backgroundColor: '#FFFFFF',
                    color: '#064B35',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Real Donations Table */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #EAE3D2',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1.5px solid #EAE3D2', color: '#486581' }}>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>ID</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Donor Details</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Cause Designated</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Amount</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Payment Mode</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Transaction Ref</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDonations.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#829AB1' }}>
                            No donation records found in MySQL database matching this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredDonations.map((d) => (
                          <tr key={d.id} style={{ borderBottom: '1px solid #F0ECE1' }}>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#829AB1' }}>#{d.id}</td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ fontWeight: '700', color: '#102A43' }}>{d.donor_name}</div>
                              <div style={{ fontSize: '0.74rem', color: '#627D98' }}>{d.email} • {d.phone}</div>
                              {d.pan_number && (
                                <div style={{ fontSize: '0.7rem', color: '#B45309', fontWeight: '600' }}>
                                  PAN: {d.pan_number}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <span style={{
                                backgroundColor: 'rgba(6, 75, 53, 0.08)',
                                color: '#064B35',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                              }}>
                                {d.cause}
                              </span>
                            </td>
                            <td style={{ padding: '14px 18px', fontWeight: '800', color: '#064B35', fontSize: '0.96rem' }}>
                              ₹{Number(d.amount).toLocaleString('en-IN')}
                            </td>
                            <td style={{ padding: '14px 18px', color: '#486581', fontWeight: '500' }}>
                              {d.payment_method || 'UPI'}
                            </td>
                            <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontSize: '0.76rem', color: '#627D98' }}>
                              {d.transaction_id || 'N/A'}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <StatusBadge status={d.status} />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              VIEW 3: BENEFICIARIES
             ═══════════════════════════════════════════════ */}
          {activeNav === 'beneficiaries' && (
            <div>
              {/* Filter and Add Bar */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #EAE3D2',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FAF8F5',
                    border: '1.5px solid #EAE3D2',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    minWidth: '240px',
                  }}>
                    <Search size={16} color="#829AB1" />
                    <input
                      type="text"
                      placeholder="Search beneficiary name, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '0.84rem',
                        width: '100%',
                      }}
                    />
                  </div>

                  <select
                    value={causeFilter}
                    onChange={(e) => setCauseFilter(e.target.value)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #EAE3D2',
                      backgroundColor: '#FAF8F5',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      color: '#064B35',
                    }}
                  >
                    <option value="ALL">All Programs</option>
                    <option value="Education">Education</option>
                    <option value="Cancer Care">Cancer Care</option>
                    <option value="Leprosy Support">Leprosy Support</option>
                    <option value="Elderly Care">Elderly Care</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => exportToCSV('mbmct_beneficiaries', filteredBeneficiaries, ['id', 'full_name', 'program_area', 'location', 'assistance_amount', 'status', 'created_at'])}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: '1px solid #EAE3D2',
                      backgroundColor: '#FFFFFF',
                      color: '#064B35',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setShowAddBeneficiaryModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: '#064B35',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={15} />
                    <span>Enroll Beneficiary</span>
                  </button>
                </div>
              </div>

              {/* Beneficiaries Table */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #EAE3D2',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1.5px solid #EAE3D2', color: '#486581' }}>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>ID</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Beneficiary Name</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Program Area</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Location</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Assistance Amount</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Status</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBeneficiaries.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#829AB1' }}>
                            No beneficiary records found. Click "Enroll Beneficiary" to register a patient, student, or elder.
                          </td>
                        </tr>
                      ) : (
                        filteredBeneficiaries.map((b) => (
                          <tr key={b.id} style={{ borderBottom: '1px solid #F0ECE1' }}>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#829AB1' }}>#{b.id}</td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ fontWeight: '700', color: '#102A43' }}>{b.full_name}</div>
                              {b.notes && (
                                <div style={{ fontSize: '0.74rem', color: '#627D98' }}>{b.notes}</div>
                              )}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <span style={{
                                backgroundColor: b.program_area === 'Leprosy Support' ? 'rgba(107, 45, 103, 0.1)' : 'rgba(6, 75, 53, 0.08)',
                                color: b.program_area === 'Leprosy Support' ? '#6B2D67' : '#064B35',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                              }}>
                                {b.program_area}
                              </span>
                            </td>
                            <td style={{ padding: '14px 18px', color: '#486581' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={13} color="#829AB1" />
                                <span>{b.location || 'Tamil Nadu'}</span>
                              </div>
                            </td>
                            <td style={{ padding: '14px 18px', fontWeight: '800', color: '#064B35' }}>
                              ₹{Number(b.assistance_amount || 0).toLocaleString('en-IN')}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <StatusBadge status={b.status} />
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {b.status !== 'Approved' && (
                                  <button
                                    onClick={() => handleUpdateBeneficiaryStatus(b.id, 'Approved')}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #86EFAC',
                                      backgroundColor: '#F0FDF4',
                                      color: '#166534',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Approve
                                  </button>
                                )}
                                {b.status !== 'Rejected' && (
                                  <button
                                    onClick={() => handleUpdateBeneficiaryStatus(b.id, 'Rejected')}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #FECACA',
                                      backgroundColor: '#FEF2F2',
                                      color: '#991B1B',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Reject
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              VIEW 4: VOLUNTEERS
             ═══════════════════════════════════════════════ */}
          {activeNav === 'volunteers' && (
            <div>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #EAE3D2',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FAF8F5',
                  border: '1.5px solid #EAE3D2',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  minWidth: '280px',
                }}>
                  <Search size={16} color="#829AB1" />
                  <input
                    type="text"
                    placeholder="Search volunteer name, email, area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.84rem',
                      width: '100%',
                    }}
                  />
                </div>

                <button
                  onClick={() => exportToCSV('mbmct_volunteers', filteredVolunteers, ['id', 'full_name', 'email', 'phone', 'preferred_area', 'availability', 'status', 'created_at'])}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #EAE3D2',
                    backgroundColor: '#FFFFFF',
                    color: '#064B35',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Volunteers Table */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #EAE3D2',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1.5px solid #EAE3D2', color: '#486581' }}>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>ID</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Volunteer Name</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Contact</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Preferred Field</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Availability</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Status</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVolunteers.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#829AB1' }}>
                            No volunteer applications recorded in MySQL database yet.
                          </td>
                        </tr>
                      ) : (
                        filteredVolunteers.map((v) => (
                          <tr key={v.id} style={{ borderBottom: '1px solid #F0ECE1' }}>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#829AB1' }}>#{v.id}</td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ fontWeight: '700', color: '#102A43' }}>{v.full_name}</div>
                              {v.skills && <div style={{ fontSize: '0.74rem', color: '#627D98' }}>{v.skills}</div>}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ color: '#102A43', fontWeight: '600' }}>{v.email}</div>
                              <div style={{ fontSize: '0.75rem', color: '#627D98' }}>{v.phone}</div>
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <span style={{
                                backgroundColor: 'rgba(215, 154, 24, 0.1)',
                                color: '#B45309',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                              }}>
                                {v.preferred_area}
                              </span>
                            </td>
                            <td style={{ padding: '14px 18px', color: '#486581' }}>
                              {v.availability || 'Weekends'}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <StatusBadge status={v.status} />
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {v.status !== 'Approved' && (
                                  <button
                                    onClick={() => handleUpdateVolunteerStatus(v.id, 'Approved')}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #86EFAC',
                                      backgroundColor: '#F0FDF4',
                                      color: '#166534',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Approve
                                  </button>
                                )}
                                {v.status !== 'Inactive' && (
                                  <button
                                    onClick={() => handleUpdateVolunteerStatus(v.id, 'Inactive')}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #FECACA',
                                      backgroundColor: '#FEF2F2',
                                      color: '#991B1B',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Inactive
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              VIEW 5: CONTACT INQUIRIES
             ═══════════════════════════════════════════════ */}
          {activeNav === 'contacts' && (
            <div>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #EAE3D2',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FAF8F5',
                  border: '1.5px solid #EAE3D2',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  minWidth: '280px',
                }}>
                  <Search size={16} color="#829AB1" />
                  <input
                    type="text"
                    placeholder="Search sender name, email, query..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.84rem',
                      width: '100%',
                    }}
                  />
                </div>

                <button
                  onClick={() => exportToCSV('mbmct_inquiries', filteredContacts, ['id', 'name', 'email', 'phone', 'subject', 'message', 'status', 'created_at'])}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #EAE3D2',
                    backgroundColor: '#FFFFFF',
                    color: '#064B35',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Inquiries Table */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #EAE3D2',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(6, 75, 53, 0.04)',
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1.5px solid #EAE3D2', color: '#486581' }}>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>ID</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Sender</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Subject</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Message</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Status</th>
                        <th style={{ padding: '14px 18px', fontWeight: '700' }}>Status Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#829AB1' }}>
                            No inquiries recorded in MySQL database yet.
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((c) => (
                          <tr key={c.id} style={{ borderBottom: '1px solid #F0ECE1' }}>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#829AB1' }}>#{c.id}</td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ fontWeight: '700', color: '#102A43' }}>{c.name}</div>
                              <div style={{ fontSize: '0.74rem', color: '#627D98' }}>{c.email}</div>
                              {c.phone && <div style={{ fontSize: '0.72rem', color: '#829AB1' }}>{c.phone}</div>}
                            </td>
                            <td style={{ padding: '14px 18px', fontWeight: '600', color: '#064B35' }}>
                              {c.subject || 'General'}
                            </td>
                            <td style={{ padding: '14px 18px', color: '#486581', maxWidth: '320px', lineHeight: '1.4' }}>
                              {c.message}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <StatusBadge status={c.status} />
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {c.status !== 'In Review' && (
                                  <button
                                    onClick={() => handleUpdateContactStatus(c.id, 'In Review')}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #BFDBFE',
                                      backgroundColor: '#EFF6FF',
                                      color: '#1D4ED8',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Review
                                  </button>
                                )}
                                {c.status !== 'Resolved' && (
                                  <button
                                    onClick={() => handleUpdateContactStatus(c.id, 'Resolved')}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #86EFAC',
                                      backgroundColor: '#F0FDF4',
                                      color: '#166534',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Resolve
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── ENROLL BENEFICIARY MODAL ── */}
      {showAddBeneficiaryModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(6, 75, 53, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '520px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(6, 75, 53, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#064B35',
                }}>
                  <UserPlus size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#064B35' }}>
                    Enroll New Beneficiary
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: '#627D98' }}>Direct insert into MySQL beneficiaries</div>
                </div>
              </div>
              <button
                onClick={() => setShowAddBeneficiaryModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#829AB1' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddBeneficiary}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102A43', display: 'block', marginBottom: '6px' }}>
                  Full Name of Beneficiary / Child / Patient *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Murugan"
                  value={beneficiaryForm.full_name}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, full_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #EAE3D2',
                    fontSize: '0.9rem',
                    backgroundColor: '#FAF8F5',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102A43', display: 'block', marginBottom: '6px' }}>
                    Program Area *
                  </label>
                  <select
                    value={beneficiaryForm.program_area}
                    onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, program_area: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #EAE3D2',
                      fontSize: '0.9rem',
                      backgroundColor: '#FAF8F5',
                    }}
                  >
                    <option value="Education">Education Support</option>
                    <option value="Cancer Care">Cancer Care</option>
                    <option value="Leprosy Support">Leprosy Support</option>
                    <option value="Elderly Care">Elderly Care</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102A43', display: 'block', marginBottom: '6px' }}>
                    Assistance Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={beneficiaryForm.assistance_amount}
                    onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, assistance_amount: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #EAE3D2',
                      fontSize: '0.9rem',
                      backgroundColor: '#FAF8F5',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102A43', display: 'block', marginBottom: '6px' }}>
                  Location / Village / District
                </label>
                <input
                  type="text"
                  placeholder="e.g. Salem, Tamil Nadu"
                  value={beneficiaryForm.location}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #EAE3D2',
                    fontSize: '0.9rem',
                    backgroundColor: '#FAF8F5',
                  }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102A43', display: 'block', marginBottom: '6px' }}>
                  Case Notes / Medical or School Details
                </label>
                <textarea
                  rows="3"
                  placeholder="Details of school fees, ulcer wound dressing kit, cancer medicine requirements..."
                  value={beneficiaryForm.notes}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #EAE3D2',
                    fontSize: '0.9rem',
                    backgroundColor: '#FAF8F5',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddBeneficiaryModal(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: '1px solid #EAE3D2',
                    backgroundColor: '#FFFFFF',
                    color: '#486581',
                    fontSize: '0.86rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={beneficiarySubmitting}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#064B35',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(6, 75, 53, 0.2)',
                  }}
                >
                  {beneficiarySubmitting ? 'Saving to Database...' : 'Save Beneficiary'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── RESPONSIVE MEDIA QUERIES EMBEDDED ── */}
      <style>{`
        @media (max-width: 900px) {
          .sidebar-desktop {
            transform: translateX(-100%) !important;
          }
          .sidebar-open {
            transform: translateX(0) !important;
          }
          .main-desktop {
            margin-left: 0 !important;
          }
          .mobile-burger-btn {
            display: inline-flex !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-close-btn {
            display: none !important;
          }
          .mobile-burger-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
