-- Create the database

CREATE DATABASE IF NOT EXISTS helper4u_jobs;

-- Use the database
USE helper4u_jobs;
DROP TABLE IF EXISTS jobs, applications;

-- Create jobs table
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    salary VARCHAR(100),
    contact_email VARCHAR(255)
);

-- Create applications table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    candidate_name VARCHAR(255),
    contact VARCHAR(255),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);
INSERT INTO jobs (title, description, location, salary, contact_email)
VALUES
('Front-End Engineer (React JS/ & Tikz/PGF)', 'We are seeking an experienced React JS/TS and Tikz/PGF Developer to build innovative UIs and advanced visualizations for U.S.-based clients. This role involves creating scalable, high-performance web applications in a collaborative, fast-paced environment. Turing is the world’s first AI-powered tech services company, redefining the industry with AI-vetted talent, accelerated development, and innovative solutions. Recognized globally, Turing supports 900+ clients and a network of over three million developers, delivering cutting-edge software and AI technologies.', 'Mumbai', '225000', 'example@example.com'),

('Sr. Web Designer', 'Join Our Team as a Sr. WEB Designer! Urgent Hiring!! Walk-in Interview!! No Remote Work!! NO Intern\'s!! NO Fresher!! Interview Date: WALK IN INTERVIEW on 21th - 23rd DEC (Timing 11am - 2pm). Required minimum 1 year experience. Implement responsive front-end interfaces using HTML, CSS, JavaScript, jQuery, React JS and Bootstrap. Troubleshoot and develop and fix bugs in web designing. Assist with testing for functionality, performance, and security.', 'Vashi, Navi Mumbai', '25000', 'example@example.com'),

('Applications Developer', 'Should have excellent knowledge on JAVA and Java Script. Should have good knowledge of Oracle Database, Web logic, and Kafka. Any Product Development knowledge is an added advantage. Able to analyse the requirement, can design with the help from leads, writes code, troubleshoot and debug if required. Should be good team member.', 'Mumbai', '783625', 'example@example.com'),

('Team Member- Digital-Support Services-Digital', 'Salesforce Developer Roles & Responsibilities. Qualification: B Tech/BE/MTech/MCA/MSc or related engineering discipline. Experience: 2-5+ Years. Immediate Joining. Collaborating with Salesforce Administrator to validate business requirements and any considerations. Developing Flows, Apex Classes, and Triggers, as well as test classes for all custom development and DevOps. Custom user interface development including Visualforce pages/Lightning pages.', 'Thāne', '436500', 'example@example.com'),

('Jr. Python Developer', 'As a Junior Python Developer, you will work closely with our senior developers and project managers to design, develop, and maintain Python-based applications. You will have the opportunity to learn and grow your skills in a supportive and collaborative environment. Assist in the development, testing, and maintenance of software applications using Python. Collaborate with team members to define project requirements and specifications.', 'Mumbai', '420000', 'example@example.com'),

('Full Stack Developer', 'We are looking for a highly skilled Full Stack Developer to build and maintain scalable applications. You will work with the team to design, implement, and maintain both front-end and back-end components. Proficiency in JavaScript, React, Node.js, and database management is essential.', 'Bengaluru', '600000', 'example@example.com'),

('Data Scientist', 'The Data Scientist will be responsible for analyzing large datasets and applying statistical models to solve business problems. You will work with cross-functional teams to derive insights from data and help in decision-making processes. Strong skills in Python, R, SQL, and machine learning are required.', 'Chennai', '850000', 'example@example.com'),

('UI/UX Designer', 'Looking for an experienced UI/UX Designer to create visually appealing and user-friendly designs. You will be responsible for creating wireframes, prototypes, and design assets for web and mobile applications. Experience with design tools such as Figma, Sketch, and Adobe XD is required.', 'Pune', '500000', 'example@example.com'),

('Mobile App Developer', 'We are seeking a skilled Mobile App Developer to join our team and develop innovative mobile applications. You will work with cross-functional teams to design, build, and maintain mobile apps for iOS and Android platforms. Expertise in React Native and Kotlin/Swift is a plus.', 'Hyderabad', '700000', 'example@example.com'),

('Software Engineer (Java)', 'We are looking for a talented Java Software Engineer to develop high-quality applications. You will work on backend systems and microservices. Proficiency in Java, Spring Boot, and REST APIs is required. Experience with cloud technologies such as AWS or Azure is a plus.', 'Mumbai', '800000', 'example@example.com'),

('Backend Developer (Node.js)', 'The Backend Developer will work closely with the product team to build scalable backend systems using Node.js and Express. You will be responsible for integrating with databases and external APIs. Experience with MongoDB, Docker, and cloud services is a must.', 'Delhi', '750000', 'example@example.com'),

('DevOps Engineer', 'We are looking for a DevOps Engineer to join our team to manage and streamline our infrastructure and deployment pipelines. The role involves automating system configurations, deployment processes, and managing cloud infrastructure. Experience with tools like Jenkins, Kubernetes, and AWS is essential.', 'Bengaluru', '950000', 'example@example.com'),

('Business Analyst', 'We are looking for a Business Analyst to help improve business processes through technology. You will gather and analyze data, create reports, and work closely with stakeholders to develop technical solutions. A strong understanding of Agile methodologies and data analysis tools is required.', 'Chennai', '600000', 'example@example.com'),

('IT Support Specialist', 'The IT Support Specialist will be responsible for providing technical support and troubleshooting issues related to hardware, software, and network systems. Experience in diagnosing and resolving computer issues, as well as excellent customer service skills, is necessary.', 'Kolkata', '400000', 'example@example.com'),

('Project Manager (Software)', 'We are looking for a Project Manager to lead a team of developers in delivering high-quality software products. You will be responsible for planning, executing, and monitoring projects. Strong skills in Agile methodologies, resource management, and project tracking tools like Jira are needed.', 'Gurugram', '1100000', 'example@example.com');



-- Insert dummy data into applications table
INSERT INTO applications (job_id, candidate_name, contact)
VALUES 
(1, 'Alice Johnson', 'alice.johnson@example.com'),
(2, 'Bob Smith', 'bob.smith@example.com'),
(3, 'Charlie Brown', 'charlie.brown@example.com'),
(1, 'Diana Prince', 'diana.prince@example.com'),
(4, 'Ethan Hunt', 'ethan.hunt@example.com');

SELECT * FROM jobs;