import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black text-white font-geist flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
        <span className="text-white">Loading dashboard...</span>
      </div>
    </div>
  )
}
