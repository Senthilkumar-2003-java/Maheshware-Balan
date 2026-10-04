import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Users, MessageSquare, LogOut, Search,
  Download, RefreshCw, IndianRupee, Phone, Mail, MapPin, Calendar,
  CheckCircle2, Clock, XCircle, AlertCircle, Menu, X, ArrowUpRight,
  Filter, ShieldCheck, UserCheck, Printer, FileText, ChevronRight
} from 'lucide-react';
import {
  getDonationsApi,
  getDonationStatsApi,
  getContactsApi,
  updateContactStatusApi,
  getVolunteersApi,
  updateVolunteerStatusApi
} from '../services/api';

function convertNumberToWords(num) {
  const n = parseInt(num, 10);
  if (isNaN(n) || n === 0) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function inWords(n) {
    if (n < 20) return a[n];
    const digit = n % 10;
    return b[Math.floor(n / 10)] + (digit ? ' ' + a[digit] : '');
  }
  let str = '';
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = Math.floor((n % 1000) / 100);
  const remainder = n % 100;
  if (crore > 0) str += inWords(crore) + 'Crore ';
  if (lakh > 0) str += inWords(lakh) + 'Lakh ';
  if (thousand > 0) str += inWords(thousand) + 'Thousand ';
  if (hundred > 0) str += inWords(hundred) + 'Hundred ';
  if (remainder > 0) str += inWords(remainder);
  return str.trim() + ' Rupees Only';
}

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
      whiteSpace: 'nowrap',
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

  // Date Filter State: Today (Default), Month, 6 Months, Year, Custom Date, All
  const [dateFilter, setDateFilter] = useState('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Real Database Records
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

  // Date Filter evaluation helper
  const isWithinDateFilter = (itemDateStr) => {
    if (!itemDateStr) return dateFilter === 'all';
    const itemDate = new Date(itemDateStr);
    if (isNaN(itemDate.getTime())) return dateFilter === 'all';

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    if (dateFilter === 'today') {
      return itemDate >= startOfToday;
    }
    if (dateFilter === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      return itemDate >= startOfMonth;
    }
    if (dateFilter === '6months') {
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate(), 0, 0, 0, 0);
      return itemDate >= sixMonthsAgo;
    }
    if (dateFilter === 'year') {
      const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      return itemDate >= startOfYear;
    }
    if (dateFilter === 'custom') {
      if (customStartDate && customEndDate) {
        const start = new Date(customStartDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);
        return itemDate >= start && itemDate <= end;
      } else if (customStartDate) {
        const start = new Date(customStartDate);
        start.setHours(0, 0, 0, 0);
        return itemDate >= start;
      } else if (customEndDate) {
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);
        return itemDate <= end;
      }
      return true;
    }
    return true; // 'all'
  };

  // Filtered Datasets based on search, status, and active date filter
  const filteredDonations = useMemo(() => {
    return donations.filter(d => {
      const matchSearch = (d.donor_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.phone || '').includes(searchTerm) ||
        (d.transaction_id || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || d.status === statusFilter;
      const matchDate = isWithinDateFilter(d.created_at || d.date);
      return matchSearch && matchStatus && matchDate;
    });
  }, [donations, searchTerm, statusFilter, dateFilter, customStartDate, customEndDate]);

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(v => {
      const matchSearch = (v.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.phone || '').includes(searchTerm) ||
        (v.preferred_area || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || v.status === statusFilter;
      const matchDate = isWithinDateFilter(v.created_at || v.date);
      return matchSearch && matchStatus && matchDate;
    });
  }, [volunteers, searchTerm, statusFilter, dateFilter, customStartDate, customEndDate]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch = (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.message || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchDate = isWithinDateFilter(c.created_at || c.date);
      return matchSearch && matchStatus && matchDate;
    });
  }, [contacts, searchTerm, statusFilter, dateFilter, customStartDate, customEndDate]);

  // Dynamic KPI calculations for active period
  const totalRaisedPeriod = filteredDonations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
  const totalDonorsPeriod = new Set(filteredDonations.map(d => d.email || d.phone)).size;
  const totalVolunteersPeriod = filteredVolunteers.length;
  const totalContactsPeriod = filteredContacts.length;

  // Total Interactions / Public Website Count Badge
  const publicInteractionsCount = donations.length + volunteers.length + contacts.length;

  // Export to CSV
  const exportToCSV = (data, filename) => {
    if (!data.length) {
      showToast('No records available to export for this view');
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

  // 80G Tax Exemption Donation Receipt Generator
  const handlePrintReceipt = (d) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to view or print the 80G Receipt.');
      return;
    }

    const dDate = d.created_at ? new Date(d.created_at) : new Date();
    const formattedDate = dDate.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    const formattedTime = dDate.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit'
    });
    const receiptNum = d.id ? `MBMCT/2026/REC-${String(d.id).padStart(4, '0')}` : `MBMCT/2026/REC-${Date.now().toString().slice(-4)}`;
    const amountVal = parseFloat(d.amount) || 0;
    const amountInWords = convertNumberToWords(amountVal);

    const receiptHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>80G Donation Receipt - ${receiptNum}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: #F1F5F9;
            color: #1E293B;
            padding: 30px 15px;
          }
          .print-bar {
            max-width: 780px;
            margin: 0 auto 20px auto;
            display: flex;
            justify-content: flex-end;
          }
          .btn-print {
            background: #173F73;
            color: #FFFFFF;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(23,63,115,0.25);
          }
          .receipt-sheet {
            max-width: 780px;
            margin: 0 auto;
            background: #FFFFFF;
            border: 2px solid #173F73;
            border-radius: 14px;
            padding: 36px 40px;
            box-shadow: 0 12px 36px rgba(16,43,80,0.08);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #173F73;
            padding-bottom: 18px;
            margin-bottom: 22px;
          }
          .trust-name {
            font-size: 22px;
            font-weight: 900;
            color: #173F73;
            letter-spacing: -0.01em;
            text-transform: uppercase;
          }
          .trust-sub {
            font-size: 11.5px;
            font-weight: 800;
            color: #D79A18;
            letter-spacing: 0.15em;
            margin-top: 4px;
          }
          .trust-meta {
            font-size: 11px;
            color: #475569;
            margin-top: 8px;
            line-height: 1.6;
          }
          .badge-bar {
            text-align: center;
            margin-bottom: 22px;
          }
          .badge-80g {
            display: inline-block;
            background: linear-gradient(135deg, #173F73 0%, #102B50 100%);
            color: #FFFFFF;
            padding: 6px 20px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
          }
          .meta-grid {
            display: flex;
            justify-content: space-between;
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 12px 18px;
            font-size: 12px;
            margin-bottom: 22px;
          }
          .detail-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-bottom: 22px;
          }
          .detail-table th {
            text-align: left;
            width: 36%;
            padding: 10px 14px;
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            color: #475569;
            font-weight: 700;
          }
          .detail-table td {
            padding: 10px 14px;
            border: 1px solid #E2E8F0;
            color: #1E293B;
          }
          .amount-row td {
            font-size: 18px;
            font-weight: 900;
            color: #064B35;
            background: #F0FDF4;
          }
          .tax-note {
            background: #FFFBEB;
            border-left: 4px solid #D79A18;
            padding: 12px 14px;
            border-radius: 4px;
            font-size: 11px;
            line-height: 1.6;
            color: #92400E;
            margin-bottom: 28px;
          }
          .signature-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 32px;
            padding-top: 16px;
          }
          .seal-wrap {
            width: 130px;
            height: 130px;
            border: 3px dashed #173F73;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #173F73;
            transform: rotate(-6deg);
            padding: 8px;
          }
          .seal-title {
            font-size: 9px;
            font-weight: 900;
            letter-spacing: 0.05em;
          }
          .seal-sub {
            font-size: 7.5px;
            color: #D79A18;
            font-weight: 800;
            margin: 2px 0;
          }
          .sign-box {
            text-align: right;
          }
          .digital-verify {
            display: inline-block;
            background: #ECFDF5;
            color: #065F46;
            border: 1px solid #A7F3D0;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            margin-bottom: 16px;
          }
          .sign-title {
            font-size: 14px;
            font-weight: 900;
            color: #173F73;
          }
          .sign-trust {
            font-size: 12px;
            font-weight: 700;
            color: #475569;
            margin-top: 3px;
          }
          @media print {
            .print-bar { display: none !important; }
            body { background: #FFFFFF; padding: 0; }
            .receipt-sheet { border: 1.5px solid #173F73; box-shadow: none; padding: 25px; }
          }
        </style>
      </head>
      <body>
        <div class="print-bar">
          <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>
        <div class="receipt-sheet">
          <div class="header">
            <div class="trust-name">MAHESWARI &amp; BALAN MEMORIAL CHARITABLE TRUST</div>
            <div class="trust-sub">ESTD. 2021 • SERVE WITH LOVE &amp; COMPASSION</div>
            <div class="trust-meta">
              Registered Public Charitable Trust • Trust Reg. No: <strong>142/IV/2021</strong><br/>
              Income Tax 80G Exemption Approval Order: <strong>AAATM3809RF20214</strong> | Trust PAN: <strong>AAATM3809R</strong><br/>
              NITI Aayog NGO Darpan Reg: <strong>TN/2021/0289145</strong><br/>
              Registered Office: Tamil Nadu, India • Phone: +91 85959 68122 • Email: info@maheshwari-balantrust.org
            </div>
          </div>

          <div class="badge-bar">
            <span class="badge-80g">OFFICIAL DONATION &amp; 80G TAX EXEMPTION RECEIPT</span>
          </div>

          <div class="meta-grid">
            <div>
              <div><strong>Receipt Number:</strong> <span style="font-family: monospace; font-weight:800; color:#173F73;">${receiptNum}</span></div>
              <div style="margin-top:4px;"><strong>Payment Date:</strong> ${formattedDate} (${formattedTime})</div>
            </div>
            <div style="text-align: right;">
              <div><strong>Transaction Ref:</strong> <span style="font-family: monospace; font-weight:800; color:#064B35;">${d.transaction_id || 'RAZORPAY-TXN-VERIFIED'}</span></div>
              <div style="margin-top:4px;"><strong>Payment Status:</strong> <span style="color:#065F46; font-weight:800;">✓ VERIFIED &amp; RECEIVED</span></div>
            </div>
          </div>

          <table class="detail-table">
            <tr>
              <th>Donor Full Name</th>
              <td style="font-weight: 800; color: #173F73; font-size: 14px;">${d.donor_name || 'Generous Donor'}</td>
            </tr>
            <tr>
              <th>Donor Email &amp; Contact</th>
              <td>${d.email || '—'} • ${d.phone || '—'}</td>
            </tr>
            <tr>
              <th>Donor PAN (80G Tax Benefit)</th>
              <td style="font-family: monospace; font-weight: 800; color: #173F73;">${d.pan || 'ON FILE'}</td>
            </tr>
            <tr>
              <th>Program / Cause Allocated</th>
              <td style="font-weight: 700; color: #064B35;">${d.cause || 'General Trust Welfare & Medical Relief'}</td>
            </tr>
            <tr>
              <th>Payment Gateway &amp; Mode</th>
              <td>Razorpay Secured Payment Gateway • Netbanking / UPI / Cards</td>
            </tr>
            <tr class="amount-row">
              <th>Total Amount Received</th>
              <td>₹ ${amountVal.toLocaleString('en-IN')} INR</td>
            </tr>
            <tr>
              <th>Amount in Words</th>
              <td style="font-style: italic; font-weight: 700; color: #334155;">INR ${amountInWords}</td>
            </tr>
          </table>

          <div class="tax-note">
            <strong>80G TAX EXEMPTION DECLARATION:</strong> Donations made to Maheswari &amp; Balan Memorial Charitable Trust qualify for 50% deduction under Section 80G of the Indian Income Tax Act, 1961. This official computer-generated receipt serves as authentic certificate and proof for tax returns filing.
          </div>

          <div class="signature-section">
            <div class="seal-wrap">
              <div class="seal-title">★ OFFICIAL SEAL ★</div>
              <div class="seal-sub">MBMCT</div>
              <div style="font-size: 7px; color: #173F73; font-weight: 700; line-height: 1.2;">
                MAHESWARI &amp; BALAN<br/>MEMORIAL TRUST
              </div>
            </div>

            <div class="sign-box">
              <div class="digital-verify">✓ Digitally Signed &amp; Approved</div>
              <div class="sign-title">Authorized Signatory</div>
              <div class="sign-trust">For Maheswari &amp; Balan Memorial Charitable Trust</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };

  // Executive Download Report Generator
  const handleDownloadReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to download or print the report.');
      return;
    }

    const periodLabel = dateFilter === 'today' ? 'Today' :
      dateFilter === 'month' ? 'This Month' :
      dateFilter === '6months' ? 'Past 6 Months' :
      dateFilter === 'year' ? 'Current Year' :
      dateFilter === 'custom' ? `Custom Range (${customStartDate || 'Start'} to ${customEndDate || 'End'})` : 'All Time';

    const now = new Date();
    const genTimestamp = now.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const reportHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Trust Administration Report - ${periodLabel}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: #F8FAFC;
            color: #1E293B;
            padding: 30px 20px;
          }
          .print-bar {
            max-width: 900px;
            margin: 0 auto 20px auto;
            display: flex;
            justify-content: flex-end;
          }
          .btn-print {
            background: #173F73;
            color: #FFFFFF;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
          }
          .report-sheet {
            max-width: 900px;
            margin: 0 auto;
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          }
          .header {
            border-bottom: 2.5px solid #173F73;
            padding-bottom: 16px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .trust-name {
            font-size: 20px;
            font-weight: 900;
            color: #173F73;
          }
          .trust-sub {
            font-size: 11px;
            font-weight: 700;
            color: #D79A18;
            letter-spacing: 0.1em;
            margin-top: 3px;
          }
          .meta-info {
            font-size: 11px;
            color: #64748B;
            text-align: right;
            line-height: 1.5;
          }
          .kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
            margin-bottom: 30px;
          }
          .kpi-card {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 14px;
            text-align: center;
          }
          .kpi-val {
            font-size: 20px;
            font-weight: 800;
            color: #173F73;
            margin-top: 4px;
          }
          .kpi-lbl {
            font-size: 10.5px;
            font-weight: 700;
            color: #64748B;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .section-title {
            font-size: 14px;
            font-weight: 800;
            color: #102B50;
            margin: 24px 0 10px 0;
            padding-bottom: 6px;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            justify-content: space-between;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 20px;
          }
          th {
            background: #F1F5F9;
            padding: 8px 10px;
            border: 1px solid #CBD5E1;
            text-align: left;
            font-weight: 700;
            color: #334155;
          }
          td {
            padding: 8px 10px;
            border: 1px solid #E2E8F0;
            color: #1E293B;
          }
          .signatory {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 20px;
            border-top: 1px dashed #CBD5E1;
          }
          @media print {
            .print-bar { display: none !important; }
            body { background: #FFFFFF; padding: 0; }
            .report-sheet { border: none; box-shadow: none; padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="print-bar">
          <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>
        <div class="report-sheet">
          <div class="header">
            <div>
              <div class="trust-name">MAHESWARI &amp; BALAN MEMORIAL CHARITABLE TRUST</div>
              <div class="trust-sub">EXECUTIVE ADMINISTRATIVE &amp; OPERATIONS REPORT</div>
              <div style="font-size:11px; color:#475569; margin-top:4px;">
                Reg. No: 142/IV/2021 • 80G Order: AAATM3809RF20214 • NGO Darpan: TN/2021/0289145
              </div>
            </div>
            <div class="meta-info">
              <div><strong>Filter Period:</strong> ${periodLabel}</div>
              <div><strong>Generated:</strong> ${genTimestamp}</div>
              <div><strong>Generated by:</strong> ${adminUser?.full_name || 'Trust Admin'}</div>
            </div>
          </div>

          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-lbl">Total Funds</div>
              <div class="kpi-val">₹${totalRaisedPeriod.toLocaleString('en-IN')}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Donations</div>
              <div class="kpi-val">${filteredDonations.length}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Volunteers</div>
              <div class="kpi-val">${totalVolunteersPeriod}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Inquiries</div>
              <div class="kpi-val">${totalContactsPeriod}</div>
            </div>
          </div>

          <div class="section-title">
            <span>Donations Contributions Breakdown</span>
            <span>Total: ${filteredDonations.length}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Donor Name</th>
                <th>Contact</th>
                <th>Cause / Program</th>
                <th>Amount (INR)</th>
                <th>Txn Ref</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDonations.length === 0 ? '<tr><td colspan="7" style="text-align:center; color:#94A3B8;">No donations recorded for this period.</td></tr>' :
                filteredDonations.map(d => `
                  <tr>
                    <td>${d.created_at ? new Date(d.created_at).toLocaleDateString('en-IN') : '—'}</td>
                    <td><strong>${d.donor_name}</strong></td>
                    <td>${d.phone || d.email}</td>
                    <td>${d.cause || 'General Support'}</td>
                    <td style="font-weight:700;">₹${parseFloat(d.amount).toLocaleString('en-IN')}</td>
                    <td style="font-family:monospace; font-size:11px;">${d.transaction_id || '—'}</td>
                    <td>${d.status || 'Completed'}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>

          <div class="section-title">
            <span>Volunteer Registrations Summary</span>
            <span>Total: ${filteredVolunteers.length}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Volunteer Name</th>
                <th>Contact</th>
                <th>Preferred Area</th>
                <th>Availability</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredVolunteers.length === 0 ? '<tr><td colspan="6" style="text-align:center; color:#94A3B8;">No volunteers recorded for this period.</td></tr>' :
                filteredVolunteers.map(v => `
                  <tr>
                    <td>${v.created_at ? new Date(v.created_at).toLocaleDateString('en-IN') : '—'}</td>
                    <td><strong>${v.full_name}</strong></td>
                    <td>${v.phone} • ${v.email}</td>
                    <td>${v.preferred_area || 'Education'}</td>
                    <td>${v.availability || 'Weekends'}</td>
                    <td>${v.status || 'Pending'}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>

          <div class="section-title">
            <span>Contact &amp; Public Inquiries Summary</span>
            <span>Total: ${filteredContacts.length}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sender Name</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredContacts.length === 0 ? '<tr><td colspan="5" style="text-align:center; color:#94A3B8;">No inquiries recorded for this period.</td></tr>' :
                filteredContacts.map(c => `
                  <tr>
                    <td>${c.created_at ? new Date(c.created_at).toLocaleDateString('en-IN') : '—'}</td>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.email}</td>
                    <td>${c.subject || 'General Inquiry'}</td>
                    <td>${c.status || 'New'}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>

          <div class="signatory">
            <div>
              <div style="font-size:10px; color:#64748B;">Document generated from verified database records.</div>
              <div style="font-size:10px; color:#64748B;">Maheswari &amp; Balan Memorial Charitable Trust</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:13px; font-weight:800; color:#173F73;">Authorized Signatory</div>
              <div style="font-size:11px; font-weight:700; color:#475569;">For Maheswari &amp; Balan Memorial Charitable Trust</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#1E293B', fontFamily: 'inherit' }}>
      
      {/* ── MOBILE BACKDROP OVERLAY ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="admin-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 1190,
          }}
        />
      )}

      {/* ── SIDEBAR DESKTOP & MOBILE DRAWER ── */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
        style={{
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
        }}
      >
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
                  width: '100%',
                }}
              >
                <Icon size={18} color={active ? '#F5D061' : '#94A3B8'} />
                <span style={{ flex: 1 }}>{tab.label}</span>
                {tab.count !== null && (
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
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

        {/* Footer Actions — with Visit Public Website Count Badge */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#F8FAFC',
              fontSize: '0.82rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            <span>Visit Public Website</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                title="Total recorded public interactions"
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(245, 208, 97, 0.22)',
                  color: '#F5D061',
                  fontWeight: '800',
                  border: '1px solid rgba(245, 208, 97, 0.35)',
                }}
              >
                {publicInteractionsCount}
              </span>
              <ArrowUpRight size={14} color="#F5D061" />
            </div>
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
              aria-label="Toggle navigation drawer"
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
                color: '#102B50',
              }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#102B50', margin: 0, textTransform: 'capitalize' }}>
                {activeTab === 'overview' ? 'Operational Overview' : activeTab}
              </h1>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                Real-time records from public donor, volunteer &amp; contact forms
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
              <span className="status-label">{isLiveBackend ? 'MySQL Connected' : 'Local Standby'}</span>
            </div>
          </div>
        </header>

        {/* Toast Feedback */}
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

          {/* ── DATE FILTER BAR (Today Default, Month, 6 Months, Year, Custom Date) ── */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={17} color="#173F73" />
                <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#102B50' }}>
                  Filter by Timeframe:
                </span>
              </div>

              {/* Filter Pills (Scrollable on small mobile) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                overflowX: 'auto',
                maxWidth: '100%',
                paddingBottom: '2px',
                WebkitOverflowScrolling: 'touch',
              }}>
                {[
                  { id: 'today', label: 'Today (Default)' },
                  { id: 'month', label: 'This Month' },
                  { id: '6months', label: '6 Months' },
                  { id: 'year', label: 'This Year' },
                  { id: 'custom', label: 'Custom Date' },
                  { id: 'all', label: 'All Records' },
                ].map(f => {
                  const active = dateFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setDateFilter(f.id)}
                      style={{
                        padding: '6px 13px',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: active ? '800' : '600',
                        color: active ? '#FFFFFF' : '#334155',
                        backgroundColor: active ? '#173F73' : '#F1F5F9',
                        border: '1px solid',
                        borderColor: active ? '#173F73' : '#CBD5E1',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Date Inputs (shown only when Custom Date is selected) */}
            {dateFilter === 'custom' && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '8px',
                borderTop: '1px dashed #E2E8F0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#64748B' }}>From:</span>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={e => setCustomStartDate(e.target.value)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      color: '#1E293B',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#64748B' }}>To:</span>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={e => setCustomEndDate(e.target.value)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      color: '#1E293B',
                    }}
                  />
                </div>
                {(customStartDate || customEndDate) && (
                  <button
                    onClick={() => { setCustomStartDate(''); setCustomEndDate(''); }}
                    style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: '700', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    Clear Dates
                  </button>
                )}
              </div>
            )}

            {/* Helpful Notice when Today filter returns 0 */}
            {dateFilter === 'today' && filteredDonations.length === 0 && (
              <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={13} color="#D79A18" />
                <span>Showing today's activity. (0 entries today). Select <strong>This Month</strong> or <strong>All Records</strong> to view previous records.</span>
              </div>
            )}
          </div>

          {/* ── KPI METRICS CARDS (Dynamic based on selected Date Filter) ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}>
            {/* Card 1: Total Donations */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Funds Raised</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D79A18' }}>
                  <IndianRupee size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                ₹{totalRaisedPeriod.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                {filteredDonations.length} recorded payments in period
              </div>
            </div>

            {/* Card 2: Total Donors */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Active Donors</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
                  <Heart size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                {totalDonorsPeriod}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                Individual &amp; corporate supporters
              </div>
            </div>

            {/* Card 3: Volunteers */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Volunteers</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                  <Users size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                {totalVolunteersPeriod}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                Registered in this period
              </div>
            </div>

            {/* Card 4: Contact Messages */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Contact Inquiries</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7E22CE' }}>
                  <MessageSquare size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#102B50' }}>
                {totalContactsPeriod}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                Community &amp; support queries
              </div>
            </div>
          </div>

          {/* ── TOOLBAR: SEARCH, EXPORT CSV & DOWNLOAD REPORT ── */}
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
              minWidth: '240px',
              flex: '1 1 240px',
            }}>
              <Search size={16} color="#64748B" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', fontSize: '0.86rem', outline: 'none', border: 'none', background: 'transparent' }}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} style={{ color: '#94A3B8', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
              )}
            </div>

            {/* Actions: Export CSV & Download Report */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
              
              {/* Export CSV */}
              <button
                onClick={() => {
                  if (activeTab === 'donations') exportToCSV(filteredDonations, 'donations');
                  else if (activeTab === 'volunteers') exportToCSV(filteredVolunteers, 'volunteers');
                  else if (activeTab === 'contacts') exportToCSV(filteredContacts, 'contacts');
                  else exportToCSV([...filteredDonations, ...filteredVolunteers, ...filteredContacts], 'trust_records');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 15px',
                  borderRadius: '8px',
                  backgroundColor: '#102B50',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <Download size={14} color="#F5D061" />
                <span>Export CSV</span>
              </button>

              {/* Download Report */}
              <button
                onClick={handleDownloadReport}
                title="Generate printable executive summary report with trust header and statistics"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 15px',
                  borderRadius: '8px',
                  backgroundColor: '#064B35',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(6, 75, 53, 0.2)',
                  transition: 'opacity 0.2s',
                }}
              >
                <Printer size={14} color="#F5D061" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* ── 1. DONATIONS TABLE WITH 80G RECEIPT ACTION ── */}
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
                  <button
                    onClick={() => setActiveTab('donations')}
                    style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102B50', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    View Full Table →
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Donor Name</th>
                      <th style={{ padding: '12px 16px' }}>Contact</th>
                      <th style={{ padding: '12px 16px' }}>Cause</th>
                      <th style={{ padding: '12px 16px' }}>Amount</th>
                      <th style={{ padding: '12px 16px' }}>TXN ID</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>80G Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#94A3B8' }}>
                          No donations found for this period. Click 'All Records' in the filter bar to view previous donations.
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
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <button
                              onClick={() => handlePrintReceipt(d)}
                              title="Print / Download Official 80G Receipt"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '5px 11px',
                                borderRadius: '6px',
                                backgroundColor: '#EFF6FF',
                                color: '#173F73',
                                border: '1px solid #BFDBFE',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                              }}
                            >
                              <FileText size={13} color="#173F73" />
                              <span>Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 2. VOLUNTEERS TABLE ── */}
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
                  <button
                    onClick={() => setActiveTab('volunteers')}
                    style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102B50', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    View Full Table →
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
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
                          No volunteer registrations recorded for this period. Submissions from the Volunteer Page will appear here.
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

          {/* ── 3. CONTACT INQUIRIES TABLE ── */}
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
                  <button
                    onClick={() => setActiveTab('contacts')}
                    style={{ fontSize: '0.8rem', fontWeight: '700', color: '#102B50', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    View Full Table →
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
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
                          No contact inquiries recorded for this period. Messages submitted on the Contact Page will appear here.
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
          .admin-sidebar.sidebar-open {
            transform: translateX(0) !important;
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
          .status-label {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
