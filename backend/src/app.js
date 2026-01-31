const express = require("express");
const app = express();

require("express-async-errors");
require("./config/db.mongo");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const cookieParser = require("cookie-parser");

const authenticateUser = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const entriesRouter = require("./routes/entries");
const analyticsRouter = require("./routes/analytics");

// Error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");



// To get access to req.body for POST routes
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Security & best‑practice middleware
app.use(helmet());
app.use(morgan("dev"));

// Set CORS to allow for mobile also
const allowedOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",")
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // mobile/native requests (because we dont have origin on mobile)
      if (!origin) return callback(null, true);

      // allow the web origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Deny
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/entries", authenticateUser, entriesRouter);
app.use("/api/v1/analytics", authenticateUser, analyticsRouter);

// 404
app.use(notFoundMiddleware);
// Error handler
app.use(errorHandlerMiddleware);

module.exports = app;