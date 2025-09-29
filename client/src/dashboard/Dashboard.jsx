import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUserTie,
  FaTasks,
  FaUsers,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome className="mr-3 flex-shrink-0" />,
    },
    {
      name: "Leads",
      path: "/lead-list",
      icon: <FaUserTie className="mr-3 flex-shrink-0" />,
    },
    {
      name: "Tasks",
      path: "/task-list",
      icon: <FaTasks className="mr-3 flex-shrink-0" />,
    },
    {
      name: "Team",
      path: "/team-list",
      icon: <FaUsers className="mr-3 flex-shrink-0" />,
    },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path))
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {open && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-20 md:static bg-gradient-to-b from-gray-800 to-gray-900 text-white w-64 h-full transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col shadow-xl`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Syntra CRM</h1>
          <p className="text-sm text-gray-400">Manage your business</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => isMobile && setOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {isActive(item.path) && (
                    <FaChevronRight className="ml-auto text-xs opacity-70" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {localStorage.getItem("user")
                  ? localStorage.getItem("user").charAt(0).toUpperCase()
                  : "U"}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {localStorage.getItem("user") || "User"}
              </p>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-gray-400 hover:text-white flex items-center mt-1"
              >
                <FaSignOutAlt className="mr-1" /> Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <FaBars className="h-6 w-6" />
              </button>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                {navItems.find((item) => isActive(item.path))?.name ||
                  "Dashboard"}
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {localStorage.getItem("user")
                        ? localStorage.getItem("user").charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
