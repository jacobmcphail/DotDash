
var activeConnection = false;
var playerData = [false, false, false, false, false, false, false, false, false, false, 0, 0, 0];

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

function checkUser(username, password, info){
	getUser(username).success(function (data) {
		console.log("REC: " + data);
		info = data;
		console.log("INF: " + info);
	}).fail(function () {
		info = null;
		window.alert("Can't connect to server!");
	});
}

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

function createAccount(){
	var username = prompt("NAME NOW");
	if(username == null){
		return;
	}
	var password = prompt("PASSWORD");
	if(password == null){
		return;
	}
	getUser(username).success(function (data) {
		console.log(data);
		if (data[0] == null) {
			createUser(username, password);
		} else {
			window.alert("NAME TAKEN");
		}
	}).fail(function () {
		dataArray = null;
		window.alert("Can't connect to server!");
	});
}

function login(){
	var username = prompt("NAME NOW");
	if(username == null){
		return;
	}
	var password = prompt("PASSWORD");
	if(password == null){
		return;
	}
	activeConnection = true;
	$("#online-connection").text('Getting online data');
	getUser(username).success(function (data) {
		$("#online-connection").text('');
		activeConnection = false;
		if (data[0] == null) {
			window.alert("User not found");
		} else if(username.localeCompare(data[0]["username"]) && password.localeCompare(data[0]["password"])){
			// do things
			window.alert("Log in!");
		} else {
			window.alert("Incorrect password!");
		}
	}).fail(function () {
		dataArray = null;
		activeConnection = false;
		$("#online-connection").text('');
		window.alert("Can't connect to server!");
	});
}


function sendSaveData(username, password){
		var j_notation =
		{
		"username": username,
		"password": password,
		"saveData": playerData,
		}; 
	
   return $.ajax({
      type: "POST",
      url: "http://www.crowbot.co/php/sendSave.php",
		contentType: 'application/json',
		data: JSON.stringify(j_notation),
		dataType: 'json'
	});
}

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

function updateSave(){
	if(localSavedFiles[1] != null){
	activeConnection = true;
	$("#online-connection").text('Sending online data');
	sendSaveData(localSavedFiles[1], localSavedFiles[2]).success(function () {
		$("#online-connection").text('');
		activeConnection = false;
	}).fail(function () {
		activeConnection = false;
		$("#online-connection").text('');
		window.alert("Can't connect to server!");
	});
	}
}

function getPlayerData(){
	if(localSavedFiles[1] != null){
	activeConnection = true;
	$("#online-connection").text('Getting online data');
	getSaveData(localSavedFiles[1], localSavedFiles[2]).success(function (data) {
		$("#online-connection").text('');
		activeConnection = false;
		if(data[0] != null){
			playerData = data;
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
}
