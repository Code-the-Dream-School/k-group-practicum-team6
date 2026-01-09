const express = require('express');
const app = express();

require('express-async-errors');
require('./config/db.mongo');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authenticateUser = require("./middleware/authentication");

// Routers
const authRouter = require('./routes/auth');
const entriesRouter = require('./routes/entries');

// Error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// To get access to req.body for POST routes
app.use(express.json());

// Security & best‑practice middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/entries', authenticateUser, entriesRouter);

// 404
app.use(notFoundMiddleware);
// Error handler
app.use(errorHandlerMiddleware);


module.exports = app;
