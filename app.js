require("dotenv/config");

require("./db");

const express = require("express");

const { isAuthenticated } = require('./middleware/jwt.middleware')

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const  authRouter = require('./routes/auth.routes');
app.use("/auth", authRouter);

const cityRouter = require('./routes/city.routes')
app.use('/api', isAuthenticated, cityRouter)

// const destinationRouter = require('./routes/destination.routes')
// app.use('/api', isAuthenticated, destinationRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
