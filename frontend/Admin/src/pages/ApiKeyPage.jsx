import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export function ApiKeyPage() {
  const { authUser } = useAuthStore();
  const [apiKeys, setApiKeys] = useState([]);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [hiddenKeys, setHiddenKeys] = useState(new Set());
  const [loading, setLoading] = useState(false);


  // Fetch API keys from backend
  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/getAll-keys");
      
      setApiKeys(res.data);
    } catch (err) {
      console.error("Error fetching API keys:", err);
      // toast.error("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  // Create new API key
  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    try {
      const res = await axiosInstance.post("/admin/create-api-key", {
        name: newKeyName,
        userId: authUser._id,
      });
      setApiKeys([res.data, ...apiKeys]); // prepend new key
      toast.success("API Key created successfully");
      setNewKeyName("");
      fetchApiKeys();
      setShowNewKeyForm(false);

    } catch (err) {
      console.error("Error creating API key:", err);
      toast.error(err.response?.data?.message || "Failed to create API key");
    }
  };

  // Delete API key
  const deleteApiKey = async (keyId) => {
    if (!window.confirm("Are you sure you want to delete this API key?")) return;
    try {
      await axiosInstance.post("/admin/delete-api-key", { id: keyId });
      setApiKeys(apiKeys.filter((key) => key._id !== keyId));
      toast.success("API Key deleted successfully");
    } catch (err) {
      console.error("Error deleting API key:", err);
      toast.error(err.response?.data?.message || "Failed to delete API key");
    }
  };

  // Copy key
  const copyApiKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Toggle visibility
  const toggleKeyVisibility = (keyId) => {
    const newHiddenKeys = new Set(hiddenKeys);
    if (newHiddenKeys.has(keyId)) newHiddenKeys.delete(keyId);
    else newHiddenKeys.add(keyId);
    setHiddenKeys(newHiddenKeys);
  };

  const maskApiKey = (key) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
            <p className="mt-2 text-gray-600">
              Generate and manage your API keys for secure access to our
              services.
            </p>
          </div>

          {/* Create New API Key */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Generate New API Key
              </h2>
            </div>
            <div className="p-6">
              {!showNewKeyForm ? (
                <button
                  onClick={() => setShowNewKeyForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Name
                    </label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API Key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                 

                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreateKey}
                      disabled={!newKeyName.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Generate Key
                    </button>
                    <button
                      onClick={() => setShowNewKeyForm(false)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* API Keys List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your API Keys</h2>
            </div>
            <div className="overflow-hidden">
              {loading ? (
                <div className="p-6 text-center text-gray-500">
                  Loading API keys...
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Key className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No API keys found. Generate your first API key.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey._id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {apiKey.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                apiKey.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {apiKey.isActive ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {apiKey.isActive ? "active" : "inactive"}
                            </span>
                            <span className="text-sm text-gray-500">
                              Created:{" "}
                              {new Date(apiKey.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleKeyVisibility(apiKey._id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {hiddenKeys.has(apiKey._id) ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => copyApiKey(apiKey.key)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {copiedKey === apiKey.key ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteApiKey(apiKey._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-md p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-gray-900">
                            {hiddenKeys.has(apiKey._id)
                              ? maskApiKey(apiKey.key)
                              : apiKey.key}
                          </code>
                          <span className="text-xs text-gray-500">API Key</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Api Name:</span>
                          <div className="mt-1">
                            {apiKey.name}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-gray-500">Created:</span>
                          <div className="mt-1 text-gray-900">
                            {new Date(apiKey.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Client ID:</span>
                          <div className="mt-1">
                            <button  onClick={() => copyApiKey(apiKey.createdBy)}  className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                              {apiKey.createdBy}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Security Notice
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Keep your API keys secure and never share them publicly. If
                  you suspect a key has been compromised, regenerate it
                  immediately and update your applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
