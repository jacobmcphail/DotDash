function getOutput(database) {
   return $.ajax({
      type: "GET",
      url: "http://www.crowbot.co/php/readDB.php",
      dataType: "json",
      data: {
		  database : database
	  }
	});
}