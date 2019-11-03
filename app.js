// Enemies our player must avoid
var Enemy = function Enemy(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //**************** */

    //Update the enemy movement speed
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -150;
        this.speed = 150 + Math.floor(Math.random() * 800);
    }


    this.checkCollision();
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.handleInput = function(dt) {};

// function to check the collision and display an alert message
Enemy.prototype.checkCollision = function() {
    if (player.y + 131 >= this.y + 90 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11) {

        alert("Sorry for the loss 🥺🥺, press ok to play again 🤩 ");
        resetPos();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player() {
    // render the charcter
    this.sprite = 'images/char-boy.png';
    // sets right and left movement to the width of one block
    this.rightLeft = 101;
    // sets up and down movement to the width of one block
    this.upDown = 83;
    // sets initial player position
    this.x = 2 * this.rightLeft;
    this.y = 4 * this.upDown + 54;

}


Player.prototype.update = function(dt) {

};


Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this function to handle the input keys 
Player.prototype.handleInput = function(move) {

    switch (move) {
        case "left":
            if (this.x > 0) {
                this.x -= this.rightLeft;
            }
            break;
        case "right":
            if (this.x < 4 * this.rightLeft) {
                this.x += this.rightLeft;
            }
            break;
        case "up":
            if (this.y > -85) {
                this.y = this.y - 80;
                this.win();

            }
            break;
        case "down":
            if (this.y < 4 * this.upDown) {
                this.y += this.upDown;
            }
            break;
        default:
            break;
    }


}

// a winnig function, when the player reach to the lake it will invoked  
Player.prototype.win = function() {
    setTimeout(() => {
        if (this.y <= -10) {
            alert("YAY!! you have won!🥳, press ok to play again 🤩 ");
            resetPos();
        }
    }, 300);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// create the enemys
let allEnemies = [new Enemy(10, 50, 400), new Enemy(10, 140, 400), new Enemy(10, 220, 400)];

//create a player object from constructor function 
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// a rest function it will invocked when player win or loose
function resetPos() {
    this.rightLeft = 101;
    this.upDown = 83;
    player.x = 2 * this.rightLeft;
    player.y = 4 * this.upDown + 54;
    allEnemies = [];
    allEnemies.push(
        new Enemy(10, 50, 400), new Enemy(10, 140, 400), new Enemy(10, 220, 400)
    );

}