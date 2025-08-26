import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-lg border-b border-slate-200 fixed w-full top-0 z-40 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            {/* Logo removed */}
            <Link
              to={"/"}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              ModelBridge
            </Link>

          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/50 rounded-lg transition-all duration-200 font-medium"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <button 
                className="flex gap-2 items-center px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/50 rounded-lg transition-all duration-200 font-medium" 
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
