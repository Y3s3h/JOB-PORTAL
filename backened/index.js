import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",

    "https://mern-azure-jobportal-chadgheweteyded3.westeurope-01.azurewebsites.net",
  ],
  credentials: true,
}; //mern-azure-jobportal-chadgheweteyded3.westeurope-01.azurewebsites.net
app.use(cors(corsOptions));

// Routes
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I'm coming from the backend",
    success: true,
  });
});

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
// Connect to the database first

//for azure service   commands

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontened/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontened/dist", "index.html"));
});

connectDB()
  .then(() => {
    // Start the server only after a successful DB connection
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server started at port no: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
