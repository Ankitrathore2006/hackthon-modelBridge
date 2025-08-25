import { useState } from 'react';
import {
  Code,
  Copy,
  CheckCircle,
  BookOpen,
  Zap,
  Terminal,
  Globe,
  Database,
  Shield,
  Clock
} from 'lucide-react';

export function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState(null);

  const BASE_URL = "https://model-bridge-backend.vercel.app/api/v1/model";

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: <Code className="h-4 w-4" /> },
    { id: 'python', name: 'Python', icon: <Terminal className="h-4 w-4" /> },
    { id: 'curl', name: 'cURL', icon: <Globe className="h-4 w-4" /> },
    { id: 'php', name: 'PHP', icon: <Database className="h-4 w-4" /> },
    { id: 'java', name: 'Java', icon: <Shield className="h-4 w-4" /> },
  ];

  const codeExamples = {
    javascript: [
      {
        language: 'javascript',
        title: 'Basic API Request',
        code: `const response = await fetch('${BASE_URL}', {
  method: 'POST',
  headers: {
    'text': 'YOUR_QUERY',
    'apikey': 'YOUR_API_KEY',
    'clientId': 'YOUR_CLIENT_ID',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ]
  })
});

const data = await response.json();
console.log(data);`,
        description: 'Make a basic API request using JavaScript fetch API'
      },
      {
        language: 'javascript',
        title: 'Error Handling',
        code: `try {
  const response = await fetch('${BASE_URL}', {
    method: 'POST',
    headers: {
      'text': 'YOUR_QUERY',
      'apikey': 'YOUR_API_KEY',
      'clientId': 'YOUR_CLIENT_ID',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello' }]
    })
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  const data = await response.json();
  console.log('Success:', data);
} catch (error) {
  console.error('Error:', error);
}`,
        description: 'Handle errors gracefully in your API requests'
      }
    ],
    python: [
      {
        language: 'python',
        title: 'Basic API Request',
        code: `import requests

url = "${BASE_URL}"
headers = {
    "apikey": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-4",
    "messages": [
        {"role": "user", "content": "Hello, how are you?"}
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
        description: 'Make API requests using Python requests library'
      }
    ],
    curl: [
      {
        language: 'curl',
        title: 'Basic cURL Request',
        code: `curl -X POST ${BASE_URL} \\
  -H "apikey: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'`,
        description: 'Make API requests using cURL'
      }
    ],
    php: [
      {
        language: 'php',
        title: 'Basic PHP Request',
        code: `<?php
$url = '${BASE_URL}';
$data = [
    'model' => 'gpt-4',
    'messages' => [
        ['role' => 'user', 'content' => 'Hello, how are you?']
    ]
];

$options = [
    'http' => [
        'header' => [
            'apikey: Bearer YOUR_API_KEY',
            'Content-Type: application/json'
        ],
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);

print_r($response);
?>`,
        description: 'Make API requests using PHP'
      }
    ],
    java: [
      {
        language: 'java',
        title: 'Java HTTP Client',
        code: `import java.net.http.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;

public class ApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        String jsonBody = "{\\"model\\":\\"gpt-4\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"Hello, how are you?\\"}]}";
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("${BASE_URL}"))
            .header("apikey", "Bearer YOUR_API_KEY")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        
        System.out.println(response.body());
    }
}`,
        description: 'Make API requests using Java 11+ HTTP Client'
      }
    ]
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    { icon: <Zap className="h-6 w-6 text-blue-600" />, title: 'Fast & Reliable', description: 'High-performance API with 99.9% uptime guarantee' },
    { icon: <Shield className="h-6 w-6 text-green-600" />, title: 'Secure', description: 'Enterprise-grade security with API key authentication' },
    { icon: <Globe className="h-6 w-6 text-purple-600" />, title: 'Global CDN', description: 'Low-latency access from anywhere in the world' },
    { icon: <Clock className="h-6 w-6 text-orange-600" />, title: 'Real-time', description: 'Get responses in milliseconds with streaming support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
            <p className="mt-2 text-gray-600">
              Learn how to integrate our AI models into your applications with step-by-step guides and code examples.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">{f.icon}<h3 className="ml-3 text-lg font-medium text-gray-900">{f.title}</h3></div>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Start */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200"><h2 className="text-lg font-medium text-gray-900">Quick Start Guide</h2></div>
            <div className="p-6 space-y-6">
              {["Get Your API Key", "Make Your First Request", "Handle Responses"].map((title, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <p className="text-gray-600 mt-1">
                      {i === 0 && "Generate an API key from your dashboard. Keep it secure and never share it publicly."}
                      {i === 1 && "Use the code examples below to make your first API call. Choose your preferred programming language."}
                      {i === 2 && "Process the API response and implement error handling for production use."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Code Examples</h2>
              <p className="mt-1 text-sm text-gray-500">Choose your programming language to see relevant code examples</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {languages.map(lang => (
                  <button key={lang.id} onClick={() => setActiveTab(lang.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === lang.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}>
                    {lang.icon}<span>{lang.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Examples */}
            <div className="p-6 space-y-8">
              {codeExamples[activeTab].map((ex, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{ex.title}</h3>
                      <p className="text-sm text-gray-600">{ex.description}</p>
                    </div>
                    <button onClick={() => copyCode(ex.code)} className="text-gray-400 hover:text-gray-600 flex items-center space-x-1">
                      {copiedCode === ex.code ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      <span className="text-xs">{copiedCode === ex.code ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-4 bg-gray-900">
                    <pre className="text-sm text-gray-100 overflow-x-auto"><code>{ex.code}</code></pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Reference */}
          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200"><h2 className="text-lg font-medium text-gray-900">API Reference</h2></div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Base URL</h3>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{BASE_URL}</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication</h3>
                <p className="text-gray-600 mb-2">All API requests require authentication using your API key in the apikey header:</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">apikey: Bearer YOUR_API_KEY</code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Rate Limits</h3>
                <p className="text-gray-600">Free: 1,000 req/mo • Pro: 10,000 req/mo • Enterprise: Unlimited</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Response Format</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! I'm doing well, thank you for asking."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}`}</pre>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 flex">
            <BookOpen className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-blue-900">Need Help?</h3>
              <p className="mt-1 text-blue-700">Check out our docs, join the forum, or contact support.</p>
              <div className="mt-4 flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">View Docs</button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">Contact Support</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
