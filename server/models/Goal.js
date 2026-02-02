import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    title: {
        type: String,
        required: [true, 'Goal title is required']
    },
    description: String,
    date: {
        type: Date,
        required: [true, 'Target date is required']
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
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

export default mongoose.model('Goal', goalSchema);
