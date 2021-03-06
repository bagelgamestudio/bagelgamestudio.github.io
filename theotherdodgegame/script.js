window.onload = function() {
  
  var canvas = document.getElementById("paper");
  var c = canvas.getContext("2d");
  
  var p = [];
  
  var player = {
    x: 50,
    y: 295,
    width: 20,
    height: 20,
    keyDown: null,
    alive: true,
    score: 0,
    shotReady: true,
    draw: function() {
      var i;
      for(i = 0; i < rocks.length; i++) {
        player.collision(i);
      }
      
      c.fillStyle = "white";
      c.fillRect(player.x, player.y, player.width, player.height);
    },
    collision: function(i) {
      if(player.x <= rocks[i].x + rocks[i].width && player.x + player.width >= rocks[i].x && player.y <= rocks[i].y + rocks[i].height && player.y + player.height >= rocks[i].y) {
        if(rocks[i].type === "rock") {
          player.alive = false;
          player.explode();
        } else {
          player.score += 500;
          rocks.splice(i, 1);
        }
      }
    },
    explode: function () {
      var i;
      for(i = 0; i < 150; i++) {
        p.push({
          x: player.x + 5,
          y: player.y + 5,
          vx: Math.random()*10 - 5,
          vy: Math.random()*5-2.5,
          isBullet: false,
        });
      }
    },
    shoot: function() {
      p.push({
        x: player.x + 9,
        y: player.y + 9,
        vx: 10,
        vy: 0,
        height: 3,
        width: 3,
        isBullet: true,
        collision: function(j) {
          var i;
          for(i = 0; i < rocks.length; i++) {
            
            if(p[j].x <= rocks[i].x + rocks[i].width && p[j].x + p[j].width >= rocks[i].x && p[j].y <= rocks[i].y + rocks[i].height && p[j].y + p[j].height >= rocks[i].y) {
              rocks.splice(i, 1);
              p.splice(j, 1);
            }
            
          }
        }
      });
    },
  };
  
  document.body.addEventListener('keydown', function(e) {
    switch(e.which) {
      case 38:
        if(player.keyDown === null) {
          player.keyDown = setInterval(function() {
            if(player.y > 0)
              player.y -= 7;
          }, 30);
        }
        break;
      case 40:
        if(player.keyDown === null) {
          player.keyDown = setInterval(function() {
            if(player.y + player.height < canvas.height)
              player.y += 7;
          }, 30);
        }
        break;
      case 32:
        if(player.shotReady === true && player.alive) {
          //player.shoot();
        }
      default:
    }
  });
  
  document.body.addEventListener('keyup', function(e) {
    switch(e.which) {
      case 38:
      case 40:
        clearInterval(player.keyDown);
        player.keyDown = null;
        break;
      default:
    }
  });
  
  function Rock(type) {
    this.x = canvas.width;
    this.y = Math.random() * canvas.height - 10;
    this.width = Math.random() * 15 + 10;
    this.height = Math.random() * 15 + 10;
    this.speed = 5;
    this.type = type;
    this.i = rocks.length;
  }
  
  Rock.prototype.collision = function(i) {
    if(this.x + this.width <= -50) {
      this.x = canvas.width;
      this.y = Math.random() * canvas.height - 10;
      console.log(this.i);
      if(this.type !== "rock") {
        rocks.splice(i, 1);
      }
    }
  };
  
  Rock.prototype.draw = function(i) {
    this.move();
    this.collision(i);
    
    if(this.type === "rock") {
      c.fillStyle = "red";
    } else {
      c.fillStyle = "green";
    }
    c.font = "15px Arial";
    //c.fillText(this.i, this.x, this.y);
    
    c.fillRect(this.x, this.y, this.width, this.height);
  };
  
  Rock.prototype.move = function() {
    this.x -= this.speed;
    if(this.speed <= 7) {
      this.speed *= 1.0001;
    }
  };
  
  var rocks = [];
  
  var rockAmount = 80;
  var rockCounter = 0;
  
  function makeRocks() {
    setTimeout(function() {
      rocks.push(new Rock("rock"));
      rockCounter++;
      
      if(rockCounter < rockAmount) {
        makeRocks();
      }
    }, 1000);
  }
  
  makeRocks();
  
  setInterval(function() {
    rocks.push(new Rock("not a rock lololol"));
  }, 5000);
  
  setInterval(function(){
    c.fillStyle = "rgba(0, 0, 0, 0.3)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    if(player.alive) {
      player.draw();
      player.score += 1;
    }
    
    var i;
    for(i = 0; i < rocks.length; i++) {
      rocks[i].draw(i);
    }
    
    for(i = 0; i < p.length; i++) {
        p[i].x += p[i].vx;
        p[i].y += p[i].vy;
        //p[i].vy += 0.1;
      if(p[i].isBullet === false) {
        p[i].x -= rocks[0].speed * 0.9;
        p[i].vx *= 0.98;
        p[i].vy *= 0.95;
      } else {
        p[i].collision(i);
      }   
      
      c.fillStyle = "white";
      c.fillRect(p[i].x, p[i].y, 3, 3);
    }
    
    //document.getElementById("rockCounter").innerHTML = "Amount of obsticles: " + rocks.length;
    
    c.fillStyle = "white";
    c.fillText(player.score, 20, 20);
  }, 30);
};
