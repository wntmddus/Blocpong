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
var ball = function(x, y, radius, x_speed, y_speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.x_speed = x_speed;
    this.y_speed = y_speed;
}
Paddle.prototype.render = function() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.fill();
}
ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
    
    if(this.y - 20 < 0) {
        this.y = 5;
        this.y_speed = -this.y_speed;
    } else if(this.y + 5 > 400) {
        this.y = 395;
        this.y_speed = -this.y_speed;
    }
   /* if(this.x - 5 < 0) {
        this.x = 5;
        this.x_speed = -this.x_speed;
    } else if(this.x + 5 > 500) {
        this.x = 495;
        this.x_speed = -this.x_speed;
    }*/
    
    if(this.x < Player.x + Player.width && this.y > Player.y && this.y < Player.y + Player.height) {
        var yRatio = 3 * ((this.y - Player.y) / 40.0);
        console.log(yRatio);
        this.y_speed = yRatio;
        console.log(this.y_speed);
        this.x_speed *= -1;
        
        
    }
    if(this.x > Computer.x && this.y > Computer.y && this.y < Computer.y + Computer.height) {
        this.y_speed *= -1;
        this.x_speed *= -1;
    }
    
}
Paddle.prototype.move = function(event) {
    if (event.keyCode == 38 && this.y - 5 > 0) {
        this.y -= 10;
    } else if (event.keyCode == 40 && this.y + 5 < canvas.height - this.height) {
        this.y += 10;
    }
}

ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill();
}
var Ball = new ball(250, 200, 20, -3, 0);
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
    Ball.update();
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