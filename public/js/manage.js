document.addEventListener('DOMContentLoaded', function(){

    console.log("Users: " + data)
    let usersList = JSON.parse(data)

    var deleteActions = document.querySelectorAll('.delete-btn')
    for(let i = 0; i < deleteActions.length; i++){
        deleteActions[i].addEventListener('click', function() {
            console.log("This was clicked", this)
            var row = this.parentNode.parentNode.parentNode;
            console.log("This row was clicked: ", row)
            var user_id = row.childNodes[1].innerText
            console.log(user_id)

            // Delete the user 
        
            $.ajax({
                url: '/users/' + user_id,
                type: 'DELETE',
                success: function(result) {
                    console.log(result)
                    location.reload(true)
                }
            });
        })
    }

})