# Helper4U Jobs API

This project is a job management and application platform powered by Node.js, Express, MySQL, and Google Generative AI. It provides features for managing job postings, accepting applications, and assisting users with job-related queries using AI.

## Features

- **Admin**:

  - Add new job postings.
  - View all job postings.

- **Candidates**:

  - Apply for jobs.

- **ChatGPT Integration**:
  - Query jobs by description or ID using Google Generative AI.

---

## Requirements

- Node.js (v14+ recommended)
- MySQL
- Google Generative AI API Key

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository_url>
cd helper4u-jobs
```


### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=helper4u_jobs
PORT=3001
GEMINI_API_KEY=your_google_generative_ai_api_key
```

### 4. Set Up the Database

1. Log into your MySQL database:
   ```bash
   mysql -u root -p
   ```
2. Create a new database:
   ```sql
   CREATE DATABASE helper4u_jobs;
   ```
3. Use the following schema to set up the tables:

   ```sql
   CREATE TABLE jobs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       location VARCHAR(255) NOT NULL,
       salary DECIMAL(10, 2),
       contact_email VARCHAR(255)
   );

   CREATE TABLE applications (
       id INT AUTO_INCREMENT PRIMARY KEY,
       job_id INT NOT NULL,
       candidate_name VARCHAR(255) NOT NULL,
       contact VARCHAR(255) NOT NULL,
       FOREIGN KEY (job_id) REFERENCES jobs(id)
   );
   ```

### 5. Start the Server with Nodemon

Install `nodemon` globally if not already installed:

```bash
npm install -g nodemon
```

Run the server:

```bash
nodemon server.js
```

---

## API Endpoints

### Admin

1. **Add a Job**

   - `POST /api/jobs`
   - **Body**: `{ "title": "string", "description": "string", "location": "string", "salary": "number", "contact_email": "string" }`

2. **Get All Jobs**
   - `GET /api/jobs`

### Candidates

1. **Apply for a Job**
   - `POST /api/applications`
   - **Body**: `{ "job_id": "number", "candidate_name": "string", "contact": "string" }`

### ChatGPT Integration

1. **Query Jobs**
   - `POST /api/chat`
   - **Body**: `{ "query": "string" }`

---

## Logs & Debugging

Logs from Google Generative AI responses are printed in the console. Use this to debug issues with AI queries.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author

**Shaikh Adnan**
[Portfolio](https://sha1kh4.me) | [Resume](https://sha1kh4.me/resume)
````
