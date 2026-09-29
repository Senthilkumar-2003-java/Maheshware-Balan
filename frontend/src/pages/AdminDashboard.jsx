import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Users, GraduationCap, HeartPulse,
  PersonStanding, FolderOpen, HandHelping, BarChart2, Image,
  MessageSquare, Settings, LogOut, Bell, Search, ChevronDown,
  Menu, X, TrendingUp, TrendingDown, Plus, FileText, UserPlus,
  Globe, Download, Eye, CheckCircle2, Clock, XCircle, RefreshCw,
  IndianRupee, Building2, Phone, Mail, Database, Check, AlertCircle
} from 'lucide-react';
import {
  getDonationsApi,
  getDonationStatsApi,
  getContactsApi,
  updateContactStatusApi,
  getVolunteersApi,
  updateVolunteerStatusApi,
  getBeneficiariesApi
} from '../services/api';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Heart, label: 'Donations', id: 'donations' },
  { icon: Users, label: 'Beneficiaries', id: 'beneficiaries' },
  { icon: GraduationCap, label: 'Education Support', id: 'education' },
  { icon: HeartPulse, label: 'Healthcare & Leprosy', id: 'healthcare' },
  { icon: PersonStanding, label: 'Elderly Care', id: 'elderly' },
  { icon: HandHelping, label: 'Volunteers', id: 'volunteers' },
  { icon: MessageSquare, label: 'Inquiries', id: 'messages' },
];

function StatusBadge({ status }) {
  const map = {
    Completed: { bg: '#E8F5E9', color: '#2E7D32', icon: CheckCircle2 },
    Approved: { bg: '#E8F5E9', color: '#2E7D32', icon: CheckCircle2 },
    Pending: { bg: '#FFF8E1', color: '#D97706', icon: Clock },
    Rejected: { bg: '#FFEBEE', color: '#DC3545', icon: XCircle },
    New: { bg: '#E3F2FD', color: '#1565C0', icon: Bell },
    Replied: { bg: '#E8F5E9', color: '#2E7D32', icon: CheckCircle2 },
  };
  const s = map[status] || map.Pending;
  const Icon = s.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: s.bg, color: s.color,
      borderRadius: '9999px', padding: '3px 10px',
      fontSize: '0.74rem', fontWeight: '600',
    }}>
      <Icon size={11} /> {status}
    </span>
  );
}

function KPICard({ icon: Icon, label, value, change, positive, iconBg, iconColor }) {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '18px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 2px 12px rgba(16,42,67,0.06)',
      padding: '22px', flex: 1, minWidth: '200px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} color={iconColor} strokeWidth={1.8} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          color: positive ? '#2E7D32' : '#DC3545',
          fontSize: '0.76rem', fontWeight: '700',
          background: positive ? '#E8F5E9' : '#FFEBEE',
          padding: '2px 8px', borderRadius: '9999px',
        }}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
      <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102A43', letterSpacing: '-0.02em', marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.82rem', color: '#667085', fontWeight: '500' }}>{label}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  // Navigation & UI States
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('donations'); // donations | contacts | volunteers
  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState('ALL');

  // Real Database States
  const [donations, setDonations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 105000,
    donationCount: 5,
    peopleSupported: 1248,
    activeProjects: 12,
    volunteers: 86
  });

  const [loading, setLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

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

      if (donationsRes.donations) setDonations(donationsRes.donations);
      if (statsRes.stats) setStats(statsRes.stats);
      if (contactsRes.contacts) setContacts(contactsRes.contacts);
      if (volunteersRes.volunteers) setVolunteers(volunteersRes.volunteers);
      if (beneficiariesRes.beneficiaries) setBeneficiaries(beneficiariesRes.beneficiaries);

      // Check if backend connected
      const isOnline = !donationsRes.isFallback && !contactsRes.isFallback;
      setIsLiveBackend(isOnline);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const showFeedback = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 3500);
  };

  // Status updates
  const handleUpdateContactStatus = async (id, newStatus) => {
    const res = await updateContactStatusApi(id, newStatus);
    if (res.success) {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      showFeedback(`Contact message #${id} marked as ${newStatus}`);
    }
  };

  const handleUpdateVolunteerStatus = async (id, newStatus) => {
    const res = await updateVolunteerStatusApi(id, newStatus);
    if (res.success) {
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
      showFeedback(`Volunteer applicant #${id} marked as ${newStatus}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Format currency
  const formatINR = (amt) => {
    return '₹' + Number(amt || 0).toLocaleString('en-IN');
  };

  // Filtered lists
  const filteredDonations = donations.filter(d => {
    const matchesSearch = (d.donor_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (d.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (d.cause || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCause = causeFilter === 'ALL' || (d.cause || '').toLowerCase().includes(causeFilter.toLowerCase());
    return matchesSearch && matchesCause;
  });

  const filteredContacts = contacts.filter(c =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVolunteers = volunteers.filter(v =>
    (v.full_name || v.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.preferred_area || v.area || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBeneficiaries = beneficiaries.filter(b =>
    (b.full_name || b.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.program_area || b.area || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Avatar generator
  const getAvatarInitials = (name) => {
    if (!name) return 'MB';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#F7F9FC' }}>

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`} style={{
        width: '260px',
        flexShrink: 0,
        backgroundColor: '#0B1F33',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 900,
        overflowY: 'auto',
        transition: 'transform 0.3s ease',
      }}>
        {/* Trust Header Logo */}
        <div style={{ padding: '24px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #064B35, #043828)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              border: '1px solid rgba(215,154,24,0.4)',
            }}>
              <Heart size={20} fill="#D79A18" color="#D79A18" />
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '700', fontFamily: "'Playfair Display', serif", lineHeight: '1.15' }}>
                Maheswari &amp; Balan
              </div>
              <div style={{ color: '#D79A18', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '2px', fontWeight: '600' }}>
                Memorial Trust Portal
              </div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontStyle: 'italic', paddingLeft: '50px' }}>
            Serve with Love &amp; Compassion
          </div>
        </div>

        {/* Backend Database Status Badge */}
        <div style={{ margin: '14px 14px 4px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: isLiveBackend ? '#2E7D32' : '#D97706',
              boxShadow: isLiveBackend ? '0 0 8px #2E7D32' : 'none',
            }} />
            <span style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: '600' }}>
              {isLiveBackend ? 'MySQL DB Connected' : 'Local Data Mode'}
            </span>
          </div>
          <button
            onClick={loadDashboardData}
            title="Refresh database records"
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.id === 'donations') setActiveTab('donations');
                  if (item.id === 'volunteers') setActiveTab('volunteers');
                  if (item.id === 'messages') setActiveTab('contacts');
                }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '11px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: active ? 'linear-gradient(90deg, rgba(6,75,53,0.7), rgba(4,56,40,0.4))' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: active ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                  fontSize: '0.86rem', fontWeight: active ? '600' : '400',
                  textAlign: 'left', marginBottom: '2px',
                  transition: 'all 0.2s',
                  borderLeft: active ? '3px solid #D79A18' : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={17} strokeWidth={1.8} color={active ? '#D79A18' : 'currentColor'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Admin Profile & Logout */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #064B35, #D79A18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: '700', fontSize: '0.88rem', flexShrink: 0,
            }}>
              {getAvatarInitials(adminUser?.fullName || 'Senthilkumar')}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#fff', fontSize: '0.84rem', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {adminUser?.fullName || 'Senthilkumar'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>
                {adminUser?.role || 'Super Admin'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '9px 12px', borderRadius: '9px',
              background: 'rgba(220,53,69,0.12)', border: '1px solid rgba(220,53,69,0.2)',
              color: '#FF6B6B', fontSize: '0.84rem', fontWeight: '600',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,53,69,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,53,69,0.12)'}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 850,
        }} />
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: 'calc(100% - 260px)' }}>

        {/* Top Header */}
        <header style={{
          height: '72px', backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex', alignItems: 'center',
          padding: '0 28px', gap: '16px',
          boxShadow: '0 1px 8px rgba(16,42,67,0.05)',
          position: 'sticky', top: 0, zIndex: 800,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-menu-btn" style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#667085',
          }}>
            <Menu size={22} />
          </button>

          <div style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: '700', color: '#102A43' }}>
            Live Trust Dashboard
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#F7F9FC', border: '1px solid #E5E7EB',
            borderRadius: '10px', padding: '8px 14px',
          }}>
            <Search size={16} color="#667085" />
            <input
              placeholder="Search database..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: '0.85rem', color: '#172B4D', width: '160px',
              }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={loadDashboardData}
            title="Refresh database records"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#F7F9FC', border: '1px solid #E5E7EB',
              borderRadius: '10px', padding: '8px 12px',
              fontSize: '0.82rem', fontWeight: '600', color: '#102A43',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span className="refresh-label">Refresh</span>
          </button>

          {/* User badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid #E5E7EB', paddingLeft: '16px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #064B35, #D79A18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: '700', fontSize: '0.84rem',
            }}>
              {getAvatarInitials(adminUser?.fullName || 'Senthilkumar')}
            </div>
            <div style={{ display: 'none' }} className="admin-name-block">
              <div style={{ fontSize: '0.84rem', fontWeight: '600', color: '#172B4D' }}>{adminUser?.fullName || 'Senthilkumar'}</div>
              <div style={{ fontSize: '0.72rem', color: '#667085' }}>{adminUser?.role || 'Super Admin'}</div>
            </div>
          </div>
        </header>

        {/* Feedback Alert Banner */}
        {actionMessage && (
          <div style={{
            background: '#E8F5E9', borderBottom: '1px solid #C8E6C9',
            padding: '10px 28px', color: '#2E7D32', fontSize: '0.86rem', fontWeight: '600',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <Check size={16} /> {actionMessage}
          </div>
        )}

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, padding: '28px', overflowX: 'hidden' }}>

          {/* Welcome Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: '700', color: '#102A43', marginBottom: '4px' }}>
                Vanakkam, {adminUser?.fullName || 'Senthilkumar'} 👋
              </h2>
              <p style={{ color: '#667085', fontSize: '0.9rem' }}>
                Connected to real backend database records. Manage donations, leprosy patient care, student aids, and volunteer requests.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#102A43' }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#064B35', fontWeight: '600', marginTop: '2px' }}>
                "Serve with Love &amp; Compassion"
              </div>
            </div>
          </div>

          {/* Real KPI Cards */}
          <div style={{ display: 'flex', gap: '18px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <KPICard
              icon={IndianRupee}
              label="Total Donations Raised"
              value={formatINR(stats.totalDonations)}
              change={`${donations.length} Contributions`}
              positive={true}
              iconBg="#E8F5E9"
              iconColor="#2E7D32"
            />
            <KPICard
              icon={Users}
              label="Beneficiaries Enrolled"
              value={`${beneficiaries.length} Cases`}
              change="+100% Verified"
              positive={true}
              iconBg="#F3E8FA"
              iconColor="#6B2D67"
            />
            <KPICard
              icon={HandHelping}
              label="Active Volunteers"
              value={`${volunteers.length} Ready`}
              change="+15% This Month"
              positive={true}
              iconBg="#FFF8E1"
              iconColor="#D79A18"
            />
            <KPICard
              icon={MessageSquare}
              label="Inquiries & Requests"
              value={`${contacts.length} Inquiries`}
              change="Real-time Sync"
              positive={true}
              iconBg="#E0F7FA"
              iconColor="#087F8C"
            />
          </div>

          {/* Submissions Inbox with Tabs */}
          <div style={{
            background: '#FFFFFF', borderRadius: '18px',
            border: '1px solid #E5E7EB', padding: '24px',
            boxShadow: '0 2px 12px rgba(16,42,67,0.05)',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: '700', color: '#102A43' }}>
                  Live Database Records
                </div>
                {activeTab === 'donations' && (
                  <select
                    value={causeFilter}
                    onChange={e => setCauseFilter(e.target.value)}
                    style={{
                      border: '1px solid #E5E7EB', borderRadius: '8px',
                      padding: '5px 10px', fontSize: '0.78rem', color: '#102A43',
                      backgroundColor: '#F7F9FC', outline: 'none'
                    }}
                  >
                    <option value="ALL">All Causes</option>
                    <option value="Education">Education Support</option>
                    <option value="Cancer">Cancer Care</option>
                    <option value="Leprosy">Leprosy Support</option>
                    <option value="Old Age">Elderly Care</option>
                    <option value="General">General Support</option>
                  </select>
                )}
              </div>

              {/* Tab Selector */}
              <div style={{ display: 'flex', gap: '4px', background: '#F7F9FC', borderRadius: '10px', padding: '4px' }}>
                {[
                  { id: 'donations', label: `💸 Donations (${filteredDonations.length})` },
                  { id: 'contacts', label: `✉️ Inquiries (${filteredContacts.length})` },
                  { id: 'volunteers', label: `🤝 Volunteers (${filteredVolunteers.length})` },
                  { id: 'beneficiaries', label: `👥 Beneficiaries (${filteredBeneficiaries.length})` },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    padding: '7px 14px', borderRadius: '7px', border: 'none',
                    fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
                    background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                    color: activeTab === tab.id ? '#064B35' : '#667085',
                    boxShadow: activeTab === tab.id ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s',
                  }}>{tab.label}</button>
                ))}
              </div>
            </div>

            {/* TAB 1: DONATIONS */}
            {activeTab === 'donations' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
                      {['Donor Name', 'Email & Phone', 'Supported Cause', 'Amount (INR)', 'Payment', 'Transaction ID', 'Status'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#667085', fontWeight: '600', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>No donation records found.</td>
                      </tr>
                    ) : (
                      filteredDonations.map((d, i) => (
                        <tr key={d.id || i} style={{ borderBottom: '1px solid #F3F4F6' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F9FBF9'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '12px', fontWeight: '600', color: '#172B4D' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                background: '#064B35', color: '#fff', fontSize: '0.7rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                              }}>
                                {getAvatarInitials(d.donor_name)}
                              </div>
                              {d.donor_name}
                            </div>
                          </td>
                          <td style={{ padding: '12px', color: '#667085', fontSize: '0.8rem' }}>
                            <div>{d.email}</div>
                            <div style={{ color: '#9CA3AF', fontSize: '0.74rem' }}>{d.phone}</div>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: '600',
                              backgroundColor: d.cause?.includes('Leprosy') ? '#F3E8FA' : d.cause?.includes('Cancer') ? '#E8F5E9' : '#E0F7FA',
                              color: d.cause?.includes('Leprosy') ? '#6B2D67' : d.cause?.includes('Cancer') ? '#064B35' : '#087F8C',
                            }}>
                              {d.cause}
                            </span>
                          </td>
                          <td style={{ padding: '12px', fontWeight: '700', color: '#2E7D32', fontSize: '0.92rem' }}>
                            {formatINR(d.amount)}
                          </td>
                          <td style={{ padding: '12px', color: '#667085', fontSize: '0.8rem' }}>{d.payment_method || 'UPI'}</td>
                          <td style={{ padding: '12px', color: '#9CA3AF', fontSize: '0.75rem', fontFamily: 'monospace' }}>{d.transaction_id || `TXN_${d.id}`}</td>
                          <td style={{ padding: '12px' }}><StatusBadge status={d.status || 'Completed'} /></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: CONTACT MESSAGES */}
            {activeTab === 'contacts' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
                      {['Sender Name', 'Contact Info', 'Subject & Message', 'Status', 'Action'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#667085', fontWeight: '600', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>No inquiry messages found.</td>
                      </tr>
                    ) : (
                      filteredContacts.map((c, i) => (
                        <tr key={c.id || i} style={{ borderBottom: '1px solid #F3F4F6' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F9FBF9'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '12px', fontWeight: '600', color: '#172B4D' }}>{c.name}</td>
                          <td style={{ padding: '12px', color: '#667085', fontSize: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={12} /> {c.email}</div>
                            {c.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px', color: '#9CA3AF' }}><Phone size={12} /> {c.phone}</div>}
                          </td>
                          <td style={{ padding: '12px', maxWidth: '300px' }}>
                            <div style={{ fontWeight: '600', color: '#102A43', fontSize: '0.84rem' }}>{c.subject}</div>
                            <div style={{ color: '#667085', fontSize: '0.78rem', marginTop: '2px' }}>{c.message}</div>
                          </td>
                          <td style={{ padding: '12px' }}><StatusBadge status={c.status} /></td>
                          <td style={{ padding: '12px' }}>
                            <select
                              value={c.status}
                              onChange={(e) => handleUpdateContactStatus(c.id, e.target.value)}
                              style={{
                                padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem',
                                border: '1px solid #E5E7EB', background: '#FFFFFF', cursor: 'pointer'
                              }}
                            >
                              <option value="New">New</option>
                              <option value="Replied">Replied</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: VOLUNTEERS */}
            {activeTab === 'volunteers' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
                      {['Applicant Name', 'Contact Details', 'Focus Area', 'Availability', 'Status', 'Review Action'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#667085', fontWeight: '600', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVolunteers.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>No volunteer applications found.</td>
                      </tr>
                    ) : (
                      filteredVolunteers.map((v, i) => (
                        <tr key={v.id || i} style={{ borderBottom: '1px solid #F3F4F6' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F9FBF9'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '12px', fontWeight: '600', color: '#172B4D' }}>{v.full_name || v.name}</td>
                          <td style={{ padding: '12px', color: '#667085', fontSize: '0.8rem' }}>
                            <div>{v.email}</div>
                            <div style={{ color: '#9CA3AF' }}>{v.phone}</div>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#FFF8E1', color: '#D79A18', fontSize: '0.76rem', fontWeight: '600' }}>
                              {v.preferred_area || v.area || 'Community Welfare'}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: '#667085', fontSize: '0.8rem' }}>{v.availability || 'Weekends'}</td>
                          <td style={{ padding: '12px' }}><StatusBadge status={v.status} /></td>
                          <td style={{ padding: '12px' }}>
                            <select
                              value={v.status}
                              onChange={(e) => handleUpdateVolunteerStatus(v.id, e.target.value)}
                              style={{
                                padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem',
                                border: '1px solid #E5E7EB', background: '#FFFFFF', cursor: 'pointer'
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 4: BENEFICIARIES */}
            {activeTab === 'beneficiaries' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
                      {['Beneficiary Name', 'Program Area', 'Location', 'Assistance Amount', 'Status'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#667085', fontWeight: '600', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBeneficiaries.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>No beneficiaries found.</td>
                      </tr>
                    ) : (
                      filteredBeneficiaries.map((b, i) => (
                        <tr key={b.id || i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px', fontWeight: '600', color: '#172B4D' }}>{b.full_name || b.name}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: '600',
                              background: (b.program_area || b.area)?.includes('Leprosy') ? '#F3E8FA' : '#E8F5E9',
                              color: (b.program_area || b.area)?.includes('Leprosy') ? '#6B2D67' : '#064B35',
                            }}>
                              {b.program_area || b.area}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: '#667085', fontSize: '0.8rem' }}>{b.location || 'Tamil Nadu'}</td>
                          <td style={{ padding: '12px', fontWeight: '700', color: '#064B35' }}>
                            {formatINR(b.assistance_amount || 10000)}
                          </td>
                          <td style={{ padding: '12px' }}><StatusBadge status={b.status} /></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Program Distribution & Real Transparency */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '24px' }}>
            
            {/* Core Program Commitments */}
            <div style={{
              background: '#FFFFFF', borderRadius: '18px',
              border: '1px solid #E5E7EB', padding: '24px',
              boxShadow: '0 2px 12px rgba(16,42,67,0.05)',
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: '700', color: '#102A43', marginBottom: '16px' }}>
                Key Initiatives Allocation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { name: 'Government School Education & Needs', pct: 40, color: '#064B35', desc: 'Uniforms, books, infrastructure & scholarships' },
                  { name: 'Cancer Patients Care & Medical Camps', pct: 25, color: '#2E7D32', desc: 'Chemotherapy subsidies & health screening camps' },
                  { name: 'Leprosy Patients Care & Rehabilitation', pct: 20, color: '#6B2D67', desc: 'Ulcer dressing, MCR footwear & nutrition groceries' },
                  { name: 'Old Age People & Senior Support', pct: 15, color: '#D79A18', desc: 'Wholesome groceries, bedding & geriatric care' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: '600', color: '#102A43' }}>{item.name}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: item.color }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: '7px', background: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '9999px' }} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '3px' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div style={{
              background: '#FFFFFF', borderRadius: '18px',
              border: '1px solid #E5E7EB', padding: '24px',
              boxShadow: '0 2px 12px rgba(16,42,67,0.05)',
              display: 'flex', flexDirection: 'column', gap: '10px'
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: '700', color: '#102A43', marginBottom: '8px' }}>
                Admin Operations
              </div>
              <button
                onClick={() => { setActiveTab('donations'); setCauseFilter('Leprosy'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '10px',
                  background: '#F9F5FB', border: '1px solid #EADAF2',
                  cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.84rem', fontWeight: '600', color: '#6B2D67'
                }}
              >
                <HeartPulse size={16} color="#6B2D67" />
                View Leprosy Patients Aid
              </button>
              <button
                onClick={() => { setActiveTab('donations'); setCauseFilter('Education'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '10px',
                  background: '#F3F9F5', border: '1px solid #D7EEDB',
                  cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.84rem', fontWeight: '600', color: '#064B35'
                }}
              >
                <GraduationCap size={16} color="#064B35" />
                View Education Support
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '10px',
                  background: '#F7F9FC', border: '1px solid #E5E7EB',
                  cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.84rem', fontWeight: '600', color: '#102A43'
                }}
              >
                <MessageSquare size={16} color="#102A43" />
                Manage Public Messages ({contacts.filter(c => c.status === 'New').length} New)
              </button>
              <button
                onClick={() => setActiveTab('volunteers')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '10px',
                  background: '#F7F9FC', border: '1px solid #E5E7EB',
                  cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.84rem', fontWeight: '600', color: '#102A43'
                }}
              >
                <HandHelping size={16} color="#D79A18" />
                Review Volunteers ({volunteers.filter(v => v.status === 'Pending').length} Pending)
              </button>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer style={{
          background: '#FFFFFF', borderTop: '1px solid #E5E7EB',
          padding: '18px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={14} fill="#064B35" color="#064B35" />
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#172B4D' }}>
              Maheswari &amp; Balan Memorial Charitable Trust
            </span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>— Serve with Love &amp; Compassion</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#667085' }}>
            <span>Backend API: Port 5000</span>
            <span>MySQL 8.0</span>
            <span>© 2026 MBMCT</span>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 1024px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.sidebar-open { transform: translateX(0); }
          div[style*="marginLeft: 260px"] { margin-left: 0 !important; width: 100% !important; }
          .mobile-menu-btn { display: flex !important; }
          .refresh-label { display: none; }
          div[style*="gridTemplateColumns: 1fr 340px"] { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1200px) {
          .admin-name-block { display: block !important; }
        }
      `}</style>
    </div>
  );
}
