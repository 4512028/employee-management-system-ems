"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("authToken")
    if (token) {
      router.push("/employees")
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}
