// Backend API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  EMPLOYEES_GET: `${API_BASE_URL}/employees`,
  EMPLOYEES_CREATE: `${API_BASE_URL}/employees`,
}
