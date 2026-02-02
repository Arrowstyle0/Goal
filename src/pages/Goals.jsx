import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import GoalList from '../components/dashboard/GoalList';
import AddGoal from '../components/dashboard/AddGoal';

const Goals = () => {
    const { username } = useOutletContext();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const onGoalAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">My Goals</h2>
                    <p className="text-slate-500">Track and manage your personal objectives.</p>
                </div>
                <AddGoal onGoalAdded={onGoalAdded} username={username} />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <GoalList username={username} triggerRefresh={refreshTrigger} />
            </div>
        </div>
    );
};

export default Goals;
