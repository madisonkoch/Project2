//All Pages
    //Make non-game-main the entire height of screen
    $(function(){
        var windowH = $(window).height();
        var divH = $('.non-game-main').height();
        if(windowH > divH) {                            
            $('.non-game-main').css({'height':($(window).height())+'px'});
        }                                                                               
        $(window).resize(function(){
            var windowH = $(window).height();
            var divH = $('.non-game-main').height();
            var differenceH = windowH - divH;
            var newH = divH + differenceH;
            var truecontentH = $('#truecontent').height();
            if(windowH > truecontentH) {
                $('.non-game-main').css('height', (newH)+'px');
            }
        })          
        // $(function(){
        //     var bodyH = $(body).height();
        //     var divH = $('.non-game-main').height();
        //     if(bodyH > divH) {                            
        //         $('.non-game-main').css({'height':($(body).height())+'px'});
        //     }                                                                               
        //     $(body).resize(function(){
        //         var bodyH = $(body).height();
        //         var divH = $('.non-game-main').height();
        //         var differenceH = bodyH - divH;
        //         var newH = divH + differenceH;
        //         var truecontentH = $('#truecontent').height();
        //         if(bodyH > truecontentH) {
        //             $('.non-game-main').css('height', (newH)+'px');
        //         }
        //     })          
        });

//Game Page
    //Make lineup-div entrie height of screen
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
    // Save selected opponent's stats in local storage
        // Set default to first team on dropdown since values change on dropdown change
        let opponentValues = "[Arizona,4,11]";
        localStorage.setItem('opponentValues', JSON.stringify(opponentValues));
        $('#dropdown').change(function() {
            let opponentValues = this.value;
            localStorage.setItem('opponentValues', JSON.stringify(opponentValues));
            console.log(opponentValues);
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
        //Ball Position on Page    
            var ballOnTwenty;
            var currentYards;                    
            var screenHeight;
            var screenWidth;
            var backgroundHeight;
            var delta;
            var twentyFromBackgroundTop;
            var twentyFromScreenTop;
            var halfLineupImg;
            ballOnTwenty;


            let ballPosition = function(){
                if ($(window).width()>489) {
                    ballOnTwenty = 100;
                    document.getElementById('lineup').style.marginLeft = "27.5%";
                }
                else if ($(window).width()<377){
                    screenHeight = $(window).height();
                    var backgroundWidth = 378;
                    backgroundHeight = screenWidth*1.778;
                    delta = backgroundHeight-screenHeight;
                    twentyFromBackgroundTop = .2889*backgroundHeight;
                    twentyFromScreenTop = twentyFromBackgroundTop-delta;
                    halfLineupImg = ($("#lineup").height()/2);
                    ballOnTwenty = twentyFromScreenTop-halfLineupImg;
                    lineupWidth = $("#lineup").width();
                    screenWidth = $(window).width();
                    var leftMargin = (screenWidth-lineupWidth)/2;
                    let leftMarginString = leftMargin + "px";
                    document.getElementById('lineup').style.marginLeft = leftMarginString;
                }
                else{
                    var screenHeight = $(window).height();
                    var screenWidth = $(window).width();
                    var backgroundHeight = screenWidth*1.778;
                    var delta = backgroundHeight-screenHeight;
                    var twentyFromBackgroundTop = .2889*backgroundHeight;
                    var twentyFromScreenTop = twentyFromBackgroundTop-delta;
                    var halfLineupImg = ($("#lineup").height()/2);
                    ballOnTwenty = twentyFromScreenTop-halfLineupImg;
                    document.getElementById('lineup').style.marginLeft = "27.5%";

                }
                currentYards = (possessionYards)*($(window).height()*.0076);
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

    