class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };


  update(dt) {

    // collision checker
    if (player.x < this.x + 75 &&
      player.x + 75 > this.x &&
      player.y < this.y + 65 &&
      // reset player to origin
      player.y + 65 > this.y) {
      player.x = 200;
      player.y = 400;
    };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // makes the bugs loop back again
    if (this.x >= 505) {
      this.speed = Math.random() * 350;
      this.x = -150;
    }


  };

  // Renders the enemy into the game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
  };

  // update function needed but there are no function inside
  update(dt) {

  };
  // render player to game, same as enemy
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Makes the arrow inputs work, and reset game
  handleInput(pressKey) {

    // this.x and this.y makes so that you can't go outside screen
    // each tile is 101 long so you move one tile


    if (pressKey == 'left' && this.x > 0) {
      this.x -= 101;
    }

    // no need for limitation because if y < 0 it reset
    if (pressKey == 'up') {
      this.y -= 101;
    }


    if (pressKey == 'right' && this.x < 350) {
      this.x += 101;
    }

    if (pressKey == 'down' && this.y < 400) {
      this.y += 101;
    }

    // puts you back to begning when you are done
    if (this.y < 0) {
      this.x = 200;
      this.y = 400;

    }
  };
};

// Now instantiate your objects.
const bug1 = new Enemy(70, 65, 250);
const bug2 = new Enemy(30, 145, 100);
const bug3 = new Enemy(500, 230, 400);

// Place all enemy objects in an array called allEnemies
let allEnemies = new Set();
allEnemies.add(bug1);
allEnemies.add(bug2);
allEnemies.add(bug3);

// Place the player object in a variable called player
const player = new Player(200, 400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
