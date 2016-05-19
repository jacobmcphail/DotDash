function getOutput() {
   $.ajax({
      url:'../php/dirtyshoes.php',
      complete: function (response) {
		  return response.responseText;
      },
      error: function () {}
  });
  return null;
}