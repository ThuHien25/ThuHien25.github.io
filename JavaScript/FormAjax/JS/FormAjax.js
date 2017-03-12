	var	checkUsername = checkPassword = checkEmail = false;	
	/*create event for button Submit*/
	function btnSubmitClick()
	{
		var username = document.getElementById("username");
		var	password = document.getElementById("password");
		var	email = document.getElementById("email");
		var	birthday = document.getElementById("date");
		var	errorUsername = document.getElementById("errorUsername");
		var	errorPassword = document.getElementById("errorPassword");
		var	errorEmail = document.getElementById("errorEmail");
		errorUsername.innerHTML = errorPassword.innerHTML = errorEmail.innerHTML = "";
		var	checkUsername = checkPassword = checkEmail = false;
		
		if (isNull(username.value) && isNull(password.value) && isNull(email.value)) {
			errorInputNull(username, errorUsername, "Username");
			errorInputNull(password, errorPassword, "Password");
			errorInputNull(email, errorEmail, "Email");
		} 
		else {
			setDefaultBackground(username);
			setDefaultBackground(password);
			setDefaultBackground(email);
			setDefaultBackground(birthday);

			if (checkInput(username, errorUsername, "Username"))
				checkUsername = true;
			if (checkInput(password, errorPassword, "Password"))
				checkPassword = true;

			if (isNull(email.value))
				errorInputNull(email, errorEmail, "Email");
			else if (!checkValidateEmail(email.value))
				errorEmail.innerHTML = "Email wrong format";
			else
				checkEmail = true;
		}
		if (checkUsername && checkPassword && checkEmail)
			//callAjax('http://localhost:8080/hienpham/FormAjax/login.php', username.value);
			callAjax('http://thuhien25.esy.es/FormAjax/login.php', username.value);
	}
	function callAjax(url, username) 
	{
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) {
			alert("Khong the khoi tao XMLHttpRequest");
			return false;
		}
		httpRequest.onreadystatechange = alertContents;
		console.log(url + "?username=" + username);
		httpRequest.open("GET", url + "?username=" + username);
		httpRequest.send();
	}
	function alertContents() 
	{
		if (httpRequest.readyState === XMLHttpRequest.DONE) 
		{
			if (httpRequest.status === 200) 
			{
				console.log(httpRequest.responseText);
				var results = document.getElementById("results");
				if (httpRequest.responseText == "false")
					results.innerHTML = "Request success";
				else
					results.innerHTML = "Username already exists"; 
			} else 
				alert("Error request");
		}
	}
	//Check validate-----------------------------------------------------------
	function isNull(text) 
	{
		if (text == null || text == "")
			return true;
		return false;
	}
	function errorInputNull(text, Error, string) 
	{
		text.style.background = "#FDEDEC";
		Error.innerHTML = string + " not null";
	}
	function setDefaultBackground(text) 
	{
		text.style.background = "none";
	}
	function  checkInput(text, error, string) 
	{
		if (isNull(text.value))
			errorInputNull(text, errorUsername, string);
		else if (!checkLength(text.value)) 
			error.innerHTML = string + " length min 8 letter";
		else if (!checkValidate(text.value)) 
			error.innerHTML = string + " wrong format";
		else
			return true;
	}
	function checkLength(text)
	{
		if (text.length < 8)
			return false;
		return true;
	}
	function checkValidate(text)
	{
		var string = /^([0-9a-zA-Z])+$/;
		return string.test(text.value);
	}
	function checkValidateEmail(email)
	{
		var string = /^([0-9a-zA-Z])*@(([a-z])*.([a-z]{3}))*$/;
		return string.test(email);
	}