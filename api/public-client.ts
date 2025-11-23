'use client';
export async function publicFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();
  return data;
}
