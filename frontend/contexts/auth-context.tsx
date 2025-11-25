"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  token: string | null
  // Added a loading state to indicate if authentication status is still being determined
  loading: boolean 
  setToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize token and loading state with values that work universally (server and client)
  // We use undefined as the initial state while we check storage
  const [token, setToken] = useState<string | null | undefined>(undefined)
  
  // The state is loading initially
  const [loading, setLoading] = useState(true)

  // Use useEffect to interact with browser-specific APIs (sessionStorage)
  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem("authToken")
      setToken(storedToken)
    } catch (error) {
      console.error("Could not access sessionStorage:", error)
      setToken(null) // Default to null if access fails
    } finally {
      // Set loading to false once the token value is retrieved client-side
      setLoading(false)
    }
  }, []) // Empty dependency array ensures this runs once after initial render

  const logout = () => {
    setToken(null)
    // Ensure we are in a browser environment before accessing sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("authToken")
    }
  }

  // A helper function to update both state and sessionStorage correctly
  const updateToken = (newToken: string | null) => {
    setToken(newToken)
    if (typeof window !== "undefined") {
      if (newToken) {
        sessionStorage.setItem("authToken", newToken)
      } else {
        sessionStorage.removeItem("authToken")
      }
    }
  }

  // Provide the finalized context value. The token is null until proven otherwise.
  // We cast token to string | null because undefined is an internal state
  const contextValue = { 
    token: token !== undefined ? token : null, 
    loading, 
    setToken: updateToken, 
    logout 
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
