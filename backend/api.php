<?php
header('Content-Type: application/json');
include 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $preco = $_POST['preco'];
    $sql = "INSERT INTO produtos (nome, descricao, preco) VALUES ('$nome', '$descricao', '$preco')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Produto adicionado com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro: " . $conn->error]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM produtos";
    $result = $conn->query($sql);
    $produtos = [];
    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
    echo json_encode($produtos);
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'];
    $nome = $_PUT['nome'];
    $descricao = $_PUT['descricao'];
    $preco = $_PUT['preco'];
    $sql = "UPDATE produtos SET nome='$nome', descricao='$descricao', preco='$preco' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Produto atualizado com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro: " . $conn->error]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];
    $sql = "DELETE FROM produtos WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Produto excluído com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro: " . $conn->error]);
    }
}

$conn->close();
?>