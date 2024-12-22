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

// ChatGPT Integration using Google Generative AI
app.post("/api/chat", async (req, res) => {
  const { query } = req.body; // Expecting query from the user in the request body
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
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    // Send the message (user query) to the AI model
    const result = await chatSession.sendMessage(query);

    // Log the result for debugging purposes
    console.log(result.response.text());

    // Send the AI's response back to the client
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
