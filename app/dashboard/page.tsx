"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProtectedRoute from '@/components/auth/protected-route';
import { useAuth } from '@/lib/contexts/auth-context';

import {
    BarChart3,
    Users,
    MessageSquare,
    Clock,
    Zap,
    Mail,
    Filter,
    Download,
    Plus,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"

// Mock data
const statsData = [
    {
        title: "Total Conversations",
        value: "2,847",
        change: "+12.5%",
        changeType: "increase" as const,
        icon: MessageSquare,
        color: "from-cyan-400 to-blue-500"
    },
    {
        title: "Active Users",
        value: "1,234",
        change: "+8.2%",
        changeType: "increase" as const,
        icon: Users,
        color: "from-orange-400 to-red-500"
    },
    {
        title: "Response Time",
        value: "2.3s",
        change: "-15.3%",
        changeType: "decrease" as const,
        icon: Clock,
        color: "from-green-400 to-emerald-500"
    },
    {
        title: "Automation Rate",
        value: "94.2%",
        change: "+3.1%",
        changeType: "increase" as const,
        icon: Zap,
        color: "from-purple-400 to-pink-500"
    }
]

const recentConversations = [
    {
        id: 1,
        customer: "john@company.com",
        platform: "Gmail",
        status: "resolved",
        time: "2 min ago",
        message: "How do I reset my password?"
    },
    {
        id: 2,
        customer: "support@startup.io",
        platform: "Slack",
        status: "pending",
        time: "5 min ago",
        message: "Need help with API integration"
    },
    {
        id: 3,
        customer: "user@tech.com",
        platform: "Intercom",
        status: "resolved",
        time: "12 min ago",
        message: "Billing question about subscription"
    },
    {
        id: 4,
        customer: "admin@enterprise.com",
        platform: "Zendesk",
        status: "in-progress",
        time: "18 min ago",
        message: "Feature request for mobile app"
    }
]

const platformStats = [
    { platform: "Gmail", conversations: 1247, percentage: 43.8 },
    { platform: "Slack", conversations: 892, percentage: 31.3 },
    { platform: "Intercom", conversations: 456, percentage: 16.0 },
    { platform: "Zendesk", conversations: 252, percentage: 8.9 }
]

export default function DashboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("7d")

    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <ProtectedRoute>
        <div className="min-h-screen bg-black text-white font-geist">
            {/* Header */}
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div>
                            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                            <p className="text-white/60 text-sm">Welcome back! Here's what's happening with your support automation.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                            <Button size="sm" className="bg-white hover:bg-gray-100 text-black">
                                <Plus className="h-4 w-4 mr-2" />
                                New Rule
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.title} className="bg-black/50 border-white/10 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white/60 text-sm font-medium">{stat.title}</p>
                                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                            <div className="flex items-center mt-2">
                                                {stat.changeType === "increase" ? (
                                                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
                                                )}
                                                <span className={`text-sm font-medium ${stat.changeType === "increase" ? "text-green-400" : "text-red-400"
                                                    }`}>
                                                    {stat.change}
                                                </span>
                                                <span className="text-white/40 text-sm ml-1">vs last period</span>
                                            </div>
                                        </div>
                                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Charts and Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2">
                        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-white">Conversation Trends</CardTitle>
                                        <CardDescription className="text-white/60">
                                            Daily conversation volume and response metrics
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                        <select
                                            value={selectedPeriod}
                                            onChange={(e) => setSelectedPeriod(e.target.value)}
                                            className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-white/40"
                                        >
                                            <option value="7d">Last 7 days</option>
                                            <option value="30d">Last 30 days</option>
                                            <option value="90d">Last 90 days</option>
                                        </select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 flex items-center justify-center">
                                    <div className="text-center">
                                        <BarChart3 className="h-16 w-16 text-white/20 mx-auto mb-4" />
                                        <p className="text-white/60">Chart component will be integrated here</p>
                                        <p className="text-white/40 text-sm">Showing data for {selectedPeriod}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Conversations */}
                    <div>
                        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">Recent Conversations</CardTitle>
                                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                                        View all
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentConversations.map((conversation) => (
                                        <div key={conversation.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Mail className="h-4 w-4 text-white/70" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-white font-medium text-sm truncate">{conversation.customer}</p>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs ${conversation.status === 'resolved'
                                                            ? 'border-green-500/30 text-green-400'
                                                            : conversation.status === 'pending'
                                                                ? 'border-yellow-500/30 text-yellow-400'
                                                                : 'border-blue-500/30 text-blue-400'
                                                            }`}
                                                    >
                                                        {conversation.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-white/60 text-xs mt-1">{conversation.platform}</p>
                                                <p className="text-white/80 text-sm mt-1 truncate">{conversation.message}</p>
                                                <p className="text-white/40 text-xs mt-1">{conversation.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Platform Distribution */}
                <div className="mt-8">
                    <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Platform Distribution</CardTitle>
                            <CardDescription className="text-white/60">
                                Conversation volume across different platforms
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {platformStats.map((platform) => (
                                    <div key={platform.platform} className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-white font-bold text-lg">{platform.platform.charAt(0)}</span>
                                        </div>
                                        <h3 className="text-white font-semibold">{platform.platform}</h3>
                                        <p className="text-white/60 text-sm">{platform.conversations.toLocaleString()} conversations</p>
                                        <div className="mt-2">
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                                                    style={{ width: `${platform.percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-white/40 text-xs mt-1">{platform.percentage}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    )
}
