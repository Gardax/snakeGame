
var app = app || { };
(function (a) {
    document.addEventListener("deviceready", function() {
        var canvas = document.getElementById("the-game");
        var context = canvas.getContext("2d");

        window.addEventListener("batterylow", onBatteryLow, false);

        function onBatteryLow(info) {
            // Handle the battery low event
            alert("Battery low! Plug in device or the game will close to save battery soon!");
        }
        
        window.addEventListener("batterycritical", onBatteryCritical, false);

        function onBatteryCritical(info) {
            // Handle the battery critical event
            alert("Your battery is critically low! The game will close!");
            navigator.app.exitApp();
        }

        var inverseDirection = {
            'up': 'down',
            'left': 'right',
            'right': 'left',
            'down': 'up'
        };

        var keys = {
            up: [38],
            down: [40],
            left: [37],
            right: [39],
           
        };

        function getKey(value) {
            for (var key in keys) {
                if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0) {
                    return key;
                }
            }
            return null;
        }

        addEventListener("keydown", function(e) {
            var lastKey = getKey(e.keyCode);
            if (['up', 'down', 'left', 'right'].indexOf(lastKey) >= 0
                && lastKey != inverseDirection[snake.direction]) {
                snake.direction = lastKey;
            } 
        }, false);


        $("canvas").on("touchstart", false);
        $("canvas").kendoTouch({
            tap: function(e) {
                if (game.started == false) {
                    game.start();
                } else {
                    if (game.paused == false) {
                        game.paused = true;
                    } else {
                        game.paused = false;
                    }
                }
            }
        });

        function AccelerometerApp() {

        }

        AccelerometerApp.prototype = {
            watchID: null,
            spanX: null,
            spanY: null,
            spanZ: null,
            spanTimeStamp: null,

            run: function() {
                var that = this;
                that._startWatch.apply(that, arguments);
                console.log("run");
            },

            // Start watching the acceleration
            _startWatch: function() {
                // Only start testing if watchID is currently null.

                var that = this;
                if (that.watchID === null) {
                    // Update acceleration every .1 second
                    var options = { frequency: 20 };
                    console.log(navigator);
                    console.log(navigator.accelerometer);
                    that.watchID = navigator.accelerometer.watchAcceleration(function() {
                        that._onAccelerometerSuccess.apply(that, arguments);
                    },
                        function(error) {
                            that._onAccelerometerError.apply(that, arguments);
                        },
                        options);
                }
            },

            //Get a snapshot of the current acceleration
            _onAccelerometerSuccess: function(acceleration) {
                var that = this;
                var x = acceleration.x;
                var y = acceleration.y;
                var direction = 'up';
                if (Math.abs(x) > Math.abs(y)) {
                    if (x < 0) {
                        direction = 'up';
                    } else {
                        direction = 'down';
                    }
                } else {
                    if (y < 0) {
                        direction = 'left';
                    } else {
                        direction = 'right';
                    }
                }
                console.log(direction);
                if (direction != inverseDirection[snake.direction]) {
                    snake.direction = direction;
                }
            },

            //Failed to get the acceleration
            _onAccelerometerError: function(error) {
                //check if we're running in simulator
                if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
                    alert(error);
                    this._stopWatch.apply(this, arguments);
                } else
                    alert("Unable to start accelerometer! Error code: " + error.code);
            }
        }


        var accelerometerHelper = new AccelerometerApp();
        accelerometerHelper.run();

        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame;

        function loop() {
            if (game.over == false) {
                if (game.paused == false) {
                    game.resetCanvas();
                    snake.move();
                    food.draw();
                    snake.draw();
                    game.drawScore();
                }
            } else {
                game.drawMessage();
            }


            setTimeout(function() {
                requestAnimationFrame(loop);
            }, 1200 / game.fps);
        }

        requestAnimationFrame(loop);

        $("#content").show();
        $("#content").load("gameOver.html");
    });
})(app);
