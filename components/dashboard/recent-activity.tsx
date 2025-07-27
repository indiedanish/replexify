import { MessageSquare, Clock, User, Zap } from "lucide-react"

interface ActivityItem {
  id: string
  type: 'conversation' | 'automation' | 'user'
  title: string
  description: string
  time: string
  user?: string
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'conversation',
    title: 'New conversation started',
    description: 'Customer inquiry about pricing plans',
    time: '2 minutes ago',
    user: 'john@company.com'
  },
  {
    id: '2',
    type: 'automation',
    title: 'Automation triggered',
    description: 'Welcome email sent to new customer',
    time: '5 minutes ago'
  },
  {
    id: '3',
    type: 'user',
    title: 'New team member added',
    description: 'Sarah joined the support team',
    time: '1 hour ago'
  },
  {
    id: '4',
    type: 'conversation',
    title: 'Conversation resolved',
    description: 'Technical issue resolved for customer',
    time: '2 hours ago',
    user: 'tech@company.com'
  }
]

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'conversation':
      return MessageSquare
    case 'automation':
      return Zap
    case 'user':
      return User
  }
}

export default function RecentActivity() {
  return (
    <div className="bg-black/50 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-white text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type)
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{activity.title}</p>
                <p className="text-white/60 text-sm">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-white/40 text-xs">{activity.time}</span>
                  {activity.user && (
                    <>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-white/40 text-xs">{activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
