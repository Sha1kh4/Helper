// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config();

// Initialize the app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "helper4u_jobs",
});

// Check database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

// Admin Routes

/**
 * Create a new job posting.
 * Request body: { title, description, location, salary, contact_email }
 */
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
    console.error("Error adding job:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all job postings.
 * Response: Array of jobs
 */
app.get("/api/jobs", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM jobs");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Candidate Routes

/**
 * Submit a job application.
 * Request body: { job_id, candidate_name, contact }
 */
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
    console.error("Error adding application:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ChatGPT Integration using Google Generative AI

/**
 * Query jobs using natural language.
 * Request body: { query }
 */
app.post("/api/chat", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1.85,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Fetch jobs data from the database
    const [jobs] = await db
      .promise()
      .query("SELECT id, title, location, description FROM jobs;");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: "No jobs found." });
    }

    let prompt;

    // Determine the type of query: job suggestion or job details by ID
    if (query.toLowerCase().includes("job id")) {
      const jobId = query.match(/\d+/)?.[0]; // Extract job ID from the query
      const job = jobs.find((j) => j.id === parseInt(jobId));

      if (!job) {
        return res
          .status(404)
          .json({ error: `No job found with ID ${jobId}.` });
      }

      prompt = `Provide details about the following job: Title: ${job.title}, Location: ${job.location}, Description: ${job.description}`;
    } else {
      prompt = `You are a job search assistant. Suggest suitable jobs for the following query: "${query}". Here is the list of available jobs: ${JSON.stringify(
        jobs
      )}`;
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(query);

    // Log the result for debugging
    console.log("AI Response:", result.response.text());

    // Send the AI's response back to the client
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error in chat API:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
