<?php
/**
 * Script de Processamento de Leads - Projeto Vault
 * Este script demonstra o uso de PHP moderno com PDO e Prepared Statements.
 * 
 * Foco: Segurança (Proteção contra SQL Injection), Sanitização e Performance.
 */

// Configurações de conexão (demonstrativo)
$host = 'localhost';
$dbname = 'vault_db';
$username = 'root';
$password = '';

// Cabeçalhos para resposta JSON
header('Content-Type: application/json; charset=utf-8');

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
    exit;
}

try {
    // Instanciando conexão via PDO com tratamento de erros
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Coleta e sanitização básica de dados
    $nome     = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
    $email    = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS);

    // Validação de campos obrigatórios
    if (!$nome || !$email || !$telefone) {
        throw new Exception("Campos obrigatórios inválidos ou ausentes.");
    }

    // Preparação da Query para inserção segura (Prepared Statement)
    $sql = "INSERT INTO leads (nome, email, telefone, mensagem) VALUES (:nome, :email, :telefone, :mensagem)";
    $stmt = $pdo->prepare($sql);

    // Execução vinculando os parâmetros (previne SQL Injection)
    $stmt->execute([
        ':nome'     => $nome,
        ':email'    => $email,
        ':telefone' => $telefone,
        ':mensagem' => $mensagem
    ]);

    // Resposta de sucesso
    echo json_encode([
        'status' => 'success',
        'message' => 'Lead capturado com sucesso!',
        'id' => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    // Log do erro real (em produção, salve em um log file, não exiba ao usuário)
    error_log($e->getMessage());
    
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erro interno de servidor']);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
