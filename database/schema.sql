-- ============================================================
-- Update Portfolio Data for Aditya Nath
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Drop and recreate tables cleanly
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS profile;

CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    title VARCHAR(150),
    tagline VARCHAR(255),
    about TEXT,
    email VARCHAR(100),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    photo_url VARCHAR(255),
    resume_url VARCHAR(255)
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    level INT DEFAULT 80,
    icon_class VARCHAR(50)
);

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Aditya Nath Profile ─────────────────────────────────────
INSERT INTO profile (name, title, tagline, about, email, github_url, linkedin_url, photo_url) VALUES (
    'Aditya Nath',
    'II Sem BSc Data Science Student',
    'Passionate about technology, data & building things for the web.',
    'Aditya Nath is a 19-year-old data science student with a strong interest in technology and problem-solving. Passionate about web development and programming, he is constantly learning and building skills to grow in the tech field.',
    'nathaditya006@gmail.com',
    'https://github.com/adityaNath',
    'https://linkedin.com/in/adityaNath',
    ''
);

-- ─── Skills ──────────────────────────────────────────────────
INSERT INTO skills (name, category, level, icon_class) VALUES
('Node.js',  'Backend',  78, 'fab fa-node-js'),
('HTML5',    'Frontend', 90, 'fab fa-html5'),
('CSS3',     'Frontend', 85, 'fab fa-css3-alt'),
('JavaScript','Frontend',80, 'fab fa-js-square'),
('MySQL',    'Database', 75, 'fas fa-database'),
('GitHub',   'Tools',    88, 'fab fa-github');
