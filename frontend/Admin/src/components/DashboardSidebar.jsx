import { Link, useLocation } from "react-router-dom";
import { 
  Key, 
  CreditCard, 
  Code, 
  FileText, 
  Activity,
  Home
} from "lucide-react";
import modelbridgeLogo from '../assets/modelbridge-logo.svg';

const DashboardSidebar = () => {
  const location = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      description: "Overview and analytics"
    },
    {
      name: "API Keys",
      href: "/api-keys",
      icon: Key,
      description: "Manage API access tokens"
    },
    
    {
      name: "API Usage",
      href: "/api-usage",
      icon: Activity,
      description: "Model usage and analytics"
    },
    {
      name: "Logs",
      href: "/logs",
      icon: FileText,
      description: "Detailed request logs"
    }
  ];

  return (
    <aside className="h-full w-64 border-r border-slate-200 bg-white flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col items-center space-y-3">
    <img src={modelbridgeLogo} alt="ModelBridge" className="h-8" />
    <div className="text-xl font-extrabold text-slate-800">Admin</div>
  </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
