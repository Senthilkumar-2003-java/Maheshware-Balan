// API client for connecting to the Express + MySQL backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeader() {
  const token = sessionStorage.getItem('mbct_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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
    console.warn('Backend login endpoint unavailable:', err.message);
    return { success: false, message: 'Cannot connect to server. Please ensure the backend is running.' };
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
    console.warn('Failed to fetch donations from backend:', err.message);
    return { success: false, donations: [], error: err.message };
  }
}

export async function getDonationStatsApi() {
  try {
    const res = await fetch(`${API_BASE}/donations/stats`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, stats: data.stats };
  } catch (err) {
    console.warn('Failed to fetch donation stats from backend:', err.message);
    return { success: false, stats: null, error: err.message };
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
    console.warn('Failed to fetch contacts:', err.message);
    return { success: false, contacts: [], error: err.message };
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

// Submit contact form (public)
export async function submitContactApi(formData) {
  try {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to submit contact form:', err.message);
    return { success: false, message: 'Cannot connect to server. Please try again.' };
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
    console.warn('Failed to fetch volunteers:', err.message);
    return { success: false, volunteers: [], error: err.message };
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

// Submit volunteer form (public)
export async function submitVolunteerApi(formData) {
  try {
    const res = await fetch(`${API_BASE}/volunteers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to submit volunteer form:', err.message);
    return { success: false, message: 'Cannot connect to server. Please try again.' };
  }
}

// Submit donation form (public)
export async function submitDonationApi(formData) {
  try {
    const res = await fetch(`${API_BASE}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to submit donation form:', err.message);
    return { success: false, message: 'Cannot connect to server. Please try again.' };
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
    console.warn('Failed to fetch beneficiaries:', err.message);
    return { success: false, beneficiaries: [], error: err.message };
  }
}

export async function addBeneficiaryApi(beneficiaryData) {
  try {
    const res = await fetch(`${API_BASE}/beneficiaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(beneficiaryData),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to add beneficiary:', err.message);
    return { success: false, message: 'Cannot connect to server. Please try again.' };
  }
}

export async function updateBeneficiaryStatusApi(id, status) {
  try {
    const res = await fetch(`${API_BASE}/beneficiaries/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to update beneficiary status:', err.message);
    return { success: false, message: 'Failed to update status.' };
  }
}
