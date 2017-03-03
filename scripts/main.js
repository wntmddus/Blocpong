var canvas = document.getElementById("pong");
var context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;

var Paddle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Paddle.prototype.render = function() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.fill();
}
Paddle.prototype.move = function(event) {
    if (event.keyCode == 38 && this.y - 5 > 0) {
        this.y -= 10;
    } else if (event.keyCode == 40 && this.y + 5 < canvas.height - this.height) {
        this.y += 10;
    }
}
var ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}
ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill();
}
var Ball = new ball(250, 200, 20);
var Player = new Paddle(0, 160, 20, 80);
var Computer = new Paddle(480, 160, 20, 80);

function drawline() {
    context.beginPath();
    context.moveTo(canvas.width/2, 0);
    context.lineWidth = 5;
    context.lineTo(canvas.width/2, canvas.height);
    context.strokeStyle = "grey";
    context.stroke();
}

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };



var step = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawline();
    Ball.render();
    Player.render();
    Computer.render();
    animate(step);
}

window.onload = function() {
    animate(step);
};

window.addEventListener('keydown', Player.move.bind(Player), false);

window.addEventListener('keyup', function(event) {
       
}, false);