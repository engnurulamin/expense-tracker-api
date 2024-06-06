const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const authRouter = require("./routers/authRouter");
const balanceRouter = require("./routers/balanceRouter");
const expenseRouter = require("./routers/expenseRouter");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
app.use(morgan("dev"));

app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/balance", balanceRouter);
app.use("/api/expense", expenseRouter);

// Rate limiting
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use("/api", rateLimiter);

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

// Route not found error handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

module.exports = app;
