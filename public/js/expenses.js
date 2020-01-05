document.addEventListener('DOMContentLoaded', function(){

    var fab = document.querySelectorAll('.fixed-action-btn')
    var fab_instance = M.FloatingActionButton.init(fab)

    var modal = document.querySelectorAll('.modal');
    var modal_instance = M.Modal.init(modal)

    console.log(fab)

    var dropdown = document.querySelectorAll("select");
    var dropdown_instance = M.FormSelect.init(dropdown);
    

    var datepicker = document.querySelectorAll('.datepicker');
    var datepicker_instance = M.Datepicker.init(datepicker, {format: 'yyyy-mm-dd'});

    console.log("Expenses: " + test)
    let expenseList = JSON.parse(test)

    var deleteActions = document.querySelectorAll('.delete-btn')
    for(let i = 0; i < deleteActions.length; i++){
        deleteActions[i].addEventListener('click', function() {
            // console.log("This was clicked", this)
            var row = this.parentNode.parentNode;
            // console.log("This row was clicked: ", row)
            var expense_id = row.childNodes[1].innerText
            console.log(expense_id)

            // Delete the expense 
        
            $.ajax({
                url: '/expenses/' + expense_id,
                type: 'DELETE',
                success: function(result) {
                    console.log(result)
                    location.reload(true)
                }
            });
        })
    }

    var editActions = document.querySelectorAll('.edit-btn')
    for(let i = 0; i < editActions.length; i++) {
        editActions[i].addEventListener('click', function() {
            // console.log("This was clicked", this)
            var row = this.parentNode.parentNode.parentNode;
            console.log("This row was clicked: ", row)
            var expense_id = row.childNodes[1].innerText
            console.log(expense_id)

            // Get the expense object from expenses list obtained from ejs file
            console.log(expenseList[0])
            let idX = expenseList.findIndex(rec => rec.id == expense_id)
            console.log(idX)
            const keys = Object.keys(expenseList[idX])
            const length = keys.length
            for(let i = 0; i < length; i++){
                const key = keys[i]
                console.log("key: " + key)
                console.log(" form element: ", document.getElementsByName(key))
                let formElement = document.getElementsByName(key)
                if(formElement.length != 0){
                    formElement[1].value = expenseList[idX][key]
                }
                
            }

            // refresh text fields
            M.updateTextFields()

            //update the category
            var category_instance = document.getElementById('categorySelect')
            category_instance.value=expenseList[idX].categoryID
            M.FormSelect.init(dropdown);
        })
    }

})