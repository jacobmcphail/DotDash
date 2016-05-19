<script src="tests/jquery-2.2.3.min.js"></script>
<script>	
/*Objects sent should have 3 elements*/
var j_notation =
{
	"mode": 0,
	"player_name": "hats on moles", 
	"player_score": 9,
}; 


$.ajax({
    url: '/dirtyshoes.php',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(j_notation),
    dataType: 'json'
});


</script>