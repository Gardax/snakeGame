(function() {
    $("#playAgain").on("click", function () {
        game.resetCanvas();
        $("#gameOver").hide();
        $("#game").show();
    });

    $("#share").on("click", function () {
        $("#content").load("share.html");

    });
})();
