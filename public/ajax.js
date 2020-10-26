$('#new-comment').submit(function(e) {
	e.preventDefault();

	var comment = $(this).serialize();

	$.post('/feedback', comment, function(data) {
		$('#comments-list').append(
			`
            <li> <%= c.text %> 
            <form style="display: inline" action="/feedback/`<%= c._id %>`?_method=DELETE" method="post">
            <button>Delete</button>
            </form>
            </li>
            
			`
			)
		$('#new-comment').find('text-area').val('');
	});
});



$('#new-comment').on('submit', '.delete', function(e) {
	e.preventDefault();
	
		var actionUrl = $(this).attr('action');
		$itemToDelete = $(this).closest('li');
		$.ajax({
			url: actionUrl,
			type: 'DELETE',
			itemToDelete: $itemToDelete,
			success: function(data) {
				this.itemToDelete.remove();
			}
		})
	
})