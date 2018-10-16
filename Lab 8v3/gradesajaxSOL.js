function deleteRowCallback(asyncRequest)
{
    if ( asyncRequest.readyState == 4 && asyncRequest.status == 200 )
    {
        try {
            var data = JSON.parse(asyncRequest.responseText);
            if (data.success) {
                console.log("Row deleted");
                updateGradebook();
            } else {
                console.log("Row delete FAILED!");
            }
        } catch (e) {
            console.log("JSON ERROR\nName: " + e.name + "\nMessage: " + e.message + "\nStack: " + e.stack);
        }
    }
}

function deleteRow(event) {
    var srcid = event.target.parentElement.parentElement.dataset.srcid;
    callWebService('/grades.php?action=delete&id='+srcid,deleteRowCallback);
}

function delGradebookRow(srcid) {
    var requestUrl = "tophat.sunywcc.edu/~smiller/
    var asyncRequest = new XMLHttpRequest(); // create request
    asyncRequest.open( "GET", requestUrl, true ); 
    asyncRequest.setRequestHeader("Accept", "application/json; charset=utf-8" ); 
    asyncRequest.send(); // send request         
}
