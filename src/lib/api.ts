export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
let cache: { token: string; exp: number } | null = null;
export const clearTokenCache = () => { cache = null; };

async function getToken(): Promise<string> {
  if (cache && cache.exp > Date.now() + 30_000) return cache.token;
  const r = await fetch('/api/token', { credentials: 'include', cache: 'no-store' });
  if (!r.ok) throw new ApiError(401, 'Please sign in to continue');
  const { token, expiresAt } = await r.json();
  cache = { token, exp: expiresAt };
  return token;
}

type Opts = { method?: string; body?: unknown; auth?: boolean };

/** Browser → Express API client (adds the JWT automatically). */
export async function api<T = any>(path: string, { method = 'GET', body, auth = true }: Opts = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (auth) headers.Authorization = `Bearer ${await getToken()}`;
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body && !isForm) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${PUBLIC_API}${path}`, {
    method, headers, body: body ? (isForm ? (body as FormData) : JSON.stringify(body)) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data?.message || 'Something went wrong');
  return data as T;
}

/** Next.js server → Express API (public endpoints only). */
export async function serverApi<T = any>(path: string): Promise<T | null> {
  const base = process.env.API_INTERNAL_URL || PUBLIC_API;
  try {
    const res = await fetch(`${base}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function uploadImage(file: File): Promise<string> {
  const cloudName = "dwdmomytl";
  const uploadPreset = "studio";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    console.error("Cloudinary Error:", result);
    throw new Error(result.error?.message || "Cloudinary image upload failed");
  }

  return result.secure_url;
}
