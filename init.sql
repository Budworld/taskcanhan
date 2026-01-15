USE taskcanhandb;

CREATE TABLE Tasks (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Description TEXT,
    IsCompleted BOOLEAN,
    CreatedAt DATETIME,
    DueDate DATETIME
);

INSERT INTO Tasks (Title, Description, IsCompleted, CreatedAt, DueDate)
VALUES
('Task mẫu 1', 'Mô tả task 1', false, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY)),
('Task mẫu 2', 'Mô tả task 2', true, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 1 DAY));
