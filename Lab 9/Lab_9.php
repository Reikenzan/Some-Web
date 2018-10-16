<!doctype html>
<html>
<head>
<title>Lab 09</title>
</head>
	<?php
			if( isset( $_GET['username'] ) )
				$username = $_GET['username'];
			else
				$username ='foo';
		$firstLetter = substr($username, 0, 1);		
		
		if( a <= $firstLetter && $firstLetter < m )
				$color ='green';                   
			else                                   
				$color ='blue';                    
	?>
<!--body style="background-color:green">-->	<p> 	
<body style="background-color:<?php echo $color; ?>"> <!--echo out the color variable with php-->
		<?php
			if( isset( $_GET['username'] ) )
				$username = $_GET['username'];
			else
				$username ='foo';	
	
			echo "Welcome you username is  $username !";
		?></p>

</body>
</html>