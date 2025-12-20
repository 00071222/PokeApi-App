export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
  }
}

export async function httpGet<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new ApiError(`HTTP error: ${res.status}`, res.status);
  }

  return (await res.json()) as T;
}
