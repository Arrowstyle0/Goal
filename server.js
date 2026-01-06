const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
=======
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

app.use(cors()); // opens CORS for all routes during dev — tighten in prod
app.use(express.json());
app.use(express.static(__dirname));
>>>>>>> b940e8b1addeb2c1c2bca11a09d4e79c653462fa

// MongoDB connection
mongoose.connect(MONGODB_URI, {
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
<<<<<<< HEAD
=======

// Add this route after existing routes
app.get('/dashboard/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const userGoals = await Goal.find({ username });
        
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${username}'s Dashboard</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
                    color: #fff;
                    margin: 0;
                    padding: 20px;
                }

                .dashboard-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .welcome-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 1.5rem;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                    text-align: center;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #4facfe;
                }

                .charts-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }

                .chart-card {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 1.5rem;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                }

                .goals-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .goal-card {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 1.5rem;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                }

                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    margin-top: 1rem;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }

                @media (max-width: 768px) {
                    .charts-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>
        <body>
            <div class="dashboard-container">
                <div class="welcome-header">
                    <h1>${username}'s Goal Dashboard</h1>
                    <p>Track your progress and achieve your goals</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Goals</h3>
                        <div class="stat-value" id="totalGoals">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Completed</h3>
                        <div class="stat-value" id="completedGoals">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>In Progress</h3>
                        <div class="stat-value" id="inProgressGoals">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Success Rate</h3>
                        <div class="stat-value" id="successRate">0%</div>
                    </div>
                </div>

                <div class="charts-container">
                    <div class="chart-card">
                        <h3>Goals by Category</h3>
                        <canvas id="categoryChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>Progress Overview</h3>
                        <canvas id="progressChart"></canvas>
                    </div>
                </div>

                <div class="goals-grid" id="goalsGrid"></div>
            </div>

            <script>
                const username = "${username}";
                const goals = ${JSON.stringify(userGoals)};

                // Update Stats
                document.getElementById('totalGoals').textContent = goals.length;
                document.getElementById('completedGoals').textContent = 
                    goals.filter(g => g.status === 'Completed').length;
                document.getElementById('inProgressGoals').textContent = 
                    goals.filter(g => g.status === 'In Progress').length;
                document.getElementById('successRate').textContent = 
                    Math.round((goals.filter(g => g.status === 'Completed').length / goals.length) * 100) + '%';

                // Render Charts
                const categoryData = goals.reduce((acc, goal) => {
                    acc[goal.category] = (acc[goal.category] || 0) + 1;
                    return acc;
                }, {});

                new Chart(document.getElementById('categoryChart'), {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(categoryData),
                        datasets: [{
                            data: Object.values(categoryData),
                            backgroundColor: [
                                '#4facfe', '#00f2fe', '#32CD32', '#FFA07A'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { color: '#fff' }
                            }
                        }
                    }
                });

                // Render Goals Grid
                const goalsGrid = document.getElementById('goalsGrid');
                goals.forEach(goal => {
                    const progress = goal.status === 'Completed' ? 100 : 
                        goal.status === 'In Progress' ? 50 : 0;
                    
                    goalsGrid.innerHTML += \`
                        <div class="goal-card">
                            <h3>\${goal.title}</h3>
                            <p>Amount: $\${goal.amount.toLocaleString()}</p>
                            <p>Target Date: \${new Date(goal.date).toLocaleDateString()}</p>
                            <p>Status: \${goal.status}</p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: \${progress}%"></div>
                            </div>
                        </div>
                    \`;
                });
            </script>
        </body>
        </html>
        `);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> b940e8b1addeb2c1c2bca11a09d4e79c653462fa
