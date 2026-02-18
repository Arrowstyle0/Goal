# Goal Tracker App

This is the Goal Tracker application, a full-stack app for managing goals, todos, and dashboard statistics.

## Project Overview

The Goal Tracker App is designed to help users organize their objectives and daily tasks efficiently. It features a clean, intuitive interface for:

-   **Goal Management**: Create, update, and track long-term goals with deadlines and status updates.
-   **Todo List**: Manage daily tasks with a simple checkbox interface.
-   **Dashboard Analytics**: Visualize progress with real-time statistics and a 7-day activity history.
-   **Responsive Design**: A seamless experience across desktop and mobile devices.

Built with **React** on the frontend and **Node.js/Express** on the backend, it utilizes **MongoDB** for persistent data storage.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb://localhost:27017/goal-tracker
    PORT=3001
    ```

## Usage

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3001` (or your configured PORT).

## API Endpoints

All endpoints expect JSON bodies where applicable.

### Goals

-   **GET /api/goals?username={username}**
    -   Fetch all goals for a specific username.
-   **POST /api/goals**
    -   Create a new goal.
    -   Body: `{ username, title, description, deadline, status }`
-   **PUT /api/goals/:id**
    -   Update a goal by ID.
    -   Body: `{ title, description, deadline, status }`
-   **DELETE /api/goals/:id**
    -   Delete a goal by ID.

### Todos

-   **GET /api/todos?username={username}**
    -   Fetch all todos for a specific username.
-   **POST /api/todos**
    -   Create a new todo.
    -   Body: `{ username, text, completed }`
-   **PUT /api/todos/:id**
    -   Update a todo by ID.
    -   Body: `{ text, completed }`
-   **DELETE /api/todos/:id**
    -   Delete a todo by ID.

### Dashboard

-   **GET /api/dashboard/stats?username={username}**
    -   Get summary statistics (total/completed goals and todos).
-   **GET /api/dashboard/history?username={username}**
    -   Get activity history for the last 7 days.

## Imports Used

The backend uses the following main packages:

-   `express`: Web framework for Node.js.
-   `mongoose`: MongoDB object modeling.
-   `cors`: Middleware to enable Cross-Origin Resource Sharing.
-   `dotenv`: JSON Web Token authentication (configured but implementation details may vary).

## Project Structure

```
├── models/         # Mongoose models (Goal.js, Todo.js)
├── server/         # Server entry point
│   └── index.js
├── .env            # Environment variables
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
```
