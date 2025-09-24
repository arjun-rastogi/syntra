import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed z-20 md:static bg-gray-800 text-white w-2/3 md:w-1/5 h-full p-4 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-6">My CRM</h1>
        <nav className="space-y-3">
          <Link
            to="/"
            className="block hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/lead-list"
            className="block hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            Leads
          </Link>
          <Link
            to="/task-list"
            className="block hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            Tasks
          </Link>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <main className="flex-1 md:w-4/5 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-800 text-2xl"
              onClick={() => setOpen(!open)}
            >
              <FaBars />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </header>

        <section className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
