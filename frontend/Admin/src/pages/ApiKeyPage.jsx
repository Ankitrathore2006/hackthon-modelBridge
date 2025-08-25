import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
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
  Calendar,
  Activity
} from 'lucide-react';

// ApiKey type definition (for reference)
// {
//   id: string;
//   name: string;
//   key: string;
//   created: string;
//   lastUsed: string;
//   status: 'active' | 'inactive';
//   permissions: string[];
// }

export function ApiKeyPage() {
  const { authUser } = useAuthStore();
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      created: '2024-11-15',
      lastUsed: '2024-12-01 14:30:00',
      status: 'active',
      permissions: ['read', 'write']
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_test_abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      created: '2024-10-20',
      lastUsed: '2024-11-28 09:15:00',
      status: 'active',
      permissions: ['read']
    }
  ]);

  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState(['read']);
  const [copiedKey, setCopiedKey] = useState(null);
  const [hiddenKeys, setHiddenKeys] = useState(new Set());

  const permissions = [
    { id: 'read', label: 'Read Access', description: 'View data and analytics' },
    { id: 'write', label: 'Write Access', description: 'Create and update data' },
    { id: 'admin', label: 'Admin Access', description: 'Full system access' }
  ];

  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'sk_live_';
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: generateApiKey(),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active',
      permissions: selectedPermissions
    };

    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName('');
    setSelectedPermissions(['read']);
    setShowNewKeyForm(false);
  };

  const copyApiKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleKeyVisibility = (keyId) => {
    const newHiddenKeys = new Set(hiddenKeys);
    if (newHiddenKeys.has(keyId)) {
      newHiddenKeys.delete(keyId);
    } else {
      newHiddenKeys.add(keyId);
    }
    setHiddenKeys(newHiddenKeys);
  };

  const deleteApiKey = (keyId) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
    }
  };

  const maskApiKey = (key) => {
    return key.substring(0, 12) + '...' + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
            <p className="mt-2 text-gray-600">
              Generate and manage your API keys for secure access to our services.
            </p>
          </div>

          {/* Create New API Key */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Generate New API Key</h2>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <label key={permission.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPermissions([...selectedPermissions, permission.id]);
                              } else {
                                setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                              }
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{permission.label}</div>
                            <div className="text-sm text-gray-500">{permission.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
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
              {apiKeys.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Key className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No API keys found. Generate your first API key to get started.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{apiKey.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              apiKey.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {apiKey.status === 'active' ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {apiKey.status}
                            </span>
                            <span className="text-sm text-gray-500">
                              Created: {apiKey.created}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {hiddenKeys.has(apiKey.id) ? (
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
                            onClick={() => deleteApiKey(apiKey.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-md p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-gray-900">
                            {hiddenKeys.has(apiKey.id) ? maskApiKey(apiKey.key) : apiKey.key}
                          </code>
                          <span className="text-xs text-gray-500">API Key</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Permissions:</span>
                          <div className="mt-1">
                            {apiKey.permissions.map((permission) => (
                              <span
                                key={permission}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Used:</span>
                          <div className="mt-1 text-gray-900">{apiKey.lastUsed}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Actions:</span>
                          <div className="mt-1">
                            <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Regenerate
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
                <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Keep your API keys secure and never share them publicly. If you suspect a key has been compromised, 
                  regenerate it immediately and update your applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 