
USE helper4u_jobs;

CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    salary VARCHAR(100),
    contact_email VARCHAR(255)
);

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    candidate_name VARCHAR(255),
    contact VARCHAR(255),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);


---add dummy data from chatgpt---
--@block
INSERT INTO jobs (title, description, location, salary, contact_email)
VALUES 
('Frontend Developer', 'Develop and maintain React.js applications.', 'New York', '100k', 'frontend@example.com'),
('Backend Developer', 'Build RESTful APIs and work on server-side logic.', 'San Francisco', '120k', 'backend@example.com'),
('Full Stack Developer', 'Work on both frontend and backend technologies.', 'Remote', '110k', 'fullstack@example.com'),
('Data Analyst', 'Analyze data and create insightful reports.', 'Chicago', '90k', 'data@example.com'),
('DevOps Engineer', 'Implement CI/CD pipelines and manage cloud infrastructure.', 'Austin', '130k', 'devops@example.com');
INSERT INTO applications (job_id, candidate_name, contact)
VALUES 
(1, 'Alice Johnson', 'alice.johnson@example.com'),
(2, 'Bob Smith', 'bob.smith@example.com'),
(3, 'Charlie Brown', 'charlie.brown@example.com'),
(1, 'Diana Prince', 'diana.prince@example.com'),
(4, 'Ethan Hunt', 'ethan.hunt@example.com');
