"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Employee {
  id: number
  name: string
  role: string
  salary: number
}

interface EmployeesResponse {
  data: Employee[]
  total: number
  page: number
  pages: number
}

export default function EmployeesPage() {
  const { token, loading: authLoading } = useAuth() 

  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState("")
  const [minSalary, setMinSalary] = useState("")
  const [maxSalary, setMaxSalary] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form state for creating employee
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    salary: "",
  })
  const [formError, setFormError] = useState("")
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login")
    }
  }, [token, router, authLoading])

  const fetchEmployees = async () => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (minSalary) params.append("minSalary", minSalary)
      if (maxSalary) params.append("maxSalary", maxSalary)
      params.append("page", page.toString())
      params.append("limit", "5")

      const response = await fetch(`/api/employees?${params}`)
      if (!response.ok) throw new Error("Failed to fetch employees")

      const data: EmployeesResponse = await response.json()
      setEmployees(data.data)
      setTotalPages(data.pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch employees")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
  }, [search, minSalary, maxSalary])

  useEffect(() => {
    fetchEmployees()
  }, [search, minSalary, maxSalary, page])

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    setFormLoading(true)

    try {
      if (!formData.name || !formData.role || !formData.salary) {
        throw new Error("All fields are required")
      }

      const salary = Number.parseInt(formData.salary)
      if (salary <= 0) {
        throw new Error("Salary must be greater than 0")
      }

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          salary,
        }),
      })

      if (!response.ok) throw new Error("Failed to create employee")

      setFormData({ name: "", role: "", salary: "" })
      setPage(1)
      await fetchEmployees()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create employee")
    } finally {
      setFormLoading(false)
    }
  }

  if (!token) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Create Employee Form */}
        <Card className="mb-8 border-0 shadow-md">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Create Employee</h2>
            <form onSubmit={handleCreateEmployee} className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                required
              />
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                required
              />
              <Button type="submit" disabled={formLoading} className="bg-indigo-600 text-white hover:bg-indigo-700">
                {formLoading ? "Creating..." : "Create"}
              </Button>
            </form>
            {formError && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{formError}</div>}
          </div>
        </Card>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <div className="p-6">
            <h3 className="mb-4 font-semibold text-gray-900">Filters</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
                <input
                  type="number"
                  placeholder="999999"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Employees Table */}
        <Card className="border-0 shadow-md">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Employees</h2>

            {error && <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

            {loading ? (
              <div className="py-12 text-center text-gray-500">Loading...</div>
            ) : employees.length === 0 ? (
              <div className="py-12 text-center text-gray-500">No employees found</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{emp.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{emp.role}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">${emp.salary.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex gap-2">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="outline">
            Previous
          </Button>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            variant="outline"
          >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
