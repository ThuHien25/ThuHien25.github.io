	/*Declare Main Canvas and Footer Canvas*/
    var container = document.getElementById('container');
	var footer = document.getElementById('footer');
	var contextAction = footer.getContext('2d');
	var context = container.getContext('2d');
	document.body.appendChild(container);

	var FPS = 144;
	var TICKS = 1000/FPS;

	var score = 0;
	var highScore = 0;
	var heart = 5;
	var speed = 1;
	var monsterNumber = 1; //number monster random
	var boomNumber = 3;
	var stopNumber = 3;
	var countClick = 0;

	var boolStop = false;
	var boolPause = false;
	var boolBoom = true;
	var run = true;
	var listBlood = new Array();

	/*Check browser support*/
	if (typeof(Storage) !== "undefined")
		localStorage.setItem('highScore', highScore);

	/*Backgroud Container*/
	var bgready = false; //false
	var bgImage = new Image();
	bgImage.onload = function() 
	{
		bgready = true;
	}
	bgImage.src = "images/background.jpg";

	/*Create all images*/
	var monsterImage = new Image();
	monsterImage.onload = function() {

	}
	monsterImage.src = "images/monster.gif";
	monsterImageSize = {
		width: 80,
		height: 80
	}
	var heartImage = new Image();
	heartImage.onload = function() {

	}
	heartImage.src = "images/heart.png";
	var boomImage = new Image();
	boomImage.onload = function() {

	}
	boomImage.src = 'images/boom.gif';
	var pauseImage = new Image();
	pauseImage.onload = function() {

	}
	pauseImage.src = 'images/pause.png';
	var restartImage = new Image();
	restartImage.onload = function() {

	}
	restartImage.src = 'images/restart.png';
	var bloodImage = new Image();
	bloodImage.onload = function() {

	}
	bloodImage.src = 'images/blood.png';
	var stopImage = new Image();
	stopImage.onload = function() {

	}
	stopImage.src = 'images/stop.png';

	/*Create object Monster*/
	var MonsterOne = {
		beginX: 0,
		beginY: 0,
		endX: 120,
		endY: 120,
		startX: 0,
		startY: 0,
		stopX: 120,
		stopY: 120,
		speed: speed,
		show: true,
		click: false,
		dieX: 0,
		dieY: 0
	}
	var MonsterTwo = {
		beginX: 190,
		beginY: 0,
		endX: 190,
		endY: 120,
		startX: 190,
		startY: 0,
		stopX: 190,
		stopY: 120,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
	var MonsterThree = {
		beginX: 380,
		beginY: 0,
		endX: 260,
		endY: 120,
		startX: 380,
		startY: 0,
		stopX: 260,
		stopY: 120,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0,
		stop: false
	}
	var MonsterFour = {
		beginX: 380,
		beginY: 190,
		endX: 260,
		endY: 190,
		startX: 380,
		startY: 190,
		stopX: 260,
		stopY: 190,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
	var MonsterFive = {
		beginX: 380,
		beginY: 380,
		endX: 260,
		endY: 260,
		startX: 380,
		startY: 380,
		stopX: 260,
		stopY: 260,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
	var MonsterSix = {
		beginX: 190,
		beginY: 380,
		endX: 190,
		endY: 260,
		startX: 190,
		startY: 380,
		stopX: 190,
		stopY: 260,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
	var MonsterSeven = {
		beginX: 0,
		beginY: 380,
		endX: 120,
		endY: 260,
		startX: 0,
		startY: 380,
		stopX: 120,
		stopY: 260,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
	var MonsterEight = {
		beginX: 0,
		beginY: 190,
		endX: 120,
		endY: 190,
		startX: 0,
		startY: 190,
		stopX: 120,
		stopY: 190,
		speed: speed,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
    var MonsterNine = {
		startX: Math.floor((Math.random() * 500) + 1),
		startY: Math.floor((Math.random() * 500) + 1),
		stopX: Math.floor((Math.random() * 500) + 1),
		stopY: Math.floor((Math.random() * 500) + 1),
		speed: 1,
		show: false,
		click: false,
		dieX: 0,
		dieY: 0
	}
	/*Create event click for Buttons (Pause, Stop, Restart, Boom)*/
	footer.addEventListener('click', function(e) 
	{
		/*Get location cursor*/
		var cursorX = e.pageX - this.offsetLeft;
		var cursorY = e.pageY - this.offsetTop;
		//Button Pause
		if (cursorX > 400 && cursorX < 440 && cursorY > 60 && cursorY < 100) {
			console.log("PAUSE");
			boolStop = false;
			if (run) {
				run = false;
				boolPause = true;
			} else {
				run = true;
				main();
				boolPause = false;
			}
		}
		//Button Restart
		if (cursorX > 450 && cursorX < 490 && cursorY > 60 && cursorY < 100) {
			console.log("RESTART");
			context.clearRect(0, 0, container.width, container.height);
			restart();
			main();
		}
		//Button Boom
		if (cursorX > 290 && cursorX < 340 && cursorY > 60 && cursorY < 100) {
			if(boolBoom) {
				console.log("BOOM");
				executeActionBoom();
				boomNumber--;
				if (boomNumber <= 0) {
					boolBoom = false;
				}
			}
		}
		//Button Stop 
		if (cursorX > 350 && cursorX < 390 && cursorY > 60 && cursorY < 100) {
			console.log("STOP");
			boolPause = false;
			if (stopNumber > 0) {
				if (run) {
					run = false;
					boolStop = true;
					stopNumber--;
				}
				else {
					run = true;
					main();
					boolStop = false;
				}
				setTimeout(function () {
					run = true;
					main();
					boolStop = false;
				}, 3000)
			} 
			else {
				run = true;
				main();
				boolStop = false;										
			}
		}
	});
	//Method Restart game
	function restart() 
	{
		speed = 1;
		run = true;
		score = 0;
		monsterNumber = 1;
		heart = 5;
		boomNumber = 3;
		stopNumber = 3;
		bgready = true;
		boolPause = false;
		boolBoom = true;
		boolStop = false;
		listBlood = new Array();
		refreshMonster(MonsterOne);
		refreshMonster(MonsterTwo);
		refreshMonster(MonsterThree);
		refreshMonster(MonsterFour);
		refreshMonster(MonsterFive);
		refreshMonster(MonsterSix);
		refreshMonster(MonsterSeven);
		refreshMonster(MonsterEight);
		refreshMonster(MonsterNine);
		MonsterOne.show = true;
	}
	function refreshMonster(monster) 
	{
		monster.show = false;
		monster.startX = monster.beginX;
		monster.startY = monster.beginY;
		monster.stopX = monster.endX;
		monster.stopY = monster.endY;
		monster.speed = speed;
	}
	function executeActionBoom() 
	{
		if (MonsterOne.show)
			boomForMonster(MonsterOne);
		if (MonsterTwo.show)
			boomForMonster(MonsterTwo);
		if (MonsterThree.show)
			boomForMonster(MonsterThree);
		if (MonsterFour.show)
			boomForMonster(MonsterFour);
		if (MonsterFive.show)
			boomForMonster(MonsterFive);
		if (MonsterSix.show)
			boomForMonster(MonsterSix);
		if (MonsterSeven.show)
			boomForMonster(MonsterSeven);
		if (MonsterEight.show)
			boomForMonster(MonsterEight);
		if (MonsterNine.show)
			boomForMonster(MonsterNine);
		speed = speed;
		render();
		for (var i = 0; i < monsterNumber; i++) {
			randomMonster();
		}
	}
	function boomForMonster(monster) 
	{
		score += 10;
		monster.show = false;
		monster.click = false;
		addElementBlood(monster.startX, monster.startY);
	}
	/*Create element blood*/
	function addElementBlood(initX, initY)
	{
		var Blood = {
			initX: initX,
			initY: initY
		}
		listBlood[listBlood.length] = Blood;
	}
	function randomMonster() 
	{
		if(!MonsterOne.show)
			refreshMonster(MonsterOne);
		if(!MonsterTwo.show)
			refreshMonster(MonsterTwo);
		if(!MonsterThree.show)
			refreshMonster(MonsterThree);
		if(!MonsterFour.show)
			refreshMonster(MonsterFour);
		if(!MonsterFive.show)
			refreshMonster(MonsterFive);
		if(!MonsterSix.show)
			refreshMonster(MonsterSix);
		if(!MonsterSeven.show)
			refreshMonster(MonsterSeven);
		if(!MonsterEight.show)
			refreshMonster(MonsterEight);
		var value = Math.floor((Math.random() * 8) + 1);
		switch(value){
			case 1: 
				if(!MonsterOne.show)
					MonsterOne.show = true;
				break;
			case 2:
				if(!MonsterTwo.show)
					MonsterTwo.show = true;
				break;
			case 3: 
				if(!MonsterThree.show)
					MonsterThree.show = true;
				break;
			case 4: 
				if(!MonsterFour.show)
					MonsterFour.show = true;
				break;
			case 5: 
				if(!MonsterFive.show)
					MonsterFive.show = true;
				break;
			case 6: 
				if(!MonsterSix.show)
					MonsterSix.show = true;
				break;
			case 7: 
				if(!MonsterSeven.show)
					MonsterSeven.show = true;
				break;
			case 8: 
				if(!MonsterEight.show)
					MonsterEight.show = true;
				break;
		}
	}
	/*Create event click for Monster*/
	container.addEventListener('click', function(e) 
	{
		/*Get location cursor*/
		var cursorX = e.pageX - this.offsetLeft;
		var cursorY = e.pageY - this.offsetTop;
		if(!boolPause){
			/*Default if missed click monster*/
			score -= 10;
			heart--;
			if (MonsterOne.show)
				clickMonster(MonsterOne, cursorX, cursorY);
			if (MonsterTwo.show)
				clickMonster(MonsterTwo, cursorX, cursorY);
			if (MonsterThree.show)
				clickMonster(MonsterThree, cursorX, cursorY);
			if (MonsterFour.show)
				clickMonster(MonsterFour, cursorX, cursorY);
			if (MonsterFive.show)
				clickMonster(MonsterFive, cursorX, cursorY);
			if (MonsterSix.show)
				clickMonster(MonsterSix, cursorX, cursorY);
			if (MonsterSeven.show)
				clickMonster(MonsterSeven, cursorX, cursorY);
			if (MonsterEight.show)
				clickMonster(MonsterEight, cursorX, cursorY);
			if (MonsterNine.show && cursorX >= MonsterNine.startX && cursorX <= MonsterNine.startX + monsterImageSize.width && cursorY >= MonsterNine.startY && cursorY <= MonsterNine.startY + monsterImageSize.height) 
			{
				heart++;
				score += 30;
				countClick++;
				MonsterNine.click = false;
				MonsterNine.show = false;
				MonsterNine.dieX = MonsterNine.startX;
				MonsterNine.dieY = MonsterNine.startY;
				MonsterNine.startX = Math.floor((Math.random() * 500) + 1);
				MonsterNine.startY = Math.floor((Math.random() * 500) + 1);
				MonsterNine.stopX = Math.floor((Math.random() * 500) + 1);
				MonsterNine.stopY = Math.floor((Math.random() * 500) + 1);
				addElementBlood(MonsterNine.dieX, MonsterNine.dieY);
			}
		}
		if (boolStop) 
		{
			if (MonsterOne.show)
				executeActionStop(MonsterOne, cursorX, cursorY);
			if (MonsterTwo.show)
				executeActionStop(MonsterTwo, cursorX, cursorY);
			if (MonsterThree.show)
				executeActionStop(MonsterThree, cursorX, cursorY);
			if (MonsterFour.show)
				executeActionStop(MonsterFour, cursorX, cursorY);
			if (MonsterFive.show)
				executeActionStop(MonsterFive, cursorX, cursorY);
			if (MonsterSix.show)
				executeActionStop(MonsterSix, cursorX, cursorY);
			if (MonsterSeven.show)
				executeActionStop(MonsterSeven, cursorX, cursorY);
			if (MonsterEight.show)
				executeActionStop(MonsterEight, cursorX, cursorY);
			if (MonsterNine.show)
				executeActionStop(MonsterNine, cursorX, cursorY);
		}
	});
	function clickMonster(monster, cursorX, cursorY) 
	{
		if(monster.click)
		{
			if(cursorX >= monster.startX && cursorX <= monster.startX + monsterImageSize.width && cursorY >= monster.startY && cursorY <= monster.startY + monsterImageSize.height)
			{
				heart++;
				countClick++;
				if(countClick == 20) {
					heart++;
					countClick = 0;
				}
				if(countClick % 5 == 0) {
					MonsterNine.show = true;
					console.log('show MonsterNine');
				}
				score += 20;
				monster.click = false;
				monster.show = false;
				monster.dieX = monster.startX;
				monster.dieY = monster.startY;
				monster.startX = monster.beginX;
				monster.startY = monster.beginY;
				monster.stopX = monster.endX;
				monster.stopY = monster.endY;
				addElementBlood(monster.dieX, monster.dieY);
				render();
				for (var i = 0; i < monsterNumber; i++) {
					randomMonster();
				}
			}
		}
	}
	function executeActionStop(monster, cursorX, cursorY) 
	{
		if (monster.click) 
		{
			if (cursorX > monster.startX && cursorX < monster.startX + monsterImageSize.width && cursorY > monster.startY && cursorY < monster.startY + monsterImageSize.height) 
			{
				score += 10;
				monster.click = false;
				monster.show = false;
				monster.dieX = monster.startX;
				monster.dieY = monster.startY;
				monster.startX = monster.beginX;
				monster.startY = monster.beginY;
				monster.stopX = monster.endX;
				monster.stopY = monster.endY;
				addElementBlood(monster.dieX, monster.dieY);
				render();
				randomMonster();
			}
		}
	}
	/*Method draw all element in canvas*/
	function render() 
	{
		if (bgready)
			context.drawImage(bgImage, 0,0, container.width, container.height);
		
		updateBlood();
		if (MonsterOne.show)
			context.drawImage(monsterImage, MonsterOne.startX, MonsterOne.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterTwo.show)
			context.drawImage(monsterImage, MonsterTwo.startX, MonsterTwo.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterThree.show)
			context.drawImage(monsterImage, MonsterThree.startX, MonsterThree.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterFour.show)
			context.drawImage(monsterImage, MonsterFour.startX, MonsterFour.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterFive.show)
			context.drawImage(monsterImage, MonsterFive.startX, MonsterFive.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterSix.show)
			context.drawImage(monsterImage, MonsterSix.startX, MonsterSix.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterSeven.show)
			context.drawImage(monsterImage, MonsterSeven.startX, MonsterSeven.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterEight.show)
			context.drawImage(monsterImage, MonsterEight.startX, MonsterEight.startY, monsterImageSize.width, monsterImageSize.height);
		if (MonsterNine.show)
		{
			updateMonsterCenter(MonsterNine);
			context.drawImage(monsterImage, MonsterNine.startX, MonsterNine.startY, monsterImageSize.width, monsterImageSize.height);
		}
		contextAction.clearRect(0,0, footer.width, footer.height);
		contextAction.fillStyle = '#19B80A';
		contextAction.font = '20px Arial';
		contextAction.fillText('Score: '+ score, 10, 30);
		contextAction.fillText('Heart: ', 10, 60);
		contextAction.fillText('Speed: '+ speed, 10, 90);
		contextAction.fillText('Random Monster: '+ monsterNumber, 300, 30);
		var Xposition = 0;
		for (var i = 0; i < heart; i++) {
			contextAction.drawImage(heartImage, (70 + Xposition), 45, 20, 20);
			Xposition += 20;
		}
		contextAction.drawImage(boomImage, 290, 60, 50, 40);
		contextAction.drawImage(stopImage, 350, 60, 40, 40);	
		contextAction.drawImage(pauseImage, 400, 60, 40, 40);
		contextAction.drawImage(restartImage, 450, 60, 40, 40);
		contextAction.fillStyle = '#FFFFFF';
		contextAction.font = '35px Arial';
		contextAction.fillText(boomNumber, 300, 75);
		contextAction.fillText(stopNumber, 360, 75);
		if(boolPause)
			SetDefalult("PAUSE!!");
		if (boolStop)
			SetDefalult("STOP!!");
	}
	/*Set default when click Pause or Stop*/
	function SetDefalult(string)
	{
		context.fillStyle = '#FFFFFF';
		context.font = '50px Arial';
		context.fillText(string, 180, 240);
	}
	function SetDefalult_GameOver() 
	{
		context.fillStyle = '#FFFFFF';
		context.font = '40px Arial';
		context.fillText('Game Over!!', 130, 200);

		context.fillStyle = '#5bfa3f';
		context.font = '20px Arial';
		context.fillText('Score: ' + score, 130, 240);
		context.fillText('High Score: '+ localStorage.getItem('highScore'), 130, 280);
	}
	function updateBlood()
	{
		if(listBlood.length > 0) {
			for (var i = 0; i < listBlood.length; i++) {
				context.drawImage(bloodImage, listBlood[i].initX, listBlood[i].initY)
			}
		}
	}
	/*Method update monster in center canvas*/
	function updateMonsterCenter(monster)
	{
		if (monster.startX == monster.stopX && monster.startY == monster.stopY) {
			monster.startX = monster.stopX;
			monster.startY = monster.stopY;
			monster.stopX = Math.floor((Math.random() * 500) + 1);
			monster.stopY = Math.floor((Math.random() * 500) + 1);
		} else {
			monster.startX > monster.stopX ? monster.startX -= monster.speed : monster.startX += monster.speed;
			monster.startY > monster.stopY ? monster.startY -= monster.speed : monster.startY += monster.speed;
		}
	}
	/*Method run*/
	function main()
	{
		var NOW = Date.now();
		var differentTime = NOW - lastUpdateTime;
		if(differentTime >= TICKS) {
			createLever();
			if (MonsterOne.show)
				updateMonster(MonsterOne);
			if (MonsterTwo.show)
				updateMonster(MonsterTwo);
			if (MonsterThree.show)
				updateMonster(MonsterThree);
			if (MonsterFour.show)
				updateMonster(MonsterFour);
			if (MonsterFive.show)
				updateMonster(MonsterFive);
			if (MonsterSix.show)
				updateMonster(MonsterSix);
			if (MonsterSeven.show)
				updateMonster(MonsterSeven);
			if (MonsterEight.show)
				updateMonster(MonsterEight);
			render();
			lastUpdateTime = NOW;
		}
		var sleepTime = TICKS - differentTime;
		if(sleepTime < 0) {
			sleepTime = 0;
		}

		if (score < 0) {
			SetDefalult_GameOver();
		}
		else if (heart == 0) {
			var temp = parseInt(localStorage.getItem('highScore'));
			if(temp < score)
				localStorage.setItem('highScore', score);
			SetDefalult_GameOver();
		}
		else {
			if(run)
				requestAnimationFrame(main);
		}
	}

	var windows = window;
	requestAnimationFrame = windows.requestAnimationFrame || windows.webkitRequestAnimationFrame || windows.msRequestAnimationFrame || windows.mozRequestAnimationFrame;
	/*Bulid Lever: speed, monsterNumber, score*/
	function createLever()
	{
		var level = Math.floor(score / 100); 
		switch (level) {
			case 1:
				speed = 1;
				monsterNumber = 1;
				break;
			case 2:
				speed = 1;
				monsterNumber = 3;
				break;
			case 3:
				speed = 2;
				monsterNumber = 4;
				break;
			case 4:
				speed = 2;
				monsterNumber = 5;
				break;
			case 5:
				speed = 3;
				monsterNumber = 5;
				break;
			case 6:
				speed = 3;
				monsterNumber = 6;
				break;
			case 7:
				speed = 4;
				monsterNumber = 7;
				break;
			case 8:
				speed = 4;
				monsterNumber = 8;
				break;
		}
	}
	function updateMonster(monster) 
	{
		monster.click = true;
		if (monster.startX == monster.stopX && monster.startY == monster.stopY) {
			monster.startX = monster.stopX;
			monster.startY = monster.stopY;
			monster.stopX = monster.beginX;
			monster.stopY = monster.beginY;
		}
		else {
			monster.startX > monster.stopX ? monster.startX -= monster.speed : monster.startX += monster.speed;
			monster.startY > monster.stopY ? monster.startY -= monster.speed : monster.startY += monster.speed;		
		}

		if (monster.startX == monster.beginX && monster.startY == monster.beginY) {
			monster.show = false;
			monster.stop = true;
			monster.startX = monster.beginX;
			monster.startY = monster.beginY;
			monster.stopX = monster.endX;
			monster.stopY = monster.endY;
			randomMonster();
		}
	}
	var lastUpdateTime = Date.now();
	main();