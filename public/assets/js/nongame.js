//Game Page
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
    //Ball & Player Image
        //Make div around image the entire height of screen
            $(function(){
                var windowH = $(window).height();
                var divH = $('#lineup-div').height();
                if(windowH > divH) {                            
                    $('#lineup-div').css({'height':($(window).height())+'px'});
                }                                                                               
                $(window).resize(function(){
                    var windowH = $(window).height();
                    var divH = $('#lineup-div').height();
                    var differenceH = windowH - divH;
                    var newH = divH + differenceH;
                    var truecontentH = $('#truecontent').height();
                    if(windowH > truecontentH) {
                        $('#lineup-div').css('height', (newH)+'px');
                    }
            
                })          
            });

        // let factor = (1558/1242);
        // var y = $("body").width * factor;
        // $("#lineup").css({bottom:y});

//About Page
    //Show/hide Instructions
    $("#menu-instructions").click(function(){
        $("#instructions").toggle();
    });
    //Show/hide Developer Names
    $("#menu-developers").click(function(){
        $("#developers").toggle();
    });

    