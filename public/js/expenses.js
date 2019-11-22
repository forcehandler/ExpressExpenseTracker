document.addEventListener('DOMContentLoaded', function(){

    var fab = document.querySelectorAll('.fixed-action-btn')
    var fab_instance = M.FloatingActionButton.init(fab)

    var modal = document.querySelectorAll('.modal');
    var modal_instance = M.Modal.init(modal)

    console.log(fab)
})