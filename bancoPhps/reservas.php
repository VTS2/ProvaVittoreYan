<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include 'conexao.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM reservas");
    $stmt->execute();
    $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reservas);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nomeCliente = $_POST['nomeCliente'];
    $numero = $_POST['numero'];
    $checkIn = $_POST['checkIn'];
    $checkOut = $_POST['checkOut'];

    $stmt = $conn->prepare("INSERT INTO reservas (nomeCliente, numero, checkIn, checkOut) VALUES (:nomeCliente, :numero, :check_in, :checkOut)");
    $stmt->bindParam(':nomeCliente', $nomeCliente);
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':checkIn', $checkIn);
    $stmt->bindParam(':checkOut', $checkOut);

    if ($stmt->execute()) {
        echo "reserva criado com sucesso!!";
    } else {
        echo "Erro ao criar reserva";
    }
}

if($_SERVER['REQUEST_METHOD']==='DELETE' && isset($_GET['id'])){
    $id   = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM reservas WHERE id = :id");
    $stmt-> bindParam(':id', $id);

    if($stmt->execute()){
        echo "reserva excluido com sucesso!!!";
    } else {
        echo "Erro ao excluir reserva!";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_GET['id'];
    $novoNomeCliente = $_PUT['nomeCliente'];
    $novoNumero = $_PUT['numero'];
    $novoCheckIn = $_PUT['checkIn'];
    $novoCheckOut = $_PUT['checkOut'];
    $stmt = $conn->prepare("UPDATE reservas SET nomeCliente = :nomeCliente, numero = :numero, checkIn = :checkIn, check_out = :check_out WHERE id = :id");
    $stmt->bindParam(':nomeCliente', $novoNomeCliente);
    $stmt->bindParam(':numero', $novoNumero);
    $stmt->bindParam(':checkIn', $novoCheckIn);
    $stmt->bindParam(':checkOut', $novoCheckOut);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo "reserva atualizado!!";
    } else {
        echo "erro ao atualizar reserva!!";
    }
}
