export interface User {
  id: string
  email: string
  name: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export function validateToken(token: string): boolean {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return false

    const payload = JSON.parse(atob(parts[1]))
    return payload.exp > Date.now() / 1000
  } catch {
    return false
  }
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (email && password.length >= 6) {
    const user: User = {
      id: "1",
      email,
      name: email.split("@")[0],
    }

    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    const payload = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      }),
    )
    const signature = btoa("mock-signature")

    const token = `${header}.${payload}.${signature}`

    return { user, token }
  }

  throw new Error("Invalid credentials")
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ user: User; token: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (name && email && password.length >= 6) {
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
    }

    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    const payload = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      }),
    )
    const signature = btoa("mock-signature")

    const token = `${header}.${payload}.${signature}`

    return { user, token }
  }

  throw new Error("Invalid registration data")
}
