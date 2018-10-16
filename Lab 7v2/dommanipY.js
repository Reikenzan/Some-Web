var container = new Array();
function clearTBody() {
    var oldTBody = document.getElementById("grades"),
        ID = oldTBody.id,
        newTBody = document.createElement("tbody");
    newTBody.id = ID;

    oldTBody.parentNode.replaceChild(newTBody, oldTBody);
}

function addToContainer(fname, lname, grade) {
    var newPerson = new Object();
    newPerson.fname = fname;
    newPerson.lname = lname;
    newPerson.grade = grade;
    container.push(newPerson);
}

function addGradebookRow(fname, lname, grade) {
//    addToContainer(fname, lname, grade);
    var gradebook = document.getElementById('grades'),
        iptr = null,
        rows = gradebook.getElementsByTagName("tr");

    for (var i = 0; i < rows.length && iptr === null; ++i) {
        console.log(rows[i].dataset.sname);
        if (lname < rows[i].dataset.sname) {
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

window.addEventListener('load', function () {

    var btnsubmit = document.getElementById('btnsubmit'),
        btnGrade = document.getElementById("gSort"),
        btnLName = document.getElementById("lSort");
    btnsubmit.addEventListener('click', function (event) {

        event.stopPropagation();

        var fname = document.getElementById('fname').value,
            lname = document.getElementById('lname').value,
            grade = document.getElementById('grade').value;

        console.log("Click received.");

        if (fname.length > 0 && lname.length > 0 && grade.length > 0) {
            event.stopPropagation();
            event.preventDefault();
            addGradebookRow(fname, lname, grade);

            var oform = document.getElementById('newentry');
            oform.reset();
            return false;
        }
        console.log("Click processed.");

    }, false);

    btnGrade.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log("Click received.");
        console.log(container.length);
        clearTBody();
        container.sort(function (a, b) {
                if (a.grade < b.grade) {
                    return -1;
                }
                if (a.grade > b.grade) {
                    return 1;
                }
                return 0;
            });
            
        
        for (var i = 0; i < container.length; ++i) {
            console.log(container[i].fname, container[i].lname, container[i].grade);
            addGradebookRow(container[i].fname, container[i].lname, container[i].grade);
        }
        btnGrade.disabled = true;
        btnLName.disabled = false;
        return false;
        console.log("Click processed.");
    }, false);

    btnLName.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log("Click received.");
        console.log(container.length);
        clearTBody();
        container.sort(function(a, b) {
            if (a.lname < b.lname) {
                return -1;
            }
            if (a.lname > b.lname) {
                return 1;
            }
            return 0;
        });
        
        for (var i = 0; i < container.length; ++i) {
            console.log(container[i].fname, container[i].lname, container[i].grade);
            addGradebookRow(container[i].fname, container[i].lname, container[i].grade);
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