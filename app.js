require("dotenv/config");

require("./db");

const express = require("express");

const { isAuthenticated } = require('./middleware/jwt.middleware')

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const  authRouter = require('./routes/auth.routes');
app.use("/auth", authRouter);

const destinationRoutes = require('./routes/destination.routes');
app.use("/api", isAuthenticated, destinationRoutes);

const cityRouter = require('./routes/city.routes')
app.use('/api', isAuthenticated, cityRouter);

const userCityRouter = require('./routes/userCity.routes')
app.use("/api", isAuthenticated, userCityRouter);

const userDestinationRouter = require('./routes/userDestination.routes')
app.use("/api", isAuthenticated, userDestinationRouter)

require("./error-handling")(app);

module.exports = app;
