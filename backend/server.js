// Require express
const express = require('express');

const path = require("path");

// Morgan logger middleware
const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

// Load environment variables ENV
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// Database connection
const db = require("./db/dbConnection");
// Connect to database
db();

// Create an express app
const app = express();

// Enable CORS
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Body parser middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Log requests to the console
const devMode = process.env.NODE_ENV;
devMode === "development"? app.use(morgan("dev")): console.log(`Mode: Orhter envirmont`);


// Routes
const AuthRoutes = require("./routes/authRoutes");

// Mount routes
app.use('/api/auth', AuthRoutes);

// Serve static files from the React app
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}
// PORT & Start server on port
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Handle rejection errors outside of express
process.on("unhandledRejection", (err) => {
    console.log(`unhandledRejection Errors: ${err.message} ${err.name}`);
    server.close(() => {
        console.log(`Shutting down..`);
        process.exit(1);
    });
});

module.exports = app;