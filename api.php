<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

$contentFile = __DIR__ . '/data/content.json';
$guestsFile  = __DIR__ . '/data/guests.json';
$wishesFile  = __DIR__ . '/data/wishes.json';

function respondJson($data, $code = 200) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($code);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function getJsonData($path, $default = []) {
    if (!file_exists($path)) {
        return $default;
    }
    $raw = file_get_contents($path);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function saveJsonData($path, $data) {
    return file_put_contents(
        $path, 
        json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );
}

// 1. KONTEN LANDING PAGE
if ($action === 'get_content') {
    respondJson(getJsonData($contentFile));
}

if ($action === 'save_content') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);
    if (!is_array($payload)) {
        respondJson(['success' => false, 'message' => 'Format payload tidak valid'], 400);
    }
    $current = getJsonData($contentFile);
    $updated = array_merge($current, $payload);
    saveJsonData($contentFile, $updated);
    respondJson(['success' => true, 'message' => 'Konten berhasil diperbarui', 'data' => $updated]);
}

// 2. MANAJEMEN TAMU (GUEST ID)
if ($action === 'get_guests') {
    respondJson(getJsonData($guestsFile));
}

if ($action === 'add_guest') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);
    $name = isset($payload['name']) ? trim($payload['name']) : '';
    if (empty($name)) {
        respondJson(['success' => false, 'message' => 'Nama tamu tidak boleh kosong'], 400);
    }

    $guests = getJsonData($guestsFile);
    $maxId = 0;
    foreach ($guests as $g) {
        if (isset($g['id']) && $g['id'] > $maxId) {
            $maxId = (int)$g['id'];
        }
    }
    $newGuest = [
        'id'   => $maxId + 1,
        'name' => $name
    ];
    $guests[] = $newGuest;
    saveJsonData($guestsFile, $guests);
    respondJson(['success' => true, 'message' => 'Tamu berhasil ditambahkan', 'guest' => $newGuest]);
}

if ($action === 'delete_guest') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);
    $id = isset($payload['id']) ? (int)$payload['id'] : 0;
    if (!$id) {
        respondJson(['success' => false, 'message' => 'ID tamu tidak valid'], 400);
    }

    $guests = getJsonData($guestsFile);
    $filtered = array_values(array_filter($guests, function($g) use ($id) {
        return (int)$g['id'] !== $id;
    }));
    saveJsonData($guestsFile, $filtered);
    respondJson(['success' => true, 'message' => 'Tamu berhasil dihapus']);
}

// 3. MANAJEMEN UCAPAN / BUKU TAMU
if ($action === 'get_wishes') {
    respondJson(getJsonData($wishesFile));
}

if ($action === 'add_wish') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);
    $name = isset($payload['name']) ? trim($payload['name']) : '';
    $message = isset($payload['message']) ? trim($payload['message']) : '';

    if (empty($name) || empty($message)) {
        respondJson(['success' => false, 'message' => 'Nama dan ucapan wajib diisi'], 400);
    }

    $wishes = getJsonData($wishesFile);
    $newWish = [
        'id'      => time(),
        'name'    => $name,
        'message' => $message,
        'time'    => date('c')
    ];
    array_unshift($wishes, $newWish);
    saveJsonData($wishesFile, $wishes);
    respondJson(['success' => true, 'message' => 'Ucapan berhasil dikirim', 'wish' => $newWish]);
}

if ($action === 'delete_wish') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);
    $id = isset($payload['id']) ? $payload['id'] : null;
    $index = isset($payload['index']) ? (int)$payload['index'] : null;

    $wishes = getJsonData($wishesFile);
    if ($id !== null) {
        $wishes = array_values(array_filter($wishes, function($w) use ($id) {
            return (string)$w['id'] !== (string)$id;
        }));
    } elseif ($index !== null && isset($wishes[$index])) {
        array_splice($wishes, $index, 1);
    }
    saveJsonData($wishesFile, $wishes);
    respondJson(['success' => true, 'message' => 'Ucapan berhasil dihapus']);
}

if ($action === 'clear_wishes') {
    saveJsonData($wishesFile, []);
    respondJson(['success' => true, 'message' => 'Semua ucapan berhasil dihapus']);
}

// 4. UPLOAD MEDIA (FOTO, VIDEO, MUSIK, QR CODE)
if ($action === 'upload_media') {
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        respondJson(['success' => false, 'message' => 'Tidak ada file yang diunggah atau terjadi kesalahan'], 400);
    }

    $file = $_FILES['file'];
    $allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp3', 'wav', 'mp4', 'webm'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, $allowedExt)) {
        respondJson(['success' => false, 'message' => 'Format file tidak diizinkan. Hanya gambar, mp3, dan mp4.'], 400);
    }

    $targetDir = __DIR__ . '/assets/';
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    $safeBaseName = preg_replace('/[^a-zA-Z0-9_\-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
    $newFileName = 'up_' . time() . '_' . substr($safeBaseName, 0, 20) . '.' . $ext;
    $targetPath = $targetDir . $newFileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $publicPath = 'assets/' . $newFileName;
        respondJson(['success' => true, 'message' => 'File berhasil diunggah', 'path' => $publicPath]);
    } else {
        respondJson(['success' => false, 'message' => 'Gagal menyimpan file ke server'], 500);
    }
}

respondJson(['success' => false, 'message' => 'Action tidak dikenali'], 404);
