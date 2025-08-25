import { MessageSquare, Sparkles, Zap, Shield } from 'lucide-react';

export function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:bg-gradient-to-br lg:from-blue-50 lg:via-indigo-50 lg:to-purple-50 lg:p-12">
      <div className="max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-3 gap-6 pt-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Smart AI</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Fast & Reliable</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Secure</span>
          </div>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
