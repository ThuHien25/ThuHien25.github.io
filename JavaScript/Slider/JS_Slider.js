    var count =	document.getElementsByClassName("slide-box").length;
	//console.log("Count Image: " + count);
    var currentItem = 1;
    /*Show image prev*/
    function prevAction()
	{
	    if (currentItem > 1)
			currentItem--;
		else
			currentItem = count;
		showSlider(currentItem);
		//console.log("Prev:" + currentItem);
	}
	/*Show image next*/	
	function nextAction()
	{
		if (currentItem < count)
			currentItem++;
		else
			currentItem = 1;
		showSlider(currentItem);
		//console.log("Next: " + currentItem);
	}
	function showSlider(index) 
	{
		for (i = 1; i <= count; i++)
		{
			if (i == index) { 
				document.getElementById("item" + i).style.display = "block";
				document.getElementById("index" + i).style.background = "black";
			}
			else {
				document.getElementById("item" + i).style.display = "none";
				document.getElementById("index" + i).style.background = "#F0EEE7";
			}
		}
	}
	/*Event on click index images*/
	function onClickIndex(a)
	{
		var str = a.id;
		currentItem = str.substr(5, 1);
		//console.log("On click image: "+currentItem);
		showSlider(currentItem);
	}