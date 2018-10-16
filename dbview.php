<?php 

//BEGIN - ON EVERY PAGE TOP
$pagetitle = "View";
//require_once("adminchk.php");

require_once("dbpwd.php"); //Creates a $db mysqli object and connects to DB

require_once("dbheader.php");

//END - ON EVERY PAGE TOP


/* Select queries return a resultset */

$sql = sprintf("
	SELECT Picture,Species,Life_Span,Description,Price
	FROM Animal 
	
	ORDER BY %s
",'Pet_ID');

if ($result = $db->query($sql)) {
	if ( $result->num_rows > 0 ) {
		?>
		<div id="pageBackground"></div>
		<div id="documentBackground"></div>
		
		<span id="productLine">
			
			<?php
			while($row = $result->fetch_assoc()) {
				printf("<table class=\"table\">
        <thead>
            <tr>
                <th class=\"mainHeading\" colspan=4> %s </th>
                
            </tr>
        </thead>
        <tbody>
		
            <tr>
                <td class=\"heading\">Life Expectancy</td>
                <td class=\"data\" colspan=2> %s  </td>
				<td class=\"data\" rowspan=4><img src=\" %s\" height=\"100\" width=\"100\" ></td>
            </tr>
            <tr>
                <td class=\"heading\"><input id=\"purchaseBtn\" type=\"image\" src=\"purchasebutton.png\"></td>
                <td class=\"data\" colspan=2>$   %.2f </td>
            </tr>
		
        </tbody>
    </table>",$row['Species'],$row['Life_Span'],$row['Picture'],$row['Price']);
				
			}
			?>
		</span>
		<?php
	}
	/* free result set */
	mysqli_free_result($result);
} else {
	outputDBError($db);
}
$db->close();

//BEGIN - ON EVERY PAGE BOTTOM
require_once("dbfooter.php");
//END - ON EVERY PAGE BOTTOM
?>