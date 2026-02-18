import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Square } from 'lucide-react';
import clsx from 'clsx';

const TodoList = ({ username }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        if (!username) return;
        try {
            const response = await fetch(`/api/todos?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setTodos(data);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [username]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, text: newTodo.trim() }),
            });
            if (response.ok) {
                setNewTodo('');
                fetchTodos();
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id, currentStatus) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !currentStatus }),
            });
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="font-semibold text-slate-900 mb-4">Quick To-Do</h3>

            <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {todos.length === 0 ? (
                    <div className="text-center text-slate-400 py-4 text-xs">No tasks yet</div>
                ) : (
                    todos.map(todo => (
                        <div key={todo._id} className="group flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                            <button
                                onClick={() => toggleTodo(todo._id, todo.completed)}
                                className={clsx(
                                    "w-5 h-5 rounded flex items-center justify-center border transition-all",
                                    todo.completed ? "bg-blue-500 border-blue-500 text-white" : "border-slate-300 text-transparent hover:border-blue-400"
                                )}
                            >
                                <Check className="w-3 h-3" />
                            </button>
                            <span className={clsx("flex-1 text-sm transition-all", todo.completed ? "text-slate-400 line-through" : "text-slate-700")}>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
