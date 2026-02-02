import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StatsCard from '../components/dashboard/StatsCard';
import { Target, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DashboardOverview = () => {
    const { username } = useOutletContext();
    const [stats, setStats] = useState({
        goals: { total: 0, completed: 0, inProgress: 0 },
        todos: { total: 0, pending: 0, completed: 0 }
    });
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!username) return;
            try {
                // Fetch Stats
                const statsResponse = await fetch(`http://localhost:3001/api/dashboard/stats?username=${username}`);
                if (statsResponse.ok) {
                    const data = await statsResponse.json();
                    setStats(data);
                }

                // Fetch History Graph Data
                const historyResponse = await fetch(`http://localhost:3001/api/dashboard/history?username=${username}`);
                if (historyResponse.ok) {
                    const history = await historyResponse.json();
                    setHistoryData(history);
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [username]);

    const calculateProgress = () => {
        if (stats.goals.total === 0) return 0;
        return Math.round((stats.goals.completed / stats.goals.total) * 100);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                <p className="text-slate-500">Your progress at a glance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard label="Total Goals" value={stats.goals.total} trend="normal" />
                <StatsCard label="Goals Completed" value={stats.goals.completed} trend="up" />
                <StatsCard label="Pending Tasks" value={stats.todos.pending} trend="warning" />
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-xl border border-transparent shadow-lg text-white">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-blue-100 text-sm">Overall Progress</h3>
                        <Target className="w-5 h-5 text-blue-100" />
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold">{calculateProgress()}%</span>
                    </div>
                    <div className="mt-4 w-full bg-blue-800/30 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full transition-all duration-1000" style={{ width: `${calculateProgress()}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-6">Activity Trends</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historyData}>
                                <defs>
                                    <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="goals" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGoals)" strokeWidth={3} />
                                <Area type="monotone" dataKey="tasks" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-6">Focus Breakdown</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600">Active Goals</span>
                                <span className="font-medium text-slate-900">{stats.goals.inProgress}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(stats.goals.inProgress / (stats.goals.total || 1)) * 100}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600">Pending Tasks</span>
                                <span className="font-medium text-slate-900">{stats.todos.pending}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${(stats.todos.pending / (stats.todos.total || 1)) * 100}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600">Completed Tasks</span>
                                <span className="font-medium text-slate-900">{stats.todos.completed}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(stats.todos.completed / (stats.todos.total || 1)) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-xs text-slate-400 text-center">
                            "Success is the sum of small efforts, repeated day in and day out."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
