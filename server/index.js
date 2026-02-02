import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Goal from './models/Goal.js';
import Todo from './models/Todo.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

const app = express();

if (!MONGODB_URI) {
    console.warn('Warning: MONGODB_URI is not defined in .env file');
}

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// --- GOALS ---
app.get('/api/goals', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ error: 'Username required' });
        const goals = await Goal.find({ username }).sort({ createdAt: -1 });
        res.json(goals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/goals', async (req, res) => {
    try {
        const goal = new Goal(req.body);
        await goal.save();
        res.status(201).json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/goals/:id', async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Goal deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/goals/:id', async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- TODOS ---
app.get('/api/todos', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ error: 'Username required' });
        const todos = await Todo.find({ username }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DASHBOARD STATS ---
app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ error: 'Username required' });

        const totalGoals = await Goal.countDocuments({ username });
        const completedGoals = await Goal.countDocuments({ username, status: 'Completed' });
        const inProgressGoals = await Goal.countDocuments({ username, status: 'In Progress' });
        
        const totalTodos = await Todo.countDocuments({ username });
        const pendingTodos = await Todo.countDocuments({ username, completed: false });
        const completedTodos = await Todo.countDocuments({ username, completed: true });

        res.json({
            goals: {
                total: totalGoals,
                completed: completedGoals,
                inProgress: inProgressGoals
            },
            todos: {
                total: totalTodos,
                pending: pendingTodos,
                completed: completedTodos
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/dashboard/history', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ error: 'Username required' });

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);

        // Fetch items modified in the last 7 days
        const goals = await Goal.find({ 
            username, 
            updatedAt: { $gte: startDate } 
        });
        
        const todos = await Todo.find({ 
            username, 
            updatedAt: { $gte: startDate } 
        });

        // Generate array of last 7 dates
        const history = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

            // Count activity for this day
            // We count 'goals' as goals updated/created this day
            // We count 'tasks' as todos updated/created this day
            const goalsCount = goals.filter(g => new Date(g.updatedAt).toISOString().split('T')[0] === dateStr).length;
            const tasksCount = todos.filter(t => new Date(t.updatedAt).toISOString().split('T')[0] === dateStr).length;

            history.unshift({
                name: dayName,
                goals: goalsCount,
                tasks: tasksCount
            });
        }

        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
