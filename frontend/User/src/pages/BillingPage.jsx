import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { 
  CreditCard, 
  DollarSign, 
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download
} from 'lucide-react';

export function BillingPage() {
  const { authUser } = useAuthStore();
  const [currentPlan] = useState('Professional');
  const [billingCycle] = useState('Monthly');

  // Mock billing data
  const billingData = {
    currentUsage: 15420,
    monthlyLimit: 50000,
    currentBill: 29.99,
    nextBillingDate: '2024-12-15',
    usagePercentage: (15420 / 50000) * 100
  };

  const recentTransactions = [
    {
      id: '1',
      date: '2024-12-01',
      description: 'Professional Plan - Monthly',
      amount: 29.99,
      status: 'Paid'
    },
    {
      id: '2',
      date: '2024-11-01',
      description: 'Professional Plan - Monthly',
      amount: 29.99,
      status: 'Paid'
    },
    {
      id: '3',
      date: '2024-10-01',
      description: 'Professional Plan - Monthly',
      amount: 29.99,
      status: 'Paid'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Billing & Usage</h1>
                <p className="mt-2 text-slate-600 text-lg">
                  Manage your subscription and view usage analytics
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl">
                  <div className="text-sm font-medium">Current Plan</div>
                  <div className="text-xl font-bold">{currentPlan}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Usage</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {billingData.currentUsage.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Usage</span>
                  <span>{billingData.usagePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
                    style={{ width: `${billingData.usagePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Bill</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    ${billingData.currentBill}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {billingCycle} billing cycle
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Next Billing</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {billingData.nextBillingDate}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Auto-renewal enabled
              </p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{transaction.description}</p>
                      <p className="text-sm text-slate-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${transaction.amount}</p>
                    <p className="text-sm text-green-600 font-medium">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
