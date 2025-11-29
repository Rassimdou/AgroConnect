import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: For mobile devices, you can use ngrok to expose your local backend
// Set EXPO_PUBLIC_API_URL environment variable or update this directly
// Example ngrok URL: 'https://abc123.ngrok.io'
const HOST = process.env.EXPO_PUBLIC_API_URL || 'https://parametric-lucrecia-untoppled.ngrok-free.dev';
const AUTH_BASE = `${HOST}/api/auth`;

async function saveToken(token) {
  if (!token) return;
  await AsyncStorage.setItem('authToken', token);
}

export async function getToken() {
  return AsyncStorage.getItem('authToken');
}

async function parseResponse(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

export async function transporterLogin(email, password) {
  console.log('[api] transporterLogin', { email });
  const res = await fetch(`${AUTH_BASE}/login/transporter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseResponse(res);
  console.log('[api] transporterLogin response', res.status, data);
  if (!res.ok) throw data;
  await saveToken(data.token);
  return data;
}

// Accept payload object from UI
export async function transporterRegister(payload) {
  console.log('[api] transporterRegister payload', payload);
  const res = await fetch(`${AUTH_BASE}/register/transporter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(res);
  console.log('[api] transporterRegister response', res.status, data);
  if (!res.ok) throw data;
  await saveToken(data.token);
  return data;
}

export async function authFetch(path, opts = {}) {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...(opts.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const res = await fetch(`${HOST}${path}`, { ...opts, headers });
  return res;
}