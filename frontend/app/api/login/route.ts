import { type NextRequest, NextResponse } from "next/server"
import { API_ENDPOINTS } from "@/lib/api-config"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("[v0] Login API called - forwarding to backend")
    const body = await request.json()
    console.log("[v0] Login attempt:", body.email)
    console.log("[v0] Backend URL:", API_ENDPOINTS.LOGIN)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = await response.json()

    if (!response.ok) {
      console.log("[v0] Backend login failed:", response.status, data)
      return NextResponse.json(data, { status: response.status })
    }

    console.log("[v0] Login successful from backend")
    return NextResponse.json(data, { status: 200 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.log("[v0] Login API error:", errorMessage)

    if (errorMessage.includes("abort")) {
      return NextResponse.json({ error: "Backend connection timeout" }, { status: 504 })
    }

    return NextResponse.json({ error: "Failed to connect to backend server" }, { status: 502 })
  }
}
