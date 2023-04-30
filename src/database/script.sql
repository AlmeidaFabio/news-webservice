CREATE DATABASE newsdb;

USE newsdb;

DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id INT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY AUTOINCREMENT id
);

INSERT INTO authors (name, email, password) VALUES 
('Bonner W.', 'bonner@teste.com', '1234'),
('Vasconcelos R.', 'vasco@teste.com', '1234'),
('Tramontina', 'tramontina@teste.com', '1234'),
('Datena L.', 'datena@teste.com', '1234');


CREATE TABLE news (
  id INT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  PRIMARY KEY AUTOINCREMENT id,
  FOREIGN KEY (author_id) REFERENCES authors (id)
);

INSERT INTO news (title, content, author_id) VALUES
('Notícia 1', 'Conteúdo da notícia 1', 1),
('Notícia 2', 'Conteúdo da notícia 2', 2),
('Notícia 3', 'Conteúdo da notícia 3', 3),
('Notícia 4', 'Conteúdo da notícia 4', 1),
('Notícia 5', 'Conteúdo da notícia 5', 2),
('Notícia 6', 'Conteúdo da notícia 6', 4),
('Notícia 7', 'Conteúdo da notícia 7', 1),
('Notícia 8', 'Conteúdo da notícia 8', 2),
('Notícia 9', 'Conteúdo da notícia 9', 3),
('Notícia 10', 'Conteúdo da notícia 10', 1);
