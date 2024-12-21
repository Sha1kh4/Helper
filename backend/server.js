// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "helper4u_jobs",
});

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Admin Routes
app.post("/api/jobs", async (req, res) => {
  const { title, description, location, salary, contact_email } = req.body;
  try {
    const [result] = await db
      .promise()
      .execute(
        "INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)",
        [title, description, location, salary, contact_email]
      );
    res.json({ success: true, jobId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM jobs");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Candidate Routes
app.post("/api/applications", async (req, res) => {
  const { job_id, candidate_name, contact } = req.body;
  try {
    const [result] = await db
      .promise()
      .execute(
        "INSERT INTO applications (job_id, candidate_name, contact) VALUES (?, ?, ?)",
        [job_id, candidate_name, contact]
      );
    res.json({ success: true, applicationId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ChatGPT Integration
app.post("/api/chat", async (req, res) => {
  const { query } = req.body;
  try {
    // Fetch jobs data to provide context to ChatGPT
    const [jobs] = await db.promise().query("SELECT * FROM jobs");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a job search assistant. Here are the available jobs: ${JSON.stringify(
            jobs
          )}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
