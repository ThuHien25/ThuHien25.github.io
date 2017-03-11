<?php
	$listUsername = Array("HienPham_2511","Sun.Pham25211");
	if ($_GET["username"]) {
		foreach ($listUsername as $key => $username) {
			if ($username === $_GET["username"]) {
				echo "true";
			}
		}
		echo "false";
	}
?>