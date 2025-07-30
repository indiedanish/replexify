"use client"

import { useState, createContext, useContext } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import ProtectedRoute from '@/components/auth/protected-route';

// Create context for sidebar state
const SidebarContext = createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ProtectedRoute>
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen bg-black">
        <Sidebar />
        <div className={`transition-all duration-300 ease-in-out ${collapsed ? 'pl-16' : 'pl-64'}`}>
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
    </ProtectedRoute>
  )
}