var canvas = document.getElementById("pong");
var context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;

var Paddle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.y_speed = 0;
    this.score = 0;
    this.key = null;
}
var ball = function(x, y, radius, x_speed, y_speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.x_speed = x_speed;
    this.y_speed = y_speed;
}
Paddle.prototype.computerScoreUpdate = function() {
    context.font = "23px Arial";
    context.fillStyle = "#CC3300";
    context.fillText(this.score, 10, 30);
}
Paddle.prototype.playerScoreUpdate = function() {
    context.font = "23px Arial";
    context.fillStyle = "#CC3300";
    context.fillText(this.score, 480, 30);
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
    
    if(this.y < 0) {
        this.y = 5;
        this.y_speed = -this.y_speed;
    } else if(this.y + 5 > 400) {
        this.y = 395;
        this.y_speed = -this.y_speed;
    }
    if(this.x - 5 < 0) {
        this.x = 250;
        this.y = 200;
        this.x_speed = -3;
        this.y_speed = 0;
        Player.score++;
        console.log(Player.score);
        
    } else if(this.x + 5 > 500) {
        this.x = 250;
        this.y = 200;
        this.x_speed = 3;
        this.y_speed = 0;
        Computer.score++;
        console.log(Computer.score);
    
    }
    
    if(this.x < Player.x + Player.width && this.y > Player.y && this.y < Player.y + Player.height) {
        var yRatio = 3 * ((this.y - Player.y) / 40.0);
        this.y_speed = yRatio;
        this.x_speed *= -1;
        
        
    }
    if(this.x > Computer.x && this.y > Computer.y && this.y < Computer.y + Computer.height) {
        var yRatio = 3 * ((this.y - Player.y) / 40.0);
        this.y_speed = yRatio;
        this.x_speed *= -1;
    }
    
}
Paddle.prototype.keydown = function(event) {
    this.key = event.keyCode;
}
Paddle.prototype.keyup = function(event) {
    this.key = null;
}
Paddle.prototype.move = function(event) {
    if (this.key == 38 && this.y - 5 > 0) {
        this.y -= 5
    } else if (this.key == 40 && this.y + 5 < canvas.height - this.height) {
        this.y += 5;
    }
}
Paddle.prototype.update = function() {
    if (Ball.y < this.y + 40 && this.y > 0 && this.y < 400) {
        this.y -= 3;
    } else if (Math.abs(Ball.y - this.y) < 10) {
        
    } else {
        this.y += 3;
    }
}
Paddle.prototype.gameEnd = function(text) {
    if(this.score === 10) {
        alert(text + " Won!");
        location.reload();
        this.score = 0;
  }
}

ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill();
}
var Ball = new ball(250, 200, 10, -5, 0);
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
    Player.move();
    Player.render();
    Player.playerScoreUpdate();
    Player.gameEnd("Computer");
    Computer.render();
    Computer.update();
    Computer.computerScoreUpdate();
    Computer.gameEnd("Player");
    animate(step);
}

window.onload = function() {
    animate(step);
};

window.addEventListener('keydown', Player.keydown.bind(Player), false);
window.addEventListener('keyup', Player.keyup.bind(Player), false);

