window.onload = function() {
  var canvas = document.getElementById("paper");
  var c = canvas.getContext("2d");
  
  
  
  
  
  function rotatePoint(pivot, point, angle) {
    // Rotate clockwise, angle in radians
    var x = point[0]*Math.cos(angle) - point[1]*Math.sin(angle);
    var y = point[0]*Math.sin(angle) + point[1]*Math.cos(angle);
    return [x, y];
  }
  
  
  
  
  
  var player1 = {
  	width: 60,
    height: 30,
  	x: 100,
    y: 100,
    d: 0,
    vx: 0,
    vy: 0,
    vd: 0,
    gravity: 0,
    boostAmount: 100,
    xDown: null,
    yDown: null,
    dDown: null,
    bDown: null,
    onGround: false,
    topRight: {
      x: 30,
      y: -15,
    },
    topLeft: {
      x: -30,
      y: -15,
    },
    bottomRight: {
      x: 30,
      y: 15,
    },
    bottomLeft: {
      x: 30,
      y: -15,
    },
    moveLeft: function() {
    
    },
    moveRight: function() {
    
    },
    rotateLeft: function() {
    	player1.vd -= 1;
    },
    rotateRight: function() {
    	player1.vd += 1;
    },
    jump: function() {
    
    },
    boost: function() {
    	player1.vx += (Math.abs(Math.abs(player1.d) % 360 - 180) - 90) * 0.01;
      player1.vy += (Math.abs(Math.abs(player1.d - 90) % 360 - 180) - 90) * 0.01;
    },
    draw: function() {
      
      player1.x += player1.vx;
      player1.y += player1.vy;
      player1.d += player1.vd;
      player1.vx *= 0.95;
      player1.vy *= 0.95;
      player1.vd *= 0.9;
      player1.vy += player1.gravity;
      //player1.gravity = 0.11;
      
      if(player1.y + 30 >= 500) {
        player1.gravity = 0;
        player1.y = 500 - 30;
      }
      
      player1.collision(player1.d);
      
      c.translate(player1.x + player1.width/2, player1.y + player1.height/2);
      c.rotate(player1.d * Math.PI/180);
  
      c.fillStyle = "black";
      c.fillRect(-player1.width/2, -player1.height/2, player1.width, player1.height);
  
      c.rotate(-player1.d * Math.PI/180);
      c.translate(-player1.x - player1.width/2, -player1.y - player1.height/2);
    },
    collision: function() {
      
      var trPoint = rotatePoint([0, 0], [30, -15], ((player1.d) % 360)*Math.PI/180);
      player1.topRight.x = trPoint[0];
      player1.topRight.y = trPoint[1];
      
      var tlPoint = rotatePoint([0, 0], [-30, -15], ((player1.d) % 360)*Math.PI/180);
      player1.topLeft.x = tlPoint[0];
      player1.topLeft.y = tlPoint[1];
      
      var blPoint = rotatePoint([0, 0], [-30, 15], ((player1.d) % 360)*Math.PI/180);
      player1.bottomLeft.x = blPoint[0];
      player1.bottomLeft.y = blPoint[1];
      
      var brPoint = rotatePoint([0, 0], [30, 15], ((player1.d) % 360)*Math.PI/180);
      player1.bottomRight.x = brPoint[0];
      player1.bottomRight.y = brPoint[1];
      
      return player1.d;
      //Math.abs(player1.d % 360)
    },
  };
  
  
  
  
  
  document.addEventListener("keydown", function(e) {
  	switch(e.keyCode) {
    	case 65: //p1 left
      	if((player1.onGround === true) && (player1.xDown === null)) {
        	player1.xDown = setInterval(player1.moveLeft, 30);
        } else if((player1.onGround === false) && (player1.dDown === null)){
        	player1.dDown = setInterval(player1.rotateLeft, 30);
        }
      	break;
      case 68: //p1 right
      	if((player1.onGround === true) && (player1.xDown === null)) {
        	player1.xDown = setInterval(player1.moveRight, 30);
        } else if((player1.onGround === false) && (player1.dDown === null)) {
        	player1.dDown = setInterval(player1.rotateRight, 30);
        }
      	break;
      case 87: //p1 up
      	if(player1.onGround) {
        	player1.jump();
        }
        break;
      case 32: //p1 boost
      	if(player1.bDown === null) {
          player1.bDown = setInterval(player1.boost, 30);
        }
        break;
      default:
    }
  });
  
  
  
  document.addEventListener("keyup", function(e) {
  	switch(e.keyCode) {
    	case 65: //p1 left
      case 68: //p1 right
      	clearInterval(player1.xDown);
      	clearInterval(player1.dDown);
        player1.xDown = null;
        player1.dDown = null;
      	break;
      case 32: //p1 boost
      	clearInterval(player1.bDown);
        player1.bDown = null;
        break;
      default:
    }
  });
  
  
  
  
  
  setInterval(function() {
    c.fillStyle = "rgba(255, 255, 255, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    player1.draw();
    
    c.fillStyle = "red";
    c.fillRect(player1.x + 30 + player1.topRight.x - 5, player1.y + 15 + player1.topRight.y - 5, 10, 10);
    
    c.fillStyle = "green";
    c.fillRect(player1.x + 30 + player1.topLeft.x - 5, player1.y + 15 + player1.topLeft.y - 5, 10, 10);
    
    c.fillStyle = "blue";
    c.fillRect(player1.x + 30 + player1.bottomLeft.x - 5, player1.y + 15 + player1.bottomLeft.y - 5, 10, 10);
    
    c.fillStyle = "yellow";
    c.fillRect(player1.x + 30 + player1.bottomRight.x - 5, player1.y + 15 + player1.bottomRight.y - 5, 10, 10);
    
    c.fillStyle = "white";
    c.strokeStyle = "white";
    //c.fillText(player1.d, 20, 20);
  }, 30);
};