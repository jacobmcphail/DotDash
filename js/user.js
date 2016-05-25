

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

function checkUser(username, password){
	getUser(username).success(function (data) {
		console.log(data);
		return data;
	}).fail(function () {
		window.alert("Can't connect to server!");
		return null;
	});
}

function getUser(username) {
   return $.ajax({
      type: "GET",
      url: "http://www.crowbot.co/php/shoelace.php",
      dataType: "json",
      data: {
		  username : username
	  }
	});
}

function createAccount(){
	var username = prompt("NAME NOW");
	var password = prompt("PASSWORD");
	var dataArray = checkUser(username, password);
	if(dataArray == null){
		createUser(username, password).success(function() {
			window.alert(username, password);
		}).fail(function () {
			window.alert("Can't connect to server!");
		});
	} else {
		window.alert("NAME TAKEN");
	}
}

function login(){
	var username = prompt("NAME NOW");
	var password = prompt("PASSWORD");
	var dataArray = checkUser(username, password);
	if(dataArray == null){
		window.alert("ERROR");
		return;
	}
	if(username.localeCompare(dataArray[0]) && password.localeCompare(dataArray[1])){
		// do things
		window.alert(username, password);
	} else {
		window.alert("IT WRONG");
	}
}


