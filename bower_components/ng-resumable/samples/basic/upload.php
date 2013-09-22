<?php
$tempDir = __DIR__ . DIRECTORY_SEPARATOR . 'temp';
if (!file_exists($tempDir)) {
	mkdir($tempDir);
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$chunkDir = $tempDir . DIRECTORY_SEPARATOR . $_GET['resumableIdentifier'];
	$chunkFile = $chunkDir.'/chunk.part'.$_GET['resumableChunkNumber'];
	if (file_exists($chunkFile)) {
		header("HTTP/1.0 200 Ok");
	} else {
		header("HTTP/1.0 404 Not Found");
	}
}
// Just imitate that the file was stored.
echo json_encode([
    'success' => true,
    'files' => $_FILES,
    'get' => $_GET,
    'post' => $_POST,
    //optional
    'resumableTotalSize' => isset($_FILES['file']) ? $_FILES['file']['size'] : $_GET['resumableTotalSize'],
    'resumableIdentifier' => isset($_FILES['file']) ? $_FILES['file']['name'] . '-' . $_FILES['file']['size']
        : $_GET['resumableIdentifier'],
    'resumableFilename' => isset($_FILES['file']) ? $_FILES['file']['name'] : $_GET['resumableFilename'],
    'resumableRelativePath' => isset($_FILES['file']) ? $_FILES['file']['tmp_name'] : $_GET['resumableRelativePath']
]);