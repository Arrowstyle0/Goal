import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { Bell, User } from 'lucide-react';
import UserOnboarding from '../components/ui/UserOnboarding';

const Dashboard = () => {
  const [username, setUsername] = useState(localStorage.getItem('desk_username') || '');
  const [showOnboarding, setShowOnboarding] = useState(!username);

  useEffect(() => {
    const storedName = localStorage.getItem('desk_username');
    if (storedName) {
      setUsername(storedName);
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleUserSet = (name) => {
    setUsername(name);
    localStorage.setItem('desk_username', name);
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <UserOnboarding isOpen={showOnboarding} onSave={handleUserSet} />

      {/* Main Layout Area */}
      <main className="flex-1 ml-0 md:ml-64 p-8 overflow-y-auto">
        {/* Global Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {username || 'friend'}!
            </h1>
            <p className="text-slate-500 text-sm">Here's your daily overview.</p>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:bg-white hover:shadow-sm rounded-lg transition-all">
              <Bell className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-medium shadow-md">
                {username ? username.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900">{username || 'Guest User'}</p>
                <p className="text-xs text-slate-500">Personal Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Nested Routes Content */}
        <Outlet context={{ username }} />

      </main>
    </div>
  );
};

export default Dashboard;
