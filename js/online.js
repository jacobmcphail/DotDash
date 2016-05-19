function getOutput(database) {
   return $.ajax({
      type: "GET",
      url: "../php/readDB.php",
      dataType: "json",
      data: {
		  database : database
	  }
	});
}