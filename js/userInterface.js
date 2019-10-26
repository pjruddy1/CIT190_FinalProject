$(document).ready(function(){
    
    $("#whackAGopher").click(function(){
        $.ajax({
            url: "whackAGopher.html",
            success: function(result){
                $("#content").html(result);
            }});
      });
    $("#runningMan").click(function(){
        $.ajax({
            url: "runningMan.html",
            success: function(result){
                $("#content").html(result);
            }});
        });
        $("#flappyDuck").click(function(){
            $.ajax({
                url: "flappyDuck.html",
                success: function(result){
                    $("#content").html(result);
                }});
            });
            $("#readMe").click(function(){
                $("#readMeContent").load("readMe.txt");
            });
            $("#closeReadMe").click(function(){
                $("#readMeContent").hide();
            });
});