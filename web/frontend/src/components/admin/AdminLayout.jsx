import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldAlert,
  BarChart3
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear tokens, etc.)
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/products', icon: ShoppingBag, label: 'Products' },
    { path: '/admin/orders', icon: FileText, label: 'Orders' },
    { path: '/admin/reports', icon: ShieldAlert, label: 'Moderation' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col fixed h-full z-20`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1 className={`font-bold text-xl text-green-600 truncate ${!isSidebarOpen && 'hidden'}`}>
            AgroAdmin
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <Icon size={20} />
                    <span className={`ml-3 transition-opacity duration-300 ${
                      !isSidebarOpen && 'hidden'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } p-8 overflow-y-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
