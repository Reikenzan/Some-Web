<!doctype html> 
<html>
<head>
   <title>Lab09</title>
</head>
	<?php
	
			if( isset( $_GET['name'] ) )
				$name = $_GET['name'];
			else
				$name ='foo';
		
		$firstLetter = substr($name, 0, 1);
		
		if( a < $firstLetter && $firstLetter < m ) //If the letter is between a and m
				$color ='green';                   //color will be green
			else                                   //if it's not between a and m
				$color ='red';                     //color will be red
	?>
			

	<p>	
<body style="background-color:<?php echo $color; ?>"> 
		<?php
	
			if( isset( $_GET['name'] ) )
				$name = $_GET['name'];
			else
				$name ='foo';
	
	
			echo "Hello $name !";
		?>
	
	</p>

	
</body>
</html>