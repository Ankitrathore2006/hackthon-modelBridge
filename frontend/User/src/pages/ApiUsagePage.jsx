import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  Database,
  Zap,
  Target
} from 'lucide-react';

export function ApiUsagePage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data - replace with real data from your API
  const usageData = {
    totalRequests: 15420,
    successfulRequests: 15120,
    failedRequests: 300,
    totalTokens: 2450000,
    totalCost: 29.45,
    avgResponseTime: 245,
    uniqueUsers: 45,
    topModels: [
      { name: 'gpt-4', requests: 8200, cost: 16.40 },
      { name: 'gpt-3.5-turbo', requests: 6200, cost: 6.20 },
      { name: 'dall-e-3', requests: 1020, cost: 6.85 }
    ],
    dailyUsage: [
      { date: '2024-11-25', requests: 1200, cost: 2.34 },
      { date: '2024-11-26', requests: 1350, cost: 2.67 },
      { date: '2024-11-27', requests: 1100, cost: 2.15 },
      { date: '2024-11-28', requests: 1450, cost: 2.89 },
      { date: '2024-11-29', requests: 1600, cost: 3.12 },
      { date: '2024-11-30', requests: 1400, cost: 2.78 },
      { date: '2024-12-01', requests: 1320, cost: 2.50 }
    ]
  };

  const successRate = ((usageData.successfulRequests / usageData.totalRequests) * 100).toFixed(1);
  const avgCostPerRequest = (usageData.totalCost / usageData.totalRequests).toFixed(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">API Usage Analytics</h1>
                <p className="mt-2 text-slate-600 text-lg">
                  Monitor your API consumption, track performance metrics, and analyze usage patterns.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Requests</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {usageData.totalRequests.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                <span className="text-emerald-600 font-medium">+12.5%</span>
                <span className="text-slate-500 ml-1">from last period</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Success Rate</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{successRate}%</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-600">{usageData.failedRequests} failed requests</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Cost</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">${usageData.totalCost}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-600">${avgCostPerRequest} per request</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{usageData.avgResponseTime}ms</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-600">Target: &lt;200ms</span>
              </div>
            </div>
          </div>

          {/* Usage Overview & Top Models */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Usage Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Daily Usage</h3>
                <p className="text-sm text-slate-600 mt-1">Requests and cost over time</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {usageData.dailyUsage.map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">{day.date}</span>
                          <span className="text-sm font-semibold text-slate-900">{day.requests} requests</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(day.requests / Math.max(...usageData.dailyUsage.map(d => d.requests))) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-slate-500">Cost: ${day.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Models */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Top Models</h3>
                <p className="text-sm text-slate-600 mt-1">Most used models by requests</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {usageData.topModels.map((model, index) => (
                    <div key={model.name} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                        <Database className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {model.name}
                        </p>
                        <p className="text-xs text-slate-500">{model.requests.toLocaleString()} requests</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-sm font-semibold text-slate-900">${model.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Active Users</p>
                  <p className="text-2xl font-bold text-slate-900">{usageData.uniqueUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Tokens</p>
                  <p className="text-2xl font-bold text-slate-900">{(usageData.totalTokens / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Peak Usage</p>
                  <p className="text-2xl font-bold text-slate-900">1,600</p>
                  <p className="text-xs text-slate-500">requests/day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
