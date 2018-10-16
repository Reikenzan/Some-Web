<!doctype html> 
<html>
<head>
   <title>Lab09</title>
</head>
<body style ="background-color: <?php echo $strBackgroundColor; ?>;">
	<p>
          Username:   <?php echo $_GET['username']; ?>
	</p>
	<?php	
	$strUsername = $_POST["username"]; 
	
	if ($strUsername == "" || $strUsername != m)
	{
		$strBackgroundColor = green;
	}
	else
	{
		$strBackgroundColor = blue;
	}
	
	//check is query parameter extis.  pg. 677
	
	if(isset($_GET["username"]) && trim($_GET["username"]) == 'tophat.sunyecc.edu/~durru96206/lab09')
	{
   $slide = trim($_GET["username"]);
	}
	else{
   $slide = 'foo';
	}

	
	?>
	
</body>
</html>