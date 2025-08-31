CREATE DATABASE IF NOT EXISTS db_treinos
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE db_treinos;

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,id
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    nivel VARCHAR(50)
);

CREATE TABLE Exercicios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_exercicio VARCHAR(100) NOT NULL UNIQUE,
    url_video_demonstrativo VARCHAR(255) NULL
);

CREATE TABLE Planos_Treino (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_plano VARCHAR(150) NOT NULL,
    tipo_treino VARCHAR(50),
    descricao TEXT NULL
);

CREATE TABLE Treino_Detalhes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_plano_treino INT NOT NULL,
    id_exercicio INT NOT NULL,
    dia_treino VARCHAR(50) NOT NULL,
    ordem INT NOT NULL,
    series VARCHAR(10) NOT NULL,
    repeticoes VARCHAR(20) NOT NULL,
    descanso_segundos INT,
    FOREIGN KEY (id_plano_treino) REFERENCES Planos_Treino(id) ON DELETE CASCADE,
    FOREIGN KEY (id_exercicio) REFERENCES Exercicios(id) ON DELETE CASCADE
);