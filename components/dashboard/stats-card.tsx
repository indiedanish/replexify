import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    description?: string
    icon: LucideIcon
    trend?: {
        value: string
        isPositive: boolean
    }
    color?: string
}

export default function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    color = "from-cyan-400 to-blue-500"
}: StatsCardProps) {
    return (
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white/60 text-sm font-medium">{title}</p>
                        <p className="text-2xl font-bold text-white mt-1">{value}</p>
                        {description && (
                            <p className="text-white/40 text-sm mt-1">{description}</p>
                        )}
                        {trend && (
                            <div className="flex items-center mt-2">
                                <span className={`text-sm font-medium ${trend.isPositive ? "text-green-400" : "text-red-400"
                                    }`}>
                                    {trend.value}
                                </span>
                                <span className="text-white/40 text-sm ml-1">vs last period</span>
                            </div>
                        )}
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
