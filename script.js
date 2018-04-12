var gamePage = "game";
var rulesPage = "rules";
var pageShown = "shown";
var pageHidden = "hidden";

var imageHeight = "720";
var imageWidth = "960";

var maximumPimpleX = 300;
var maximumPimpleY = 180;
var minimumPimpleX = 250;
var minimumPimpleY = 70;


var pimplesPopped = 0;
var howManyToWin = 6;
var pimplesOnScreen = 0;
var maximumPimples = 5;

var easyTime = 1000;
var mediumTime = 750;
var hardTime = 500;

var interval1 = 10;
var interval2 = 20;

var timeBasedOnDifficulty = 1000;

var pimple = ["pimple1", "pimple2", "pimple3", "pimple4", "pimple5", "pimple6", "pimple7", "pimple8"];

var switchButton = document.getElementById("switcher");

function changePage()
{
	var page1 = document.getElementById("rulesPage");
	var page2 = document.getElementById("gamePage");

	changeVisibility(page2);
	changeVisibility(page1);

}

function changeSwitcherButtonValue()
{
	if(switchButton.getAttribute("value") === gamePage)
	{
		switchButton.setAttribute("value", rulesPage);
	}
	else
	{
		switchButton.setAttribute("value", gamePage);
	}
}

function changeVisibility(elementToChange)
{
	if (elementToChange.getAttribute("class") === pageHidden)
	{
		elementToChange.setAttribute("class", pageShown);
	}
	else
	{
		elementToChange.setAttribute("class", pageHidden);
	}
}

function getPositionOfElement(elementToCheck)
{
	var xPosition = 0;
	var yPosition = 0;

	// Find the distance between an element and its parent element, until the distance from the edge of the webpage is found.
	while(elementToCheck)
	{
		// Find the distance between the top left corner of the element to its parent element.
		xPosition = (elementToCheck.offsetLeft - elementToCheck.scrollLeft + elementToCheck.clientLeft) + xPosition;
	    yPosition = (elementToCheck.offsetTop - elementToCheck.scrollTop + elementToCheck.clientTop) + yPosition;

		// Change the element to be checked to the parent element.
		elementToCheck = elementToCheck.offsetParent;
	}

	return {
		"x": xPosition,
		"y": yPosition
	};

}

function getPositionToPutPimple(positionOfImage)
{
	var pimpleX = 0;
	var pimpleY = 0;

	var imageX = positionOfImage.x;
	var imageY = positionOfImage.y;
	gameImage = document.getElementById("gameScreen");

	pimpleX = Math.floor(Math.random() * gameImage.width - 100) + positionOfImage.x + 400;
	pimpleY = Math.floor(Math.random() * gameImage.height - 75) + positionOfImage.y + 150;

	return {
		"x": pimpleX,
		"y": pimpleY
	};
}

function makePimple(positionOfPimple, pimpleNumber)
{
	var x = positionOfPimple.x;
	var y = positionOfPimple.y;

	var thisPimple = document.getElementById(pimple[pimpleNumber]);

	thisPimple.style.left = x + "px";
	thisPimple.style.top = y + "px";
	changeVisibility(thisPimple);
}

function popPimple(pimple)
{
	changeVisibility(pimple);
	pimplesPopped++;
	pimplesOnScreen--;
}

function raiseDifficulty()
{
	if (pimplesPopped < interval1)
	{
		timeBasedOnDifficulty = easyTime;
	}
	else if (pimplesPopped > interval1  && pimplesPopped < interval2)
	{
		timeBasedOnDifficulty = mediumTime;
	}
	else
	{
		timeBasedOnDifficulty = hardTime;
	}

}

function showPimple()
{
	var pimpleNumber;
	pimpleNumber = Math.floor(Math.random() * (pimple.length - 1));

	if(document.getElementById(pimple[pimpleNumber]).getAttribute("class") == pageHidden)
	{
		makePimple(getPositionToPutPimple(getPositionOfElement(document.getElementById("gameScreen"))), pimpleNumber);
		pimplesOnScreen++;
	}
}

function checkForFivePimple()
{
    return pimplesOnScreen >= maximumPimples;   
}

function checkForWin()
{
    return pimplesPopped >= howManyToWin;
}

function playGame()
{               
        var game = setInterval(function()
                    {
                        raiseDifficulty();
                        showPimple();
                        if(checkForFivePimple() || checkForWin())
                        {
                            clearInterval(game);
                            if(!(pimplesOnScreen < maximumPimples))
                            {
                                alert("Oh no, you lost!");
                                return;
                            }
                            if(pimplesPopped == howManyToWin)
                            {
                                alert("Nice! You won!");
                                return;
                            }
                            
                        }
                    }, timeBasedOnDifficulty); 
        
}