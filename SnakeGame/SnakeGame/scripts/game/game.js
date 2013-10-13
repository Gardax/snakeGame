var app = app || {};
(function (a) {

    document.addEventListener("deviceready", function() {
        var canvas = document.getElementById("the-game");
        var context = canvas.getContext("2d");

        game = {
            score: 0,
            fps: 4,
            over: true,
            message: "Tap to start",
            paused: false,
            started: false,
            start: function () {
                $("#game").show();
                $("#gameOver").hide();
                $("#content").load("gameOver.html");
                game.over = false;
                game.paused = false;
                game.started = true;
                game.score = 0;
                game.fps = 8;
                snake.init();
                food.set();
            },

            stop: function () {
                $("#game").hide();
                $("#gameOver").show();
                
                $("#scoresHeader").text("Score: " + game.score);
                
                game.over = true;
                game.paused = false;
                game.started = false;
            },

            drawBox: function(x, y, size, color) {
                context.fillStyle = color;
                context.beginPath();
                context.moveTo(x - (size / 2), y - (size / 2));
                context.lineTo(x + (size / 2), y - (size / 2));
                context.lineTo(x + (size / 2), y + (size / 2));
                context.lineTo(x - (size / 2), y + (size / 2));
                context.closePath();
                context.fill();
            },

            drawMessage: function() {
                if (game.message !== null) {
                    context.fillStyle = '#FFFFFF';

                    context.font = (canvas.height / 5) + 'px Impact';
                    context.textAlign = 'center';
                    context.fillText(game.message, canvas.width / 2, canvas.height / 2);
                    context.strokeText(game.message, canvas.width / 2, canvas.height / 2);
                }
            },
            
            drawScore: function() {
                context.fillStyle = '#FFFFFF';
                context.font = (canvas.height / 15) + 'px Arial';
                context.textAlign = 'left';
                context.fillText("Score: "+game.score, 10, 10);
            },

            resetCanvas: function() {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
    });
})(app);