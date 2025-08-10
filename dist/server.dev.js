"use strict";

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

var path = require('path');

var app = express();
app.use(cors()); // MongoDB connection

mongoose.connect('mongodb+srv://aabhanshsriv8676:mongodbarrow@cluster0.ncbcuju.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Connected to MongoDB successfully');
})["catch"](function (error) {
  console.error('MongoDB connection error:', error);
}); // Middleware

app.use(cors());
app.use(express.json()); // Serve the front-end application

app.use(express["static"](path.join(__dirname, 'public'))); // Goal Schema

var goalSchema = new mongoose.Schema({
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
    "default": 'Personal'
  },
  status: {
    type: String,
    "default": 'Not Started'
  },
  progress: {
    type: Number,
    "default": 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});
var Goal = mongoose.model('Goal', goalSchema); // Routes

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
}); // Create a new goal

app.post('/api/goals', function _callee(req, res) {
  var goal;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          goal = new Goal(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(goal.save());

        case 4:
          res.status(201).json(goal);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: 'Error creating goal',
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Get all goals

app.get('/api/goals', function _callee2(req, res) {
  var goals;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Goal.find().sort('-createdAt'));

        case 3:
          goals = _context2.sent;
          res.json(goals);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: 'Error fetching goals',
            error: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Dashboard summary

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
              return sum + g.progress;
            }, 0) / goals.length) : 0
          };
          res.json(summary);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Error fetching summary',
            error: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});