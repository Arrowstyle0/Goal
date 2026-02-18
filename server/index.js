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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
