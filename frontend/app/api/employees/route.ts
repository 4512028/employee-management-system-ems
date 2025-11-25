import { type NextRequest, NextResponse } from "next/server"
import { API_ENDPOINTS } from "@/lib/api-config"

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("[v0] Employees GET API called - forwarding to backend")
    const { searchParams } = new URL(request.url)

    const queryString = searchParams.toString()
    const backendUrl = `${API_ENDPOINTS.EMPLOYEES_GET}?${queryString}`
    console.log("[v0] Fetching from backend:", backendUrl)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = await response.json()
    console.log("[v0] Backend response status:", response.status)
    console.log("[v0] Backend response data:", data)

    if (!response.ok) {
      console.log("[v0] Backend GET failed:", response.status, data)
      return NextResponse.json(data, { status: response.status })
    }

    console.log("[v0] Employees fetched from backend:", data?.data?.length || 0)
    return NextResponse.json(data, { status: 200 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.log("[v0] Employees GET API error:", errorMessage)
    console.log("[v0] Trying to reach backend at:", API_ENDPOINTS.EMPLOYEES_GET)

    if (errorMessage.includes("abort")) {
      return NextResponse.json(
        {
          error: "Backend connection timeout. Ensure backend is running at " + API_ENDPOINTS.EMPLOYEES_GET,
        },
        { status: 504 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to connect to backend server. Backend URL: " + API_ENDPOINTS.EMPLOYEES_GET,
        details: errorMessage,
      },
      { status: 502 },
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("[v0] Employees POST API called - forwarding to backend")
    const body = await request.json()
    console.log("[v0] Creating employee:", body)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(API_ENDPOINTS.EMPLOYEES_CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = await response.json()
    console.log("[v0] Backend response status:", response.status)

    if (!response.ok) {
      console.log("[v0] Backend POST failed:", response.status, data)
      return NextResponse.json(data, { status: response.status })
    }

    console.log("[v0] Employee created in backend")
    return NextResponse.json(data, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.log("[v0] Employees POST API error:", errorMessage)
    console.log("[v0] Trying to reach backend at:", API_ENDPOINTS.EMPLOYEES_CREATE)

    if (errorMessage.includes("abort")) {
      return NextResponse.json(
        {
          error: "Backend connection timeout. Ensure backend is running at " + API_ENDPOINTS.EMPLOYEES_CREATE,
        },
        { status: 504 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to connect to backend server. Backend URL: " + API_ENDPOINTS.EMPLOYEES_CREATE,
        details: errorMessage,
      },
      { status: 502 },
    )
  }
}
