//Game Page
    // Save selected opponent's stats in local storage
        // Set default to first team on dropdown since values change on dropdown change
        let opponentValues = "[Arizona,4,11]";
        localStorage.setItem('opponentValues', JSON.stringify(opponentValues));
        $('#dropdown').change(function() {
            let opponentValues = this.value;
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
        //Ball Position on Page    
            var ballOnTwenty;
            var currentYards;

            let ballPosition = function(){
                if ($(window).width()>489) {
                    ballOnTwenty = 64;
                }
                else if ($(window).width()<440){
                    ballOnTwenty = 140;
                }
                else{
                    var screenHeight = $(window).height();
                    var screenWidth = $(window).width();
                    var backgroundHeight = screenWidth*1.778;
                    var delta = backgroundHeight-screenHeight;
                    var twentyFromBackgroundTop = .2943*backgroundHeight;
                    var twentyFromScreenTop = twentyFromBackgroundTop-delta;
                    var halfLineupImg = ($("#lineup").height()/2)-0;
                    ballOnTwenty = twentyFromScreenTop-halfLineupImg;
                }
                currentYards = (possessionYards)*($(window).height()*.02445);
                var ballAfterPlay = ballOnTwenty+currentYards;
                $("#lineup").css({top:ballAfterPlay});
            }

        //Dynamic position of ball & player image
        $( document ).ready(function(){
            //Put ball on twenty upon page load
            ballPosition();

            //If window resizes during game
            $(window).resize(function(){
                ballPosition();
            });
            
            //Move ball as yardage accrues
                //watch for #in-game-yardage to change
                //add new yardage to netYards
                //rerun ball position
        });



//About Page
    //Show/hide Instructions
    $("#menu-instructions").click(function(){
        $("#instructions").toggle();
    });
    //Show/hide Developer Names
    $("#menu-developers").click(function(){
        $("#developers").toggle();
    });

    