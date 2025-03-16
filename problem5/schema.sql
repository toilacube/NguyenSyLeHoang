CREATE DATABASE IF NOT EXISTS coding_challenges;

USE coding_challenges;

CREATE TABLE IF NOT EXISTS challenges (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'medium',
    tags JSON NOT NULL DEFAULT ('[]'),
    sampleSolution TEXT,
    testCases TEXT,
    isActive BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)
