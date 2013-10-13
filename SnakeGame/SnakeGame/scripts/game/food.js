(function () {
    var canvas = document.getElementById("the-game");
    var context = canvas.getContext("2d");
    food = {

        size: null,
        x: null,
        y: null,
        color: '#0FF',

        set: function () {
            food.size = snake.size;
            var width = canvas.width;
            var height = canvas.height;
            //food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
            //food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
            
            var x = getRandomInt(snake.size, width);
            food.x = x - (x % snake.size);
            var y = getRandomInt(snake.size, height);
            food.y = y - (y % snake.size);
        },

        draw: function () {
            game.drawBox(food.x, food.y, food.size, food.color);
        }

    };
})();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}