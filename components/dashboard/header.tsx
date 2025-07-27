"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Bell,
  Settings,
  User,
  Mail,
  HelpCircle
} from "lucide-react"

export default function DashboardHeader() {
  const [notifications] = useState([
    { id: 1, message: "New conversation from john@company.com", time: "2 min ago" },
    { id: 2, message: "Automation rule triggered successfully", time: "5 min ago" },
    { id: 3, message: "Weekly report is ready", time: "1 hour ago" },
  ])

  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search conversations, users..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
