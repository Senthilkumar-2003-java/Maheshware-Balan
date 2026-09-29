// API client for connecting to the Express + MySQL backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeader() {
  const token = sessionStorage.getItem('mbct_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Fallback seed data in case backend server is unreachable
export const fallbackData = {
  donations: [
    { id: 1, donor_name: 'Arun Prakash', email: 'arun@gmail.com', phone: '+91 98401 23456', amount: 50000.00, cause: 'Education Support', payment_method: 'UPI', status: 'Completed', transaction_id: 'TXN_20260901_01', created_at: '2026-09-01T10:00:00Z' },
    { id: 2, donor_name: 'Priya Sundaram', email: 'priya@gmail.com', phone: '+91 87544 11223', amount: 25000.00, cause: 'Cancer Care', payment_method: 'Net Banking', status: 'Completed', transaction_id: 'TXN_20260902_02', created_at: '2026-09-02T11:30:00Z' },
    { id: 3, donor_name: 'Karthik Raja', email: 'karthik@gmail.com', phone: '+91 94431 88990', amount: 10000.00, cause: 'Old Age Support', payment_method: 'Credit Card', status: 'Completed', transaction_id: 'TXN_20260903_03', created_at: '2026-09-03T09:15:00Z' },
    { id: 4, donor_name: 'Deepa Manikandan', email: 'deepa@gmail.com', phone: '+91 91234 56780', amount: 5000.00, cause: 'Leprosy Support', payment_method: 'UPI', status: 'Completed', transaction_id: 'TXN_20260904_04', created_at: '2026-09-04T14:20:00Z' },
    { id: 5, donor_name: 'Manojkumar', email: 'manoj@gmail.com', phone: '+91 97890 12345', amount: 15000.00, cause: 'General Support', payment_method: 'UPI', status: 'Completed', transaction_id: 'TXN_20260905_05', created_at: '2026-09-05T16:45:00Z' },
  ],
  contacts: [
    { id: 1, name: 'Rajesh V', email: 'rajesh@gmail.com', phone: '+91 98410 99887', subject: 'Child Education Sponsorship', message: 'I would like to sponsor 3 government school students for the upcoming academic year.', status: 'New', created_at: '2026-09-25T10:00:00Z' },
    { id: 2, name: 'Meena Kumari', email: 'meena@gmail.com', phone: '+91 80560 33445', subject: 'Volunteer for Cancer Camp', message: 'Can our medical team volunteer in your upcoming rural health checkup camp?', status: 'Replied', created_at: '2026-09-24T12:00:00Z' },
  ],
  volunteers: [
    { id: 1, full_name: 'Dr. Ramesh', email: 'ramesh@gmail.com', phone: '+91 98840 12300', preferred_area: 'Healthcare Support', availability: 'Weekends', status: 'Approved', created_at: '2026-09-20T10:00:00Z' },
    { id: 2, full_name: 'Sneha Patel', email: 'sneha@gmail.com', phone: '+91 61234 90123', preferred_area: 'Community Welfare', availability: 'Flexible', status: 'Pending', created_at: '2026-09-21T11:00:00Z' },
  ],
  beneficiaries: [
    { id: 1, full_name: 'Kavitha S', program_area: 'Education', location: 'Salem, TN', assistance_amount: 12000.00, status: 'Approved', created_at: '2026-09-17T09:00:00Z' },
    { id: 2, full_name: 'Ravi Kumar', program_area: 'Cancer Care', location: 'Madurai, TN', assistance_amount: 45000.00, status: 'Approved', created_at: '2026-09-16T14:00:00Z' },
    { id: 3, full_name: 'Lakshmi Ammal', program_area: 'Elderly Care', location: 'Chennai, TN', assistance_amount: 8000.00, status: 'Pending', created_at: '2026-09-15T10:00:00Z' },
    { id: 4, full_name: 'Selvam P', program_area: 'Leprosy Support', location: 'Trichy, TN', assistance_amount: 15000.00, status: 'Approved', created_at: '2026-09-14T11:30:00Z' },
    { id: 5, full_name: 'Anbu M', program_area: 'Education', location: 'Vellore, TN', assistance_amount: 10000.00, status: 'Rejected', created_at: '2026-09-13T16:00:00Z' },
  ]
};

// ── AUTH API ──
export async function loginApi(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend login endpoint unavailable, checking fallback:', err.message);
    if (email.toLowerCase() === 'senthilkumar@gmail.com' && password === 'Senthil@2003') {
      return {
        success: true,
        token: 'mock_jwt_token_for_preview_mode',
        admin: { id: 1, fullName: 'Senthilkumar', email, role: 'SuperAdmin' }
      };
    }
    return { success: false, message: 'Invalid credentials or server connection failed.' };
  }
}

// ── DONATIONS API ──
export async function getDonationsApi() {
  try {
    const res = await fetch(`${API_BASE}/donations`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, donations: data.donations || [] };
  } catch (err) {
    console.warn('Failed to fetch donations from backend, using fallback:', err.message);
    return { success: true, donations: fallbackData.donations, isFallback: true };
  }
}

export async function getDonationStatsApi() {
  try {
    const res = await fetch(`${API_BASE}/donations/stats`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, stats: data.stats };
  } catch (err) {
    console.warn('Failed to fetch donation stats from backend, computing fallback:', err.message);
    const total = fallbackData.donations.reduce((sum, d) => sum + Number(d.amount), 0);
    return {
      success: true,
      stats: {
        totalDonations: total,
        donationCount: fallbackData.donations.length,
        peopleSupported: 1248,
        activeProjects: 12,
        volunteers: 86,
      },
      isFallback: true
    };
  }
}

// ── CONTACTS API ──
export async function getContactsApi() {
  try {
    const res = await fetch(`${API_BASE}/contacts`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, contacts: data.contacts || [] };
  } catch (err) {
    console.warn('Failed to fetch contacts, using fallback:', err.message);
    return { success: true, contacts: fallbackData.contacts, isFallback: true };
  }
}

export async function updateContactStatusApi(id, status) {
  try {
    const res = await fetch(`${API_BASE}/contacts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to update contact status:', err.message);
    return { success: false, message: err.message };
  }
}

// ── VOLUNTEERS API ──
export async function getVolunteersApi() {
  try {
    const res = await fetch(`${API_BASE}/volunteers`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, volunteers: data.volunteers || [] };
  } catch (err) {
    console.warn('Failed to fetch volunteers, using fallback:', err.message);
    return { success: true, volunteers: fallbackData.volunteers, isFallback: true };
  }
}

export async function updateVolunteerStatusApi(id, status) {
  try {
    const res = await fetch(`${API_BASE}/volunteers/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to update volunteer status:', err.message);
    return { success: false, message: err.message };
  }
}

// ── BENEFICIARIES API ──
export async function getBeneficiariesApi() {
  try {
    const res = await fetch(`${API_BASE}/beneficiaries`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, beneficiaries: data.beneficiaries || [] };
  } catch (err) {
    console.warn('Failed to fetch beneficiaries, using fallback:', err.message);
    return { success: true, beneficiaries: fallbackData.beneficiaries, isFallback: true };
  }
}
