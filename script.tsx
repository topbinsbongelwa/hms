import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "hms_db",
});

pool.connect()
  .then(() => console.log(" Connected to PostgreSQL"))
  .catch(err => console.error(" DB Connection Error", err));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import patientRoutes from "./routes/patients";
import doctorRoutes from "./routes/doctors";
import appointmentRoutes from "./routes/appointments";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send(" Health Management System API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:http://127.0.0.1:5500/`);
});
