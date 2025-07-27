import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, MessageSquare, Zap, Settings } from "lucide-react"

const quickActions = [
  {
    title: "New Automation Rule",
    description: "Create a new automated response rule",
    icon: Zap,
    href: "/dashboard/automation/new",
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Start Conversation",
    description: "Begin a new customer conversation",
    icon: MessageSquare,
    href: "/dashboard/conversations/new",
    color: "from-cyan-400 to-blue-500"
  },
  {
    title: "Configure Settings",
    description: "Update your automation preferences",
    icon: Settings,
    href: "/dashboard/settings",
    color: "from-orange-400 to-red-500"
  }
]

export default function QuickActions() {
  return (
    <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
        <CardDescription className="text-white/60">
          Common tasks to get you started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-white/60 text-sm">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
