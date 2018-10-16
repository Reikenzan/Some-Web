//DEBORA URRUTIA	   Fall 2015
function addGradebookRow(fname, lname, grade) 
{
    var gradebook = document.getElementById('grades'),
        iptr = null,
        rows = gradebook.getElementsByTagName("tr");
    for (var i = 0; i < rows.length && iptr === null; ++i) 
	{
        console.log(rows[i].dataset.sname);
        if ( lname < rows[i].dataset.sname ) 
		{
            console.log("update of iptr");
            iptr = rows[i];
        }
    }
    var newNodes = document.createElement( "tr" );
    newNodes.setAttribute( "data-sname", lname );
    //Name
    var newCell = document.createElement( "td" );
    newCell.appendChild( document.createTextNode( fname + " " + lname ) );
    newNodes.appendChild(newCell);
    //Grade
    newCell = document.createElement( "td" );
    newCell.appendChild( document.createTextNode( grade ) );
    newNodes.appendChild(newCell);

    gradebook.insertBefore(newNodes,iptr);
}

window.addEventListener('load',function() 
{
    var btnsubmit = document.getElementById('btnsubmit');
    btnsubmit.addEventListener('click',function (event) 
	{
        event.stopPropagation();
        var fname = document.getElementById('fname').value,
            lname = document.getElementById('lname').value,
            grade = document.getElementById('grade').value;

        console.log("Click received.");
        if ( fname.length > 0 && lname.length > 0 && grade.length > 0 ) 
		{
            event.stopPropagation();
            event.preventDefault();
            addGradebookRow(fname,lname,grade);

            var oform = document.getElementById('newentry');
            oform.reset();
            return false;
        }
        console.log("Click processed.");
    }, false);
    console.log("OnLoad processed.");
}, false );
//------------------------------------------------------------------------------
function flipDisabled()
{
	var gradeSort = document.getElementById("gradesort");
	var surSort = document.getElementById("snamesort");
	if (gradeSort.disabled == true)
	{
		gradeSort.setAttribute("disabled", false);
		surSort.setAttribute("disabled", true);
	}
	else
	{
		gradeSort.setAttribute("disabled", true);
		surSort.setAttribute("disabled", false);
	}
}
/*

function sortByGrade(a, b)
{
	return a.
		
}

function sortBySurname(a, b)
{
	
}
*/