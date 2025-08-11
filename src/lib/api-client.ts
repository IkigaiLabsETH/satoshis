// API base URL for OpenSea requests
export const API_BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/opensea`
  : 'http://localhost:3000/api/opensea';

// Helper function to make API requests
export async function fetchFromAPI<T>(path: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams({ path, ...params });
  const response = await fetch(`${API_BASE_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Generic JSON POST helper
export async function apiPost<T>(url: string, body?: any, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    ...(init || {}),
  });
  if (!res.ok) throw new Error(`POST ${url} failed`);
  return res.json();
}

export async function getBtcAdvisorDecision(payload: any) {
  const json = await apiPost<{ success: boolean; data?: any; error?: string }>(
    '/api/advisor/btc',
    payload,
  );
  if (!json.success) throw new Error(json.error || 'advisor failure');
  return json.data;
}