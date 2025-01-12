export async function fetcher<T>(
  request: RequestInfo,
  init?: RequestInit,
  transformFn?: (data: unknown) => T,
): Promise<T> {
  try {
    const res = await fetch(request, init);
    if (!res.ok) {
      console.error("Response status:", res.status, res.statusText);
      throw new Error(
        `Network response was not OK (status ${res.status}: ${res.statusText})`,
      );
    }
    let data = await res.json();
    if (transformFn) {
      data = transformFn(data);
    }
    return data as T;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}
