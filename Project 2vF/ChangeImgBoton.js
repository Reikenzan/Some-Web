var imgIndex = ["Adventure", "Comedy", "Drama", "Echi", "Gore", "Magic", "Romance", "sify", "Sport", "SuperNat"];
var imgNames = ["Adventure", "Comedy", "Drama", "Echi", "Gore", "Magic", "Romance", "sify", "Sport", "SuperNat"];
var curImg;
var imgButton;
var IMG_H = 250;
var IMG_W = 300;
var cursor = 0;
var numOfImgs = 10;
function nextImg()
{
    curImg = document.getElementById("rimg");
    var index = cursor % numOfImgs;
    curImg.setAttribute("src", imgIndex[index] + ".png");
    curImg.setAttribute("alt", imgNames[index]);
    curImg.setAttribute("width", IMG_W);
    curImg.setAttribute("height", IMG_H);
    ++cursor;
}
function BackImg()
{
	curImg = document.getElementById("rimg"); 
	var index = numOfImgs % cursor;
    curImg.setAttribute("src", imgIndex[index] + ".png");
    curImg.setAttribute("alt", imgNames[index]);
    curImg.setAttribute("width", IMG_W);
    curImg.setAttribute("height", IMG_H);
    --cursor;
}
function start()
{
    imgButton = document.getElementById("chgImg");
    imgButton.addEventListener("click", nextImg, false);
	imgButton = document.getElementById("chgImgB");
    imgButton.addEventListener("click", BackImg, false);
}
window.addEventListener("load", start, false);