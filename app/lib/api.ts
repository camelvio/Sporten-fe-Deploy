const DEFAULT_API_URL = "https://be-sporton.agunacourse.com/api";
const DEFAULT_API_ROOT = "https://be-sporton.agunacourse.com";

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // Pakai fallback jika env variable bernilai undefined
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    ...options,
    cache: options?.cache || "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path?: string) {
  // Jika path kosong/undefined, return string kosong biar gak error
  if (!path) return "";
  
  // Jika sudah full URL (misal dari http/https)
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // Bersihkan slash ganda
  const rootUrl = process.env.NEXT_PUBLIC_API_ROOT || DEFAULT_API_ROOT;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${rootUrl}${cleanPath}`;
}