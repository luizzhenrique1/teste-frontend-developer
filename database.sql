-- Script de Criação de Banco de Dados - Projeto Vault


CREATE DATABASE IF NOT EXISTS vault_db;
USE vault_db;

-- Tabela para captura de leads da landing page
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    mensagem TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexação básica para performance em consultas futuras
    INDEX idx_email (email),
    INDEX idx_data (data_envio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
