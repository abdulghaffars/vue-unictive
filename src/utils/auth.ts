export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'
export const REFRESH_TOKEN_KEY = 'refreshToken'

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setRefreshToken(refreshToken: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function setStoredUser(user: unknown): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getStoredUser<T = unknown>(): T | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY)
}

export type CheckAuthResult = {
  ok: boolean
  status: number
  user?: unknown
  error?: string
}

export async function checkAuth(token?: string): Promise<CheckAuthResult> {
  const jwt = token ?? getToken()
  if (!jwt) {
    return { ok: false, status: 401, error: 'Missing token' }
  }

  try {
    const res = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: (data as any)?.message ?? 'Unauthorized',
      }
    }

    setStoredUser(data)
    return { ok: true, status: res.status, user: data }
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const result = await checkAuth()
  return result.ok
}

export async function refreshToken(): Promise<boolean> {
  try {
    const res = await fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: getRefreshToken() })
    })
    
    if (res.ok) {
      const data = await res.json()
      setToken(data.token)
      return true
    }
  } catch (e) {
    console.error('Refresh failed:', e)
  }
  return false
}


