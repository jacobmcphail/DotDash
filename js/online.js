function getOutput() {
   $.ajax({
      url:'myAjax.php',
      complete: function (response) {
          console.log("Connect: SUCCESS");
		  return response;
      },
      error: function () {
          console.log("Connect: FAILED");
		  return null;
      }
  });
  return null;
}