"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
    BarChart3,
    Zap,
    Bell,
    HelpCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { useSidebar } from "@/app/dashboard/layout"

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Context', href: '/upload-context', icon: Zap },
    // { name: 'Conversations', href: '/dashboard/conversations', icon: MessageSquare },
    // { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    // { name: 'Users', href: '/dashboard/users', icon: Users },
    // { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
    const { collapsed, setCollapsed } = useSidebar()
    const pathname = usePathname()

    return (
        <div className={cn(
            "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-sm border-r border-white/10",
            collapsed ? "w-16" : "w-64"
        )}>
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
                    {!collapsed && (
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">R</span>
                            </div>
                            <span className="text-white font-semibold text-lg">Replexify</span>
                        </Link>
                    )}
                    {collapsed && (
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto">
                            <span className="text-white font-bold text-sm">R</span>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-white/10 text-white"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0",
                                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                    )} />
                                    {!collapsed && <span>{item.name}</span>}
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* User Section */}
                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">U</span>
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">user@company.com</p>
                                <p className="text-white/60 text-xs truncate">Admin</p>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 