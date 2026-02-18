import React, { useState, useEffect } from 'react';
import { Plus, Clock, Trash2 } from 'lucide-react';

const GoalList = ({ username, triggerRefresh }) => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGoals = async () => {
        if (!username) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/goals?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setGoals(data);
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, [username, triggerRefresh]);

    const deleteGoal = async (id) => {
        try {
            await fetch(`/api/goals/${id}`, { method: 'DELETE' });
            fetchGoals();
        } catch (e) {
            console.error(e);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/goals/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                fetchGoals();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getDaysLeft = (targetDate) => {
        const diff = new Date(targetDate) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Goal</th>
                            <th className="px-6 py-3">Deadline</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {goals.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                                    No goals found. Start by adding one!
                                </td>
                            </tr>
                        ) : (
                            goals.map(goal => {
                                const daysLeft = getDaysLeft(goal.date);
                                const isExpired = daysLeft < 0;

                                return (
                                    <tr key={goal._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-900">{goal.title}</p>
                                            {goal.description && <p className="text-xs text-slate-500 truncate max-w-[200px]">{goal.description}</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`flex items-center gap-1.5 ${isExpired ? 'text-red-500' : daysLeft < 3 ? 'text-amber-500' : 'text-slate-500'}`}>
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    {isExpired ? 'Expired' : `${daysLeft} days left`}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-400 mt-0.5 ml-5">
                                                {new Date(goal.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={goal.status}
                                                onChange={(e) => updateStatus(goal._id, e.target.value)}
                                                className={`block w-full pl-2 pr-8 py-1 text-xs font-medium border rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all
                                            ${goal.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200 focus:ring-green-500' : ''}
                                            ${goal.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500' : ''}
                                            ${goal.status === 'Not Started' ? 'bg-slate-100 text-slate-600 border-slate-200 focus:ring-slate-400' : ''}
                                        `}
                                            >
                                                <option value="Not Started">Not Started</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteGoal(goal._id)}
                                                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GoalList;
