// Save selected opponent's stats in local storage
    $('#dropdown').change(function() {
        var opponentValues = this.value;
    localStorage.setItem('opponentValues', JSON.stringify(opponentValues));
    // append to different screen
    });


//Close pre-game modal after
    var modal = document.getElementById('pre-game-modal');

    // When the user clicks anywhere outside of the modal, close it
    $('#close-btn').onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


//About Page
    //Show/hide Instructions
    $("#menu-instructions").click(function(){
        $("#instructions").toggle();
    });
    //Show/hide Developer Names
    $("#menu-developers").click(function(){
        $("#developers").toggle();
    });

    