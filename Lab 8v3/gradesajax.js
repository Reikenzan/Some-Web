/*
S.Miller
WCC
Fall 2015
*/
var WEBSVCBASE = "/~smiller", //No terminating slash
    LASTID = 0;

// send the asynchronous request to the web service
function callWebService( uriAndParams, callBack )
{
    // build request URL string
    var requestUrl = WEBSVCBASE + uriAndParams; 
    
    // attempt to send the asynchronous request
    try {
        var asyncRequest = new XMLHttpRequest(); // create request
        
        // set up callback function and store it
        asyncRequest.addEventListener("readystatechange",
            function() {
                callBack( asyncRequest );
            }
            , false
        );
        
        // send the asynchronous request
        asyncRequest.open( "GET", requestUrl, true ); 
        asyncRequest.setRequestHeader("Accept", "application/json; charset=utf-8" ); 
        asyncRequest.send(); // send request        
    } // end try
    catch ( e )
    {
        alert ( "Request Failed" );
    } // end catch
} // end function callWebService

function newRowCallback (asyncRequest)
{
    console.log("Processing New Row response");
    if ( asyncRequest.readyState == 4 && asyncRequest.status == 200 )
    {
        try {
            var data = JSON.parse(asyncRequest.responseText);
            if (data.success) {
                console.log("Row added");
                
                updateGradebook();
                
                var oform = document.getElementById('newentry');
                oform.reset();
                
            } else {
                console.log("Row add FAILED!");
            }
        } catch (e) {
            console.log("JSON ERROR\nName: " + e.name + "\nMessage: " + e.message + "\nStack: " + e.stack);
        }
    }
}

function processUpdates( asyncRequest )
{
    console.log("Processing update");
    // if request has completed successfully, process the response
    if ( asyncRequest.readyState == 4 && asyncRequest.status == 200 )
    {
        
        try {
            var data = JSON.parse(asyncRequest.responseText);
            
            LASTID = data.maxid;
            
            if ( Object.keys(data.gradebook).length> 0) {
                
                for (var key in data.gradebook) {
                    
                    if ( data.gradebook[key][1] == "a" ) {
                        //Add row
                        addGradebookRow(data.gradebook[key][0],data.gradebook[key][3], data.gradebook[key][2], data.gradebook[key][4]);
                    } else if ( data.gradebook[key][1] == "d" && typeof delGradebookRow == 'function' ) {
                        //STUDENT
                        console.log( "Attepting to remove row " + data.gradebook[key][2]);
                        delGradebookRow(data.gradebook[key][2]);
                    }
                    
                }
            } else {
                
                console.log("No new updates.");
                
            }
        } catch (e) {
            console.log("JSON ERROR\nName: " + e.name + "\nMessage: " + e.message + "\nStack: " + e.stack);
        }
    
    } // end if
} 

function updateGradebook() {
    console.log("updateGradebook");
    callWebService( '/grades.php?action=getupdate&start='+LASTID, processUpdates );
}

function addGradebookRow(srcid,fname, lname, grade) {
    console.log("AddGradebookRow" + srcid + "," + fname + "," + lname + ","  + grade );
    var gradebook = document.getElementById('grades'),
        iptr = null,
        rows = gradebook.getElementsByTagName("tr");

    for (var i = 0; i < rows.length && iptr === null; ++i) {
        //console.log(rows[i].dataset.sname);
        if ( lname < rows[i].dataset.sname ) {
            //console.log("update of iptr");
            iptr = rows[i];
        }
    }

    var newNodes = document.createElement( "tr" );
    newNodes.setAttribute( "data-sname", lname );
    newNodes.setAttribute( "data-srcid", srcid );

    //Name
    var newCell = document.createElement( "td" );
    newCell.appendChild( document.createTextNode( fname + " " + lname ) );
    newNodes.appendChild(newCell);
    
    //Grade
    newCell = document.createElement( "td" );
    newCell.appendChild( document.createTextNode( grade ) );
    newNodes.appendChild(newCell);
    
    //Grade
    newCell = document.createElement( "td" );
    var newLink = document.createElement( "a" );
    newLink.setAttribute('href','#');
    newLink.appendChild( document.createTextNode( 'del' ) );
    newCell.appendChild(newLink);
    newNodes.appendChild(newCell);
    if (typeof deleteRow == 'function') {
        newLink.addEventListener('click',deleteRow,false);
    }
    
    gradebook.insertBefore(newNodes,iptr);

}

window.addEventListener('load',function() {

    var btnsubmit = document.getElementById('btnsubmit');
    btnsubmit.addEventListener('click',function (event) {

        var fname = document.getElementById('fname').value,
            lname = document.getElementById('lname').value,
            grade = document.getElementById('grade').value;

        console.log("Click received.");

        if ( fname.length > 0 && lname.length > 0 && grade.length > 0 ) {
            event.stopPropagation();
            event.preventDefault();
            
            //addGradebookRow(fname,lname,grade);
            
            callWebService( '/grades.php?action=add&fname='+encodeURIComponent(fname)+'&lname='+encodeURIComponent(lname)+'&grade='+encodeURIComponent(grade), newRowCallback );
            
            return false;
        }
        console.log("Click processed.");

    }, false);
    
    updateGradebook();
    
    console.log("OnLoad processed.");

}, false );