import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Users, MessageSquare, LogOut, Search,
  Download, RefreshCw, IndianRupee, Phone, Mail, MapPin, Calendar,
  CheckCircle2, Clock, XCircle, AlertCircle, Menu, X, ArrowUpRight,
  Filter, ShieldCheck, UserCheck
} from 'lucide-react';
import {
  getDonationsApi,
  getDonationStatsApi,
  getContactsApi,
  updateContactStatusApi,
  getVolunteersApi,
  updateVolunteerStatusApi
} from '../services/api';

function StatusBadge({ status }) {
  const map = {
    Completed: { bg: '#E8F5E9', color: '#166534', border: '#BBF7D0', icon: CheckCircle2 },
    Approved: { bg: '#E8F5E9', color: '#166534', border: '#BBF7D0', icon: CheckCircle2 },
    Resolved: { bg: '#E8F5E9', color: '#166534', border: '#BBF7D0', icon: CheckCircle2 },
    Pending: { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A', icon: Clock },
    'In Review': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: Clock },
    Contacted: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: UserCheck },
    New: { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A', icon: Clock },
    Failed: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: XCircle },
    Rejected: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: XCircle },
  };
  const s = map[status] || map.Pending;
  const Icon = s.icon;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      borderRadius: '9999px',
      padding: '3px 9px',
      fontSize: '0.72rem',
      fontWeight: '700',
    }}>
      <Icon size={11} /> {status}
    </span>
  );
}

export default function AdminDashboard() {
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview | donations | volunteers | contacts
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Real Database Records (No dummy data)
  const [donations, setDonations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [dbStats, setDbStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [feedback, setFeedback] = useState('');

  const showToast = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [donationsRes, statsRes, contactsRes, volunteersRes] = await Promise.all([
        getDonationsApi(),
        getDonationStatsApi(),
        getContactsApi(),
        getVolunteersApi(),
      ]);

      setDonations(donationsRes.donations || []);
      setContacts(contactsRes.contacts || []);
      setVolunteers(volunteersRes.volunteers || []);
      if (statsRes && statsRes.stats) setDbStats(statsRes.stats);

      const isOnline = donationsRes.success !== false && contactsRes.success !== false;
      setIsLiveBackend(isOnline);
    } catch (err) {
      console.error('Admin fetch error:', err);
      setIsLiveBackend(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Status updaters
  const handleUpdateContactStatus = async (id, status) => {
    const res = await updateContactStatusApi(id, status);
    if (res.success) {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      showToast(`Inquiry #${id} marked as ${status}`);
    } else {
      showToast('Status update failed');
    }
  };

  const handleUpdateVolunteerStatus = async (id, status) => {
    const res = await updateVolunteerStatusApi(id, status);
    if (res.success) {
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
      showToast(`Volunteer #${id} marked as ${status}`);
    } else {
      showToast('Status update failed');
    }
  };

  // Export to CSV
  const exportToCSV = (data, filename) => {
    if (!data.length) {
      showToast('No records available to export');
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename}.csv successfully`);
  };

  // KPI calculations from real records
  const totalRaised = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
  const totalDonors = new Set(donations.map(d => d.email || d.phone)).size;
  const totalVolunteers = volunteers.length;
  const totalContacts = contacts.length;

  // Filtered datasets
  const filteredDonations = donations.filter(d => {
    const matchSearch = (d.donor_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.phone || '').includes(searchTerm) ||
      (d.transaction_id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredVolunteers = volunteers.filter(v => {
    const matchSearch = (v.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.phone || '').includes(searchTerm) ||
      (v.preferred_area || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredContacts = contacts.filter(c => {
    const matchSearch = (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#1E293B', fontFamily: 'inherit' }}>
      {/* ── SIDEBAR DESKTOP & MOBILE DRAWER ── */}
      <aside style={{
        width: '260px',
        backgroundColor: '#102B50',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 1200,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(0)',
      }} className="admin-sidebar">
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.12em', color: '#F5D061', textTransform: 'uppercase', marginBottom: '4px' }}>
            MBMCT PORTAL
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            Trust Administration
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
            Logged in: <strong style={{ color: '#F8FAFC' }}>{adminUser?.full_name || 'Admin'}</strong>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, count: null },
            { id: 'donations', label: 'Donations', icon: Heart, count: donations.length },
            { id: 'volunteers', label: 'Volunteers', icon: Users, count: volunteers.length },
            { id: 'contacts', label: 'Contact Inquiries', icon: MessageSquare, count: contacts.length },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  backgroundColor: active ? 'rgba(215, 154, 24, 0.18)' : 'transparent',
                  color: active ? '#F5D061' : '#CBD5E1',
                  fontWeight: active ? '700' : '500',
                  fontSize: '0.88rem',
                  border: active ? '1px solid rgba(245, 208, 97, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={18} color={active ? '#F5D061' : '#94A3B8'} />
                <span style={{ flex: 1 }}>{tab.label}</span>
                {tab.count !== null && (
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    backgroundColor: active ? '#D79A18' : 'rgba(255,255,255,0.12)',
                    color: '#FFFFFF',
                    fontWeight: '700',
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: '#CBD5E1',
              fontSize: '0.82rem',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            <span>Visit Public Website</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(225, 29, 72, 0.15)',
              color: '#FDA4AF',
              border: '1px solid rgba(225, 29, 72, 0.25)',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ flex: 1, marginLeft: '260px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Top Header Bar */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-mobile-toggle"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#F1F5F9',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
              }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#102B50', margin: 0, textTransform: 'capitalize' }}>
                {activeTab === 'overview' ? 'Operational Overview' : activeTab}
              </h1>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                Real-time submissions from public donor, volunteer &amp; contact forms
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={loadData}
              title="Refresh Data from MySQL"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="refresh-label">Refresh</span>
            </button>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '9999px',
              backgroundColor: isLiveBackend ? '#ECFDF5' : '#FFFBEB',
              border: `1px solid ${isLiveBackend ? '#A7F3D0' : '#FDE68A'}`,
              fontSize: '0.74rem',
              fontWeight: '700',
              color: isLiveBackend ? '#065F46' : '#92400E',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: isLiveBackend ? '#10B981' : '#F59E0B' }} />
              <span>{isLiveBackend ? 'MySQL Connected' : 'Local Standby'}</span>
            </div>
          </div>
        </header>

        {/* Notification Toast */}
        {feedback && (
          <div style={{
            margin: '12px 24px 0 24px',
            padding: '10px 16px',
            backgroundColor: '#102B50',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontSize: '0.84rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(16,43,80,0.18)',
          }}>
            <CheckCircle2 size={16} color="#F5D061" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Dashboard Content Body */}
        <main style={{ padding: '24px', flex: 1 }}>
          {/* ── KPI METRICS CARDS ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}>
            {/* Card 1: Total Donations */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Total Funds Raised</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D79A18' }}>
                  <IndianRupee size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                ₹{totalRaised.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                {donations.length} recorded payments
              </div>
            </div>

            {/* Card 2: Total Donors */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Active Donors</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
                  <Heart size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                {totalDonors}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                Individual &amp; corporate supporters
              </div>
            </div>

            {/* Card 3: Volunteers */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Registered Volunteers</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                  <Users size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                {totalVolunteers}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                Ground service candidates
              </div>
            </div>

            {/* Card 4: Contact Messages */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Contact Inquiries</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7E22CE' }}>
                  <MessageSquare size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                {totalContacts}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                Community &amp; support queries
              </div>
            </div>
          </div>

          {/* ── FILTER & SEARCH TOOLBAR ── */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 14px',
              minWidth: '260px',
              flex: '1 1 260px',
            }}>
              <Search size={16} color="#64748B" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', fontSize: '0.86rem', outline: 'none' }}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} style={{ color: '#94A3B8', fontSize: '0.8rem' }}>✕</button>
              )}
            </div>

            {/* Export Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => {
                  if (activeTab === 'donations') exportToCSV(donations, 'donations');
                  else if (activeTab === 'volunteers') exportToCSV(volunteers, 'volunteers');
                  else exportToCSV(contacts, 'contacts');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#102B50',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <Download size={14} color="#F5D061" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* ── TAB CONTENT ── */}
          {/* 1. DONATIONS TABLE */}
          {(activeTab === 'overview' || activeTab === 'donations') && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              marginBottom: '28px',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#102B50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={18} color="#D79A18" />
                  <span>Donation Contributions ({filteredDonations.length})</span>
                </div>
                {activeTab === 'overview' && (
                  <button onClick={() => setActiveTab('donations')} style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102B50' }}>
                    View Full Table →
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Donor Name</th>
                      <th style={{ padding: '12px 16px' }}>Contact</th>
                      <th style={{ padding: '12px 16px' }}>Cause</th>
                      <th style={{ padding: '12px 16px' }}>Amount</th>
                      <th style={{ padding: '12px 16px' }}>TXN ID</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#94A3B8' }}>
                          No donations recorded in database yet. New donations via "Donate Now" will instantly appear here.
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.slice(0, activeTab === 'overview' ? 6 : undefined).map((d, i) => (
                        <tr key={d.id || i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1E293B' }}>
                            {d.donor_name}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#64748B' }}>
                            <div>{d.email}</div>
                            <div style={{ fontSize: '0.78rem' }}>{d.phone}</div>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#334155' }}>
                            {d.cause || 'General Support'}
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: '800', color: '#102B50' }}>
                            ₹{parseFloat(d.amount).toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#64748B' }}>
                            {d.transaction_id || '—'}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <StatusBadge status={d.status || 'Completed'} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. VOLUNTEERS TABLE */}
          {(activeTab === 'overview' || activeTab === 'volunteers') && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              marginBottom: '28px',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#102B50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="#1D4ED8" />
                  <span>Volunteer Registrations ({filteredVolunteers.length})</span>
                </div>
                {activeTab === 'overview' && (
                  <button onClick={() => setActiveTab('volunteers')} style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102B50' }}>
                    View Full Table →
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Volunteer Name</th>
                      <th style={{ padding: '12px 16px' }}>Phone / WhatsApp</th>
                      <th style={{ padding: '12px 16px' }}>Preferred Area</th>
                      <th style={{ padding: '12px 16px' }}>Availability</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVolunteers.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#94A3B8' }}>
                          No volunteer registrations recorded yet. Submissions from the Volunteer Page will appear here.
                        </td>
                      </tr>
                    ) : (
                      filteredVolunteers.slice(0, activeTab === 'overview' ? 6 : undefined).map((v, i) => (
                        <tr key={v.id || i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1E293B' }}>
                            <div>{v.full_name}</div>
                            <div style={{ fontSize: '0.76rem', color: '#64748B' }}>{v.email}</div>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#334155' }}>
                            {v.phone}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#1E293B' }}>
                            {v.preferred_area || 'Education'}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#64748B' }}>
                            {v.availability || 'Weekends'}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <StatusBadge status={v.status || 'Pending'} />
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <select
                              value={v.status || 'Pending'}
                              onChange={e => handleUpdateVolunteerStatus(v.id, e.target.value)}
                              style={{
                                padding: '4px 8px',
                                fontSize: '0.78rem',
                                borderRadius: '6px',
                                border: '1px solid #CBD5E1',
                                backgroundColor: '#FFFFFF',
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
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
            </div>
          )}

          {/* 3. CONTACT INQUIRIES TABLE */}
          {(activeTab === 'overview' || activeTab === 'contacts') && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              marginBottom: '28px',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#102B50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} color="#7E22CE" />
                  <span>Contact Inquiries ({filteredContacts.length})</span>
                </div>
                {activeTab === 'overview' && (
                  <button onClick={() => setActiveTab('contacts')} style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102B50' }}>
                    View Full Table →
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Sender</th>
                      <th style={{ padding: '12px 16px' }}>Subject</th>
                      <th style={{ padding: '12px 16px' }}>Message</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#94A3B8' }}>
                          No contact inquiries in database yet. Messages submitted on the Contact Page will appear here.
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.slice(0, activeTab === 'overview' ? 6 : undefined).map((c, i) => (
                        <tr key={c.id || i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1E293B' }}>
                            <div>{c.name}</div>
                            <div style={{ fontSize: '0.76rem', color: '#64748B' }}>{c.email}</div>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#1E293B', fontWeight: '600' }}>
                            {c.subject || 'General Inquiry'}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#475569', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c.message}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <StatusBadge status={c.status || 'New'} />
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <select
                              value={c.status || 'New'}
                              onChange={e => handleUpdateContactStatus(c.id, e.target.value)}
                              style={{
                                padding: '4px 8px',
                                fontSize: '0.78rem',
                                borderRadius: '6px',
                                border: '1px solid #CBD5E1',
                                backgroundColor: '#FFFFFF',
                              }}
                            >
                              <option value="New">New</option>
                              <option value="In Review">In Review</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%) !important;
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .admin-mobile-toggle {
            display: inline-flex !important;
          }
        }
        @media (max-width: 640px) {
          .refresh-label {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
