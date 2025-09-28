<?php
// Конфигурация на имейл получателя
$recipient_email = "yuri.metodiev@outlook.com"; // Имейлът, на който да се изпращат съобщенията

// Задаване на хедъри за предотвратяване на cross-site scripting
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Приемане само на POST заявки
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

// Взимане на данните от заявката
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    // Ако няма JSON данни, пробваме стандартните POST данни
    $data = [
        "name" => $_POST["name"] ?? "",
        "email" => $_POST["email"] ?? "",
        "eventType" => $_POST["eventType"] ?? "",
        "message" => $_POST["message"] ?? ""
    ];
}

// Валидация на входните данни
$errors = [];

if (empty($data["name"])) {
    $errors[] = "Name is required";
}

if (empty($data["email"]) || !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Valid email is required";
}

if (empty($data["message"])) {
    $errors[] = "Message is required";
}

// Ако има грешки, връщаме отговор с грешките
if (!empty($errors)) {
    echo json_encode(["success" => false, "errors" => $errors]);
    exit;
}

// Типове събития преведени
$eventTypes = [
    "conference" => "Конференция / Conference",
    "concert" => "Концерт / Concert",
    "corporate" => "Корпоративно събитие / Corporate Event",
    "other" => "Друго / Other"
];

$eventType = $eventTypes[$data["eventType"]] ?? "Не е посочено / Not specified";

// Съставяне на имейл съобщението
$subject = "Aleri-Stream - Запитване от " . $data["name"];

$message = "Получено е ново запитване от формата за контакт на Aleri-Stream:\n\n";
$message .= "Име / Name: " . $data["name"] . "\n";
$message .= "Имейл / Email: " . $data["email"] . "\n";
$message .= "Тип събитие / Event Type: " . $eventType . "\n";
$message .= "Съобщение / Message: " . $data["message"] . "\n\n";
$message .= "Това съобщение е изпратено от уебсайта Aleri-Stream в " . date("Y-m-d H:i:s");

// Хедъри за имейла
$headers = [
    'From' => $data["email"],
    'Reply-To' => $data["email"],
    'X-Mailer' => 'PHP/' . phpversion()
];

// Изпращане на имейла
$mailSent = mail($recipient_email, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Thank you! Your message has been sent successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Sorry, there was a problem sending your message. Please try again later."
    ]);
}
?>