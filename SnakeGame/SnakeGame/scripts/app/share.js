(function() {
    $("#capturePhotoButton").on("click", function() {
        cameraApp.run();
    });

    $("#shareScore").on("click", function () {
        
        if ($("#name").val().length > 25) {
            alert("Too long name!");
            return;
        }
        if ($("#name").val().length < 4) {
            alert("Too short name!");
            return;
        }

        var object = { "Name": $("#name").val(), "Score": game.score, "Picture": cameraApp.base64 };

        $("#content").html("<img src='../images/loading.gif' width='100'>");
        $.ajax({
            type: "POST",
            url: 'https://api.everlive.com/v1/kZcKddkMFRsuFeil/Scores',
            headers: { "Authorization": "Bearer ${AccessToken}" },
            contentType: "application/json",
            data: JSON.stringify(object),
            success: function(data) {
                //console.log(JSON.stringify(data));
                alert("Shared!");
                game.resetCanvas();
                $("#gameOver").hide();
                $("#game").show();
            },
            error: function(error) {
                //console.log(JSON.stringify(error));
                alert("An error has occured!");
                game.resetCanvas();
                $("#gameOver").hide();
                $("#game").show();
                
            }
        });
        
    });
})();


