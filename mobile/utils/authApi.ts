import { LoginPayload, RegisterPayload, User } from '../interfaces/auth';
import API_URL from './endpoint';

async function handleResponse(res: Response) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export async function login(payload: LoginPayload): Promise<User> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function register(payload: RegisterPayload): Promise<User> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

//Get the currently authenticated user
export async function getMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.status === 401) return null;

  const data = await handleResponse(res);
  return data.user;
}
