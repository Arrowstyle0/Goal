import React from 'react';
import { Home, Target, Lightbulb, MessageSquare, Calendar, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Target, label: 'Goals', path: '/dashboard/goals' },
        { icon: Calendar, label: 'To-Do List', path: '/dashboard/todos' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col z-40 hidden md:flex">
            <div className="p-6 flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    D
                </div>
                <span className="text-2xl font-bold text-slate-900">Desk</span>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative group",
                                isActive
                                    ? "bg-slate-50 text-blue-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                                    {item.badge}
                                </span>
                            )}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-1">
                {/* Settings removed for now */}
            </div>
        </aside>
    );
};

export default Sidebar;
