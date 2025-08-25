import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalUsage: 0,
    activeApis: 0,
    currentBilling: 0,
    apiCalls: 0,
    successRate: 0,
    responseTime: 0,
    monthlyGrowth: 0,
    uptime: 0,
    totalUsers: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchStats = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     const response = await axiosInstance.get('/stats/dashboard');
  //     setStats(response.data);
  //   } catch (err) {
  //     console.error('Error fetching dashboard stats:', err);
  //     setError(err.response?.data?.message || 'Failed to fetch dashboard statistics');
  //     toast.error('Failed to load dashboard statistics');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const refreshStats = () => {
    fetchStats();
  };

  useEffect(() => {
    fetchStats();
    
    // Auto-refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats
  };
};
