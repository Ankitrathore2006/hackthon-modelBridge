
import {
  Activity,
  CreditCard,
  Key,
  Code,
  FileText,
  TrendingUp,
  Zap,
  Database,
  Target,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

export function Dashboard() {
  const { authUser } = useAuthStore(); 
  console.log("Authenticated User:", authUser);
  // Mock data - replace with real data from your API
  const stats = {
    totalUsage: 15420,
    activeApis: 3,
    currentBilling: 29,
    apiCalls: 1247,
    successRate: 98.5,
    responseTime: 245,
    monthlyGrowth: 12.5,
    uptime: 99.9,
  };

  const recentActivity = [
    { id: 1, action: "API Key Generated", time: "2 minutes ago", status: "success", icon: Key },
    { id: 2, action: "Model Request Completed", time: "5 minutes ago", status: "success", icon: Database },
    { id: 3, action: "Payment Processed", time: "1 hour ago", status: "success", icon: CreditCard },
    { id: 4, action: "Plan Upgraded", time: "2 hours ago", status: "success", icon: TrendingUp },
  ];

  const performanceMetrics = [
    { label: "API Response Time", value: "245ms", target: "200ms", status: "warning" },
    { label: "Error Rate", value: "1.5%", target: "< 1%", status: "warning" },
    { label: "Uptime", value: "99.9%", target: "99.9%", status: "success" },
    { label: "Cost Efficiency", value: "$0.003/call", target: "$0.002/call", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Welcome back, {authUser?.fullName || "User"}! 👋
                </h1>
                <p className="mt-2 text-slate-600 text-lg">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl">
                  <div className="text-sm font-medium">Current Plan</div>
                  <div className="text-xl font-bold">Professional</div>
                </div>
              </div>
            </div>
          </div>


          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Usage</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {stats.totalUsage.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                <span className="text-emerald-600 font-medium">+{stats.monthlyGrowth}%</span>
                <span className="text-slate-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active APIs</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.activeApis}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" />
                <span className="text-emerald-600 font-medium">All operational</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">API Calls Today</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.apiCalls}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
                  <Database className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Target className="h-4 w-4 text-emerald-500 mr-1" />
                <span className="text-emerald-600 font-medium">{stats.successRate}% success rate</span>
              </div>
            </div>
          </div>

          
            

          

          {/* System Status */}
          <div className="flex flex-col h-full justify-end">

          <div className="mt-32 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">System Status</h3>
                <p className="text-slate-300 mt-1">All services operational</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">API Services</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">CDN</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
} 