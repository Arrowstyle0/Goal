"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var path = require('path');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express["static"](__dirname)); // MongoDB connection

mongoose.connect('mongodb://127.0.0.1:27017/goal-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Connected to MongoDB successfully');
})["catch"](function (error) {
  console.error('MongoDB connection error:', error);
}); // Goal Schema

var goalSchema = new mongoose.Schema({
  username: String,
  title: String,
  amount: Number,
  date: Date,
  category: {
    type: String,
    "default": 'Personal',
    "enum": ['Personal', 'Career', 'Health', 'Financial']
  },
  status: {
    type: String,
    "default": 'Not Started',
    "enum": ['Not Started', 'In Progress', 'Completed']
  },
  progress: {
    type: Number,
    "default": 0,
    min: 0,
    max: 100
  }
});
var Goal = mongoose.model('Goal', goalSchema); // Routes

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app.html');
});
app.post('/api/goals', function _callee(req, res) {
  var _req$body, username, title, amount, date, goal;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, title = _req$body.title, amount = _req$body.amount, date = _req$body.date;
          goal = new Goal({
            username: username,
            title: title,
            amount: amount,
            date: date
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(goal.save());

        case 5:
          res.status(201).send(goal);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get('/api/goals', function _callee2(req, res) {
  var goals;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Goal.find().sort({
            created: -1
          }));

        case 3:
          goals = _context2.sent;
          res.send(goals);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Improved /api/view-goals route

app.get('/api/view-goals', function (req, res) {
  res.send("\n        <html>\n            <head>\n                <title>Goal Tracker Data</title>\n                <style>\n                    body {\n                        font-family: 'Inter', sans-serif;\n                        background: #1a1a2e;\n                        color: #fff;\n                        padding: 20px;\n                    }\n                    .goal {\n                        background: rgba(255, 255, 255, 0.1);\n                        border-radius: 12px;\n                        padding: 20px;\n                        margin: 15px 0;\n                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n                    }\n                    h1 {\n                        color: #4facfe;\n                        text-align: center;\n                    }\n                    .container {\n                        max-width: 800px;\n                        margin: 0 auto;\n                    }\n                    .time-remaining {\n                        color: #4facfe;\n                        font-weight: 500;\n                    }\n                </style>\n                <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n            </head>\n            <body>\n                <div class=\"container\">\n                    <h1>Stored Goals</h1>\n                    <div id=\"goals\"></div>\n                </div>\n                <script>\n                    function timeRemaining(date) {\n                        const now = new Date();\n                        const target = new Date(date);\n                        const diff = target - now;\n                        \n                        if (diff <= 0) return \"Goal date has passed!\";\n                        \n                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));\n                        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n                        return `${days} days, ${hours} hours remaining`;\n                    }\n\n                    fetch('/api/goals')\n                        .then(res => res.json())\n                        .then(goals => {\n                            document.getElementById('goals').innerHTML = goals.map(goal => `\n                                <div class=\"goal\">\n                                    <h3>${goal.title}</h3>\n                                    <p>By: ${goal.username}</p>\n                                    <p>Amount: $${goal.amount.toLocaleString()}</p>\n                                    <p>Target Date: ${new Date(goal.date).toLocaleString()}</p>\n                                    <p class=\"time-remaining\">${timeRemaining(goal.date)}</p>\n                                </div>\n                            `).join('');\n                        });\n                </script>\n            </body>\n        </html>\n    ");
}); // Get dashboard summary

app.get('/api/dashboard/summary', function _callee3(req, res) {
  var goals, summary;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Goal.find());

        case 3:
          goals = _context3.sent;
          summary = {
            total: goals.length,
            completed: goals.filter(function (g) {
              return g.status === 'Completed';
            }).length,
            inProgress: goals.filter(function (g) {
              return g.status === 'In Progress';
            }).length,
            avgProgress: goals.length > 0 ? Math.round(goals.reduce(function (sum, g) {
              return sum + (g.progress || 0);
            }, 0) / goals.length) : 0
          };
          res.json(summary);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: 'Failed to fetch dashboard summary'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Get goals by category

app.get('/api/dashboard/categories', function _callee4(req, res) {
  var goals, categories;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Goal.find());

        case 3:
          goals = _context4.sent;
          categories = goals.reduce(function (acc, goal) {
            var category = goal.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});
          res.json(categories);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).send(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Add this route after existing routes

app.get('/dashboard/:username', function _callee5(req, res) {
  var username, userGoals;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          username = req.params.username;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Goal.find({
            username: username
          }));

        case 4:
          userGoals = _context5.sent;
          res.send("\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>".concat(username, "'s Dashboard</title>\n            <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n            <script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script>\n            <style>\n                body {\n                    font-family: 'Inter', sans-serif;\n                    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);\n                    color: #fff;\n                    margin: 0;\n                    padding: 20px;\n                }\n\n                .dashboard-container {\n                    max-width: 1200px;\n                    margin: 0 auto;\n                }\n\n                .welcome-header {\n                    text-align: center;\n                    margin-bottom: 2rem;\n                    padding: 2rem;\n                    background: rgba(255, 255, 255, 0.1);\n                    border-radius: 15px;\n                    backdrop-filter: blur(10px);\n                }\n\n                .stats-grid {\n                    display: grid;\n                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n                    gap: 1.5rem;\n                    margin-bottom: 2rem;\n                }\n\n                .stat-card {\n                    background: rgba(255, 255, 255, 0.1);\n                    padding: 1.5rem;\n                    border-radius: 12px;\n                    backdrop-filter: blur(10px);\n                    text-align: center;\n                }\n\n                .stat-value {\n                    font-size: 2rem;\n                    font-weight: 600;\n                    color: #4facfe;\n                }\n\n                .charts-container {\n                    display: grid;\n                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n                    gap: 2rem;\n                    margin-bottom: 2rem;\n                }\n\n                .chart-card {\n                    background: rgba(255, 255, 255, 0.1);\n                    padding: 1.5rem;\n                    border-radius: 12px;\n                    backdrop-filter: blur(10px);\n                }\n\n                .goals-grid {\n                    display: grid;\n                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n                    gap: 1.5rem;\n                }\n\n                .goal-card {\n                    background: rgba(255, 255, 255, 0.1);\n                    padding: 1.5rem;\n                    border-radius: 12px;\n                    backdrop-filter: blur(10px);\n                }\n\n                .progress-bar {\n                    width: 100%;\n                    height: 8px;\n                    background: rgba(255, 255, 255, 0.1);\n                    border-radius: 4px;\n                    margin-top: 1rem;\n                }\n\n                .progress-fill {\n                    height: 100%;\n                    background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);\n                    border-radius: 4px;\n                    transition: width 0.5s ease;\n                }\n\n                @media (max-width: 768px) {\n                    .charts-container {\n                        grid-template-columns: 1fr;\n                    }\n                }\n            </style>\n        </head>\n        <body>\n            <div class=\"dashboard-container\">\n                <div class=\"welcome-header\">\n                    <h1>").concat(username, "'s Goal Dashboard</h1>\n                    <p>Track your progress and achieve your goals</p>\n                </div>\n\n                <div class=\"stats-grid\">\n                    <div class=\"stat-card\">\n                        <h3>Total Goals</h3>\n                        <div class=\"stat-value\" id=\"totalGoals\">0</div>\n                    </div>\n                    <div class=\"stat-card\">\n                        <h3>Completed</h3>\n                        <div class=\"stat-value\" id=\"completedGoals\">0</div>\n                    </div>\n                    <div class=\"stat-card\">\n                        <h3>In Progress</h3>\n                        <div class=\"stat-value\" id=\"inProgressGoals\">0</div>\n                    </div>\n                    <div class=\"stat-card\">\n                        <h3>Success Rate</h3>\n                        <div class=\"stat-value\" id=\"successRate\">0%</div>\n                    </div>\n                </div>\n\n                <div class=\"charts-container\">\n                    <div class=\"chart-card\">\n                        <h3>Goals by Category</h3>\n                        <canvas id=\"categoryChart\"></canvas>\n                    </div>\n                    <div class=\"chart-card\">\n                        <h3>Progress Overview</h3>\n                        <canvas id=\"progressChart\"></canvas>\n                    </div>\n                </div>\n\n                <div class=\"goals-grid\" id=\"goalsGrid\"></div>\n            </div>\n\n            <script>\n                const username = \"").concat(username, "\";\n                const goals = ").concat(JSON.stringify(userGoals), ";\n\n                // Update Stats\n                document.getElementById('totalGoals').textContent = goals.length;\n                document.getElementById('completedGoals').textContent = \n                    goals.filter(g => g.status === 'Completed').length;\n                document.getElementById('inProgressGoals').textContent = \n                    goals.filter(g => g.status === 'In Progress').length;\n                document.getElementById('successRate').textContent = \n                    Math.round((goals.filter(g => g.status === 'Completed').length / goals.length) * 100) + '%';\n\n                // Render Charts\n                const categoryData = goals.reduce((acc, goal) => {\n                    acc[goal.category] = (acc[goal.category] || 0) + 1;\n                    return acc;\n                }, {});\n\n                new Chart(document.getElementById('categoryChart'), {\n                    type: 'doughnut',\n                    data: {\n                        labels: Object.keys(categoryData),\n                        datasets: [{\n                            data: Object.values(categoryData),\n                            backgroundColor: [\n                                '#4facfe', '#00f2fe', '#32CD32', '#FFA07A'\n                            ]\n                        }]\n                    },\n                    options: {\n                        responsive: true,\n                        maintainAspectRatio: false,\n                        plugins: {\n                            legend: {\n                                position: 'bottom',\n                                labels: { color: '#fff' }\n                            }\n                        }\n                    }\n                });\n\n                // Render Goals Grid\n                const goalsGrid = document.getElementById('goalsGrid');\n                goals.forEach(goal => {\n                    const progress = goal.status === 'Completed' ? 100 : \n                        goal.status === 'In Progress' ? 50 : 0;\n                    \n                    goalsGrid.innerHTML += `\n                        <div class=\"goal-card\">\n                            <h3>${goal.title}</h3>\n                            <p>Amount: $${goal.amount.toLocaleString()}</p>\n                            <p>Target Date: ${new Date(goal.date).toLocaleDateString()}</p>\n                            <p>Status: ${goal.status}</p>\n                            <div class=\"progress-bar\">\n                                <div class=\"progress-fill\" style=\"width: ${progress}%\"></div>\n                            </div>\n                        </div>\n                    `;\n                });\n            </script>\n        </body>\n        </html>\n        "));
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});