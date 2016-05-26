

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
	var password = prompt("PASSWORD");
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
	var password = prompt("PASSWORD");
	getUser(username).success(function (data) {
		console.log(data);
		if (data[0] == null) {
			window.alert("IT WRONG");
		} else if(username.localeCompare(data[0]["password"]) && password.localeCompare(data[0]["username"])){
			// do things
			
		} else {
			window.alert("IT WRONG");
		}
	}).fail(function () {
		dataArray = null;
		window.alert("Can't connect to server!");
	});
}


