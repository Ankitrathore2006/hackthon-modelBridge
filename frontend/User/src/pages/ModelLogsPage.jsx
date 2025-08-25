import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  RefreshCw,
  TrendingUp,
  Activity,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

export function ModelLogsPage() {
  const { authUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]); // ✅ ensure always array
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [showDetails, setShowDetails] = useState(new Set());

  const models = ["gemini-2.5-flash", "gpt-4", "gpt-3.5-turbo"];
  const statuses = ["success", "error", "pending"];

  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/admin/get-logs-byId", {
        userId: authUser._id,
      });

      // ✅ Normalize DB logs -> UI-friendly logs
      const formatted = res.data.map((log) => ({
        id: log._id,
        timestamp: new Date(log.timestamp).toLocaleString(),
        context: log.context || "general",
        status:
          log.action === "ALLOW"
            ? "success"
            : log.action === "ERROR"
            ? "error"
            : "pending",
        action: log.action,
        clientId: log.client_id,
        ipAddress: log.ip_address,
        userAgent: log.user_agent,
        text: log.text,
        endpoint: "/api/v1/chat", // hardcode or log.safety_result?.endpoint
        responseTime: log.processing_time_ms || 0,
        cost: log.safety_result?.cost || 0,
      }));

      setLogs(formatted);
    } catch (err) {
      console.error("Error fetching logs:", err);
      toast.error("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // ✅ Filtering now works
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.context.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesModel = modelFilter === "all" || log.context === modelFilter;
    return matchesSearch && matchesStatus && matchesModel;
  });

  const toggleDetails = (logId) => {
    const newSet = new Set(showDetails);
    newSet.has(logId) ? newSet.delete(logId) : newSet.add(logId);
    setShowDetails(newSet);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalCalls = logs.length;
  const successCalls = logs.filter((l) => l.status === "success").length;
  const errorCalls = logs.filter((l) => l.status === "error").length;
  const totalCost = logs.reduce((sum, l) => sum + l.cost, 0);
  const avgResponseTime =
    logs.reduce((sum, l) => sum + l.responseTime, 0) / (logs.length || 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Model Logs</h1>
            <p className="mt-2 text-gray-600">
              Monitor your API usage, track performance, and analyze model
              interactions.
            </p>
          </div>

          {/* Stats */}
          {/* ✅ use totalCalls, successCalls, avgResponseTime, totalCost */}
          {/* ... (your stats cards unchanged, using these values) */}

          {/* Logs Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="overflow-x-auto">
              {!loading && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Context
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Client Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Text
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLogs.map((log) => (
                      <React.Fragment key={log.id}>
                        <tr
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleDetails(log.id)}
                        >
                          <td className="px-6 py-4 text-sm">{log.timestamp}</td>
                          <td className="px-6 py-4 text-sm">{log.context}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                log.status
                              )}`}
                            >
                              {getStatusIcon(log.status)}
                              <span className="ml-1">{log.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">{log.clientId}</td>
                          <td className="px-6 py-4 text-sm">{log.ipAddress}</td>
                          <td className="px-6 py-4 text-sm">{log.text}</td>
                        </tr>

                        {showDetails.has(log.id) && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">
                                    Request ID:
                                  </span>{" "}
                                  {log.id}
                                </div>
                                <div>
                                  <span className="font-medium">
                                    Response Time:
                                  </span>{" "}
                                  {log.responseTime}ms
                                </div>
                                <div>
                                  <span className="font-medium">Endpoint:</span>{" "}
                                  {log.endpoint}
                                </div>
                                <div className="md:col-span-2">
                                  <span className="font-medium">
                                    User Agent:
                                  </span>{" "}
                                  <span className="text-xs">{log.userAgent}</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
