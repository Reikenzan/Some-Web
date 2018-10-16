//DEBORA URRUTIA
var bird = 0;
var curImg;
var pictures = ["Angry-Rio", "AB2", "Family", "AB-the-movie", "AB", "birdy"];
var descriptions = ["Angry Rio Birds", "The 2-AB", "Happy Family Memories", "Angry-Birds the movie", "Flying Alien B", "birdy"];

function start()
{
   var button = document.getElementById("chgImg");
   button.addEventListener( "click", chgImg, false );
}
function chgImg()
{
    if (bird == 0)
    {
       var LogOn = document.createElement("p");
       var InLog = document.createTextNode("0: Started");
       LogOn.appendChild(InLog);
       document.getElementById("log").appendChild(LogOn);
    }
    curImg = document.getElementById("rimg");
    var index = bird % 6;
	curImg.setAttribute("src", pictures[index] + ".jpg");
    curImg.setAttribute("alt", descriptions[index]);
	
    var logEntry = document.createElement("p");
    var text= (bird + 1).toString() + ": " + descriptions[index];
    var textNode = document.createTextNode(text);    
    logEntry.appendChild(textNode);
    document.getElementById("log").appendChild(logEntry);
    ++bird;
}
window.addEventListener("load", start, false);