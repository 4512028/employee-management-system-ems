"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employee Manager</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}
