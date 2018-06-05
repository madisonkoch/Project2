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
        //Start of Game - ball on 20 yard line & no yards gained/lossed
            var netYards = 0;

            var screenHeight = $(window).height();
            var screenWidth = $(window).width();
            var backgroundHeight = screenWidth*1.778;
            var delta = backgroundHeight-screenHeight;
            var twentyFromBackgroundTop = .2943*backgroundHeight;
            var twentyFromScreenTop = twentyFromBackgroundTop-delta;
            var halfLineupImg = ($("#lineup").height()/2)-7;
            var ballOnTwenty = twentyFromScreenTop-halfLineupImg;
            $("#lineup").css({top:ballOnTwenty});

        //dynamic position of ball & player image
        // $( document ).ready(function(){
            //Move ball/players with yardage

            //If window resizes during game
            $(window).resize(function(){
                if ($(window).width()>489){
                    $("#lineup").css({top:"64px"});
                }
                else if (($(window).width()<440)){
                    $("#lineup").css({top:"140px"});
                }
                else{
                    var screenHeight = $(window).height();
                    var screenWidth = $(window).width();
                    var backgroundHeight = screenWidth*1.778;
                    var delta = backgroundHeight-screenHeight;
                    var twentyFromBackgroundTop = .2943*backgroundHeight;
                    var twentyFromScreenTop = twentyFromBackgroundTop-delta;
                    var halfLineupImg = ($("#lineup").height()/2)-0;
                    var ballOnTwenty = twentyFromScreenTop-halfLineupImg;
                    var ballAfterPlay = ballOnTwenty+netYards;
                    $("#lineup").css({top:ballOnTwenty});
                }
            });
        // }


//About Page
    //Show/hide Instructions
    $("#menu-instructions").click(function(){
        $("#instructions").toggle();
    });
    //Show/hide Developer Names
    $("#menu-developers").click(function(){
        $("#developers").toggle();
    });

    