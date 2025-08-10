const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://aabhanshsriv8676:mongodbarrow@cluster0.ncbcuju.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve the front-end application from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route to serve app.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// Goal Schema
const goalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    title: {
        type: String,
        required: [true, 'Goal title is required']
    },
    date: {
        type: Date,
        required: [true, 'Target date is required']
    },
    category: {
        type: String,
        default: 'Personal'
    },
    status: {
        type: String,
        default: 'Not Started'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

// Routes for the API
app.post('/api/goals', async (req, res) => {
    try {
        const goal = new Goal(req.body);
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating goal',
            error: error.message 
        });
    }
});

app.get('/api/goals', async (req, res) => {
    try {
        const goals = await Goal.find().sort('-createdAt');
        res.json(goals);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching goals',
            error: error.message 
        });
    }
});

app.get('/api/dashboard/summary', async (req, res) => {
    try {
        const goals = await Goal.find();
        const summary = {
            total: goals.length,
            completed: goals.filter(g => g.status === 'Completed').length,
            inProgress: goals.filter(g => g.status === 'In Progress').length,
            avgProgress: goals.length > 0 ? 
                Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0
        };
        res.json(summary);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching summary',
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});