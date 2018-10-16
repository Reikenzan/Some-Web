var container = new Array();
function clearTBody() {
    var TBody = document.getElementById("grades");
    for (var i = TBody.rows.length - 1; i > -1; --i)
    {
        TBody.deleteRow(i);
    }
}
function compLName(a, b)
{
    if (a.lname < b.lname)
    {
        return 1;
    }
    else if (a.lname == b.lname)
    {
        if (compGrade(a,b) == 0)
        {
            return 0;
        }
        else
        {
            return compGrade(a,b);
        }
    }
    else
    {
        return -1;
    }
}
function compGrade(a, b)
{
    if (a.grade < b.grade)
    {
        return -1;
    }
    else if (a.grade == b.grade)
    {
        if (compLName(a,b) == 0)
        {
            return 0;
        }
        else
        {
            return compLName(a,b);
        }
    }
    else
    {
        return 1;
    }
}
Array.prototype.swap = function(a, b)
{
    var g = this[a].grade;
    var l = this[a].lname;
    var f = this[a].fname;
    this[a].grade = this[b].grade;
    this[a].lname = this[b].lname;
    this[a].fname = this[b].fname;
    this[b].grade = g;
    this[b].lname = l;
    this[b].fname = f;
    return this;
}
Array.prototype.sort = function(compare)
{
    var unSorted;
  //  do
  //  {
  //      unSorted = false;
        for (var i = 0; i < this.length - 1; ++i)
        {
         //   if (compare(this[i], this[i+1] == 1))
         //   {
                console.log("passed test");
                this.swap(i, i+1);
                console.log("passed swap");
                unSorted = true;
         //   }
        }
 //   } while (unSorted);
    return this;
}
function addToContainer(fname, lname, grade) 
{
    var newPerson = new Object();
    newPerson.fname = fname;
    newPerson.lname = lname;
    newPerson.grade = grade;
    container.push(newPerson);
}
function addGradebookRow(fname, lname, grade) 
{
    addToContainer(fname, lname, grade);
    var gradebook = document.getElementById('grades'),
        iptr = null,
        rows = gradebook.getElementsByTagName("tr");

    for (var i = 0; i < rows.length && iptr === null; ++i) 
	{
        console.log(rows[i].dataset.sname);
        if (lname < rows[i].dataset.sname) 
		{
            console.log("update of iptr");
            iptr = rows[i];
        }
    }
    var newNodes = document.createElement("tr");
    newNodes.setAttribute("data-sname", lname);
    //Name
    var newCell = document.createElement("td");
    newCell.appendChild(document.createTextNode(fname + " " + lname));
    newNodes.appendChild(newCell);
    //Grade
    newCell = document.createElement("td");
    newCell.appendChild(document.createTextNode(grade));
    newNodes.appendChild(newCell);

    gradebook.insertBefore(newNodes, iptr);
}
window.addEventListener('load', function () 
{
    var btnsubmit = document.getElementById('btnsubmit'),
        btnGrade = document.getElementById("gSort"),
        btnLName = document.getElementById("lSort");
    btnsubmit.addEventListener('click', function (event) 
	{
        event.stopPropagation();
        var fname = document.getElementById('fname').value,
            lname = document.getElementById('lname').value,
            grade = document.getElementById('grade').value;
        console.log("Click received.");

        if (fname.length > 0 && lname.length > 0 && grade.length > 0) 
		{
            event.stopPropagation();
            event.preventDefault();
            addGradebookRow(fname, lname, grade);

            var oform = document.getElementById('newentry');
            oform.reset();
            return false;
        }
        console.log("Click processed.");
    }, false);
    btnGrade.addEventListener('click', function (event) 
	{
        event.stopPropagation();
        console.log("Click received.");
        clearTBody();
        container.sort(compGrade); 
        var buffer = container;
        container = [];
        for (var i = 0; i < buffer.length; ++i) 
		{
            addGradebookRow(buffer[i].fname, buffer[i].lname, buffer[i].grade);
        }
        btnGrade.disabled = true;
        btnLName.disabled = false;
        return false;
        console.log("Click processed.");
    }, false);
    btnLName.addEventListener('click', function (event) 
	{
        event.stopPropagation();
        console.log("Click received.");
        clearTBody();
        container.sort(compLName);
        var buffer = container;
        container = [];
        for (var i = 0; i < buffer.length; ++i) 
		{
            addGradebookRow(buffer[i].fname, buffer[i].lname, buffer[i].grade);
        }
        btnLName.disabled = true;
        btnGrade.disabled = false;
        return false;
        console.log("Click processed.");
    }, false);
    console.log("OnLoad processed.");
            var tb = document.getElementById("grades");
    for (var i = 0; i < tb.rows.length; ++i)
    {
       var grade = tb.rows[i].cells[1].innerHTML;
       var name = tb.rows[i].cells[0].innerHTML.split(' ');
       addToContainer(name[0], name[1], grade); 
    }
}, false);