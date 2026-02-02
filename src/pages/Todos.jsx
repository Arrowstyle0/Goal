import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TodoList from '../components/dashboard/TodoList';

const Todos = () => {
    const { username } = useOutletContext();
    return (
        <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">To-Do List</h2>
                <p className="text-slate-500">Manage your daily tasks and stay productive.</p>
            </div>

            <div className="h-full">
                <TodoList username={username} />
            </div>
        </div>
    );
};

export default Todos;
