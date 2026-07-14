const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function getErrorMessage(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') {
    if (typeof payload.detail === 'string') return payload.detail;
    if (payload.detail && typeof payload.detail === 'object') {
      if (typeof payload.detail.message === 'string') return payload.detail.message;
      if (typeof payload.detail.detail === 'string') return payload.detail.detail;
    }
    if (typeof payload.message === 'string') return payload.message;
    if (Array.isArray(payload.detail)) return payload.detail.join(', ');
  }
  return fallback;
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'Request failed'));
  }

  return data;
}

export async function uploadCsv(file, user) {
  const formData = new FormData();
  formData.append('file', file);

  if (user?.email) {
    formData.append('user_email', user.email);
  }

  if (user?.uid) {
    formData.append('firebase_uid', user.uid);
  }

  const response = await fetch(`${API_BASE_URL}/analysis/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(getErrorMessage(data, 'Upload failed'));
  return data;
}

export async function syncFirebaseUser(email, firebaseUid) {
  return apiRequest('/auth/firebase-sync', {
    method: 'POST',
    body: JSON.stringify({ email, firebase_uid: firebaseUid })
  });
}
