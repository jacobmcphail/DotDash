
var activeConnection = false;
var playerData = [false, false, false, false, false, false, false, false, false, false, 0, 0, 0];

/*
New account creation. Sends data to create a new user record in database.
*/
function createUser(username, password) {
			var j_notation =
		{
		"username": username,
		"password": password, 
		}; 


		$.ajax({
			url: "http://www.crowbot.co/php/panburger.php",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(j_notation),
			dataType: 'json'
		});
}

/*Retrieve username and password information given username entered by user*/
function getUser(username) {
	var j_notation =
		{
		"username": username,
		}; 
	
   return $.ajax({
      type: "POST",
      url: "http://www.crowbot.co/php/shoelace.php",
		contentType: 'application/json',
		data: JSON.stringify(j_notation),
		dataType: 'json'
	});
}
/*
Accepts username and password to create a new account with. If the name given corresponds to an existing record, the user is not allowed to create an account. Maximum length of both username and password is 15 characters.
*/
function createAccount(){
	if(!activeConnection){
	var username = prompt("Enter Username");
	if(username == null || username.localeCompare("") == 0){
		return;
	}
	var password = prompt("Enter Password");
	if(password == null || password.localeCompare("") == 0){
		return;
	}
	if(username.length <= 15 && password.length <= 15) {
	activeConnection = true;
	$("#online-connection").text('Getting online data');	
	getUser(username).success(function (data) {
		if (data[0] == null) {
			createUser(username, password);
			window.alert("Success, please try logging in now");
		} else {
			window.alert("Name has already been taken");
		}
		activeConnection = false;
		$("#online-connection").text('');
	}).fail(function () {
		dataArray = null;
		activeConnection = false;
		$("#online-connection").text('');
		window.alert("Can't connect to server!");
	});
	} else {
		window.alert("Username or password is to long! (Max 15)");
	}
	}
}
/*
Accepts username and password in order to retrieve user's information and update user's record in database.
*/
function login(){
	var username = prompt("Enter Username");
	if(username == null || username.localeCompare("") == 0){
		return;
	}
	var password = prompt("Enter Password");
	if(password == null || password.localeCompare("") == 0){
		return;
	}
	activeConnection = true;
	$("#online-connection").text('Getting online data');
	getUser(username).success(function (data) {
		$("#online-connection").text('');
		activeConnection = false;
		if (data[0] == null) {
			window.alert("User not found");
		} else if(username.localeCompare(data[0]["username"]) == 0 && password.localeCompare(data[0]["password"]) == 0){
			localSavedFiles[0] = false;
			localSavedFiles[1] = data[0]["username"];
			localSavedFiles[2] = data[0]["password"];
			localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
			getPlayerData();
			window.alert("Log in!");
		} else {
			window.alert("Incorrect password and/or username!");
		}
	}).fail(function () {
		dataArray = null;
		activeConnection = false;
		$("#online-connection").text('');
		window.alert("Can't connect to server!");
	});
}

/*
Sends username, passwords, badge data, and score data to update database with.
*/
function sendSaveData(username, password){
		var dataSending = [];
		for(var i = 0; i < 10; i++){
			if(playerData[i]){
				dataSending[i] = 1;
			} else {
				dataSending[i] = 0;
			}
		}
		
		dataSending[10] = playerData[10];
		dataSending[11] = playerData[11];
		dataSending[12] = playerData[12];
		
		var j_notation =
		{
		"username": username,
		"password": password,
		"saveData": dataSending,
		}; 
	
   return $.ajax({
      type: "PUT",
      url: "http://www.crowbot.co/php/sendSave.php",
		contentType: 'application/json',
		data: JSON.stringify(j_notation),
		dataType: 'json'
	});
}
/*
Given username and password, retrieves badge and score data.
*/
function getSaveData(username, password){
		var j_notation =
		{
		"username": username,
		"password": password,
		}; 
	
   return $.ajax({
      type: "POST",
      url: "http://www.crowbot.co/php/getSave.php",
		contentType: 'application/json',
		data: JSON.stringify(j_notation),
		dataType: 'json'
	});
}
/*
Updates records of user who is currently logged in.
*/
function updateSave(){
	if(localSavedFiles[1] != null){
	activeConnection = true;
	$("#online-connection").text('Sending online data');
	sendSaveData(localSavedFiles[1], localSavedFiles[2]).success(function (data) {
		$("#online-connection").text('');
		activeConnection = false;
	}).fail(function () {
		activeConnection = false;
		$("#online-connection").text('');
		window.alert("Can't connect to server!");
	});
	}
}
/*
Retrieves data associated with user who is currently logged in.
*/
function getPlayerData(){
	if(localSavedFiles[1] != null){
	activeConnection = true;
	$("#online-connection").text('Getting online data');
	getSaveData(localSavedFiles[1], localSavedFiles[2]).success(function (data) {
		$("#online-connection").text('');
		activeConnection = false;
		if(data != null){
			
			playerData = $.map(data, function(el) { return el });
			for (var bIndex = 0; bIndex <= 9; bIndex++) {
				if (playerData[bIndex] >= 1) {
					playerData[bIndex] = true;
				} else {
					playerData[bIndex] = false;
				} 
			} 
			updateBadges();
			updateHighScores();
		} else {
			window.alert("Error: Save could not be read!");
		}
	}).fail(function () {
		activeConnection = false;
		$("#online-connection").text('');
		window.alert("Can't connect to server!");
	});
	}
	$("#online-connection").text('');
}
