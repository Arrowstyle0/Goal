import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import clsx from 'clsx';

const StatsCard = ({ label, value, trend }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-slate-500 font-medium text-sm">{label}</h3>
                <button className="text-slate-300 hover:text-slate-500">•••</button>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-slate-900">{value}</span>
            </div>

            {trend && (
                <div className={clsx("flex items-center gap-1 mt-4 text-xs font-medium",
                    trend === 'up' && "text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full",
                    trend === 'down' && "text-red-600 bg-red-50 w-fit px-2 py-1 rounded-full",
                    trend === 'warning' && "text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded-full"
                )}>
                    {trend === 'up' && <ArrowUp className="w-3 h-3" />}
                    {trend === 'down' && <ArrowDown className="w-3 h-3" />}
                    {trend === 'warning' && <Minus className="w-3 h-3" />}
                    <span>
                        {trend === 'up' && '12% Increase'}
                        {trend === 'down' && '5% Decrease'}
                        {trend === 'warning' && 'At Risk'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default StatsCard;
