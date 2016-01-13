window.onload = function() {
  var canvas = document.getElementById("paper");
  var c = canvas.getContext("2d");
  var keyDownX;
  var keyDownY;
  var keyAlreadyDownX = 0;
  var keyAlreadyDownY = 0;
  var gapPosTop = Math.floor((Math.random() * canvas.width * 1 / 4) + (canvas.width / 4));
  var gapPosLeft = Math.floor((Math.random() * canvas.height * 1 / 4) + (canvas.height / 4));
  var speed = 1;
  var score = 0;
  var levelCounter = 0;

  var player = {
    x: canvas.width / 2 - 10,
    y: canvas.height / 2 - 10,
    width: 20,
    height: 20,
    alive: true
  };
  
  function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.vx = Math.random()*10 - 5;
      this.vy = Math.random()*-10;
  }
    
  var p1 = new Particle(player.x, player.y);
  var p2 = new Particle(player.x, player.y);
  var p3 = new Particle(player.x, player.y);
  var p4 = new Particle(player.x, player.y);
  var p5 = new Particle(player.x, player.y);
  var p6 = new Particle(player.x, player.y);
  var p7 = new Particle(player.x, player.y);
  var p8 = new Particle(player.x, player.y);
  var p9 = new Particle(player.x, player.y);
  var p10 = new Particle(player.x, player.y);
  var p11 = new Particle(player.x, player.y);
  var p12 = new Particle(player.x, player.y);
  var p13 = new Particle(player.x, player.y);
  var p14 = new Particle(player.x, player.y);
  var p15 = new Particle(player.x, player.y);
  
  var crusher = {
	  top: {
		  left: {
			  x: 0,
			  y: 0,
			  width: 220,
			  height: 40
		  },
		  right: {
			  x: 280,
			  y: 0,
			  width: 220,
			  height: 40
		  },
		  direction: 1
	  },
	  left: {
		  top: {
			  x: 0,
			  y: 0,
			  width: 40,
			  height: 220
		  },
		  bottom: {
			  x: 0,
			  y: 280,
			  width: 40,
			  height: 220
		  },
		  direction: 1
	  }
  };
  
  function addParticles() {
      p1.x = player.x;
      p1.y = player.y;
      p2.x = player.x;
      p2.y = player.y;
      p3.x = player.x;
      p3.y = player.y;
      p4.x = player.x;
      p4.y = player.y;
      p5.x = player.x;
      p5.y = player.y;
      p6.x = player.x;
      p6.y = player.y;
      p7.x = player.x;
      p7.y = player.y;
      p8.x = player.x;
      p8.y = player.y;
      p9.x = player.x;
      p9.y = player.y;
      p10.x = player.x;
      p10.y = player.y;
      p11.x = player.x;
      p11.y = player.y;
      p12.x = player.x;
      p12.y = player.y;
      p13.x = player.x;
      p13.y = player.y;
      p14.x = player.x;
      p14.y = player.y;
      p15.x = player.x;
      p15.y = player.y;
      p1.vx = Math.random()*10 - 5;
      p1.vy = Math.random()*-10;
      p2.vx = Math.random()*10 - 5;
      p2.vy = Math.random()*-10;
      p3.vx = Math.random()*10 - 5;
      p3.vy = Math.random()*-10;
      p4.vx = Math.random()*10 - 5;
      p4.vy = Math.random()*-10;
      p5.vx = Math.random()*10 - 5;
      p5.vy = Math.random()*-10;
      p6.vx = Math.random()*10 - 5;
      p6.vy = Math.random()*-10;
      p7.vx = Math.random()*10 - 5;
      p7.vy = Math.random()*-10;
      p8.vx = Math.random()*10 - 5;
      p8.vy = Math.random()*-10;
      p9.vx = Math.random()*10 - 5;
      p9.vy = Math.random()*-10;
      p10.vx = Math.random()*10 - 5;
      p10.vy = Math.random()*-10;
      p11.vx = Math.random()*10 - 5;
      p11.vy = Math.random()*-10;
      p12.vx = Math.random()*10 - 5;
      p12.vy = Math.random()*-10;
      p13.vx = Math.random()*10 - 5;
      p13.vy = Math.random()*-10;
      p14.vx = Math.random()*10 - 5;
      p14.vy = Math.random()*-10;
      p15.vx = Math.random()*10 - 5;
      p15.vy = Math.random()*-10;
  }
  
  document.body.addEventListener('keydown', function(e) {
    switch(e.which) {
      case 37:
        if((keyAlreadyDownX === 0)) {
          keyAlreadyDownX = 1;
          keyDownX = setInterval(function() {
			  if(player.x >= 0) {
				player.x -= 5;
			  }
          }, 30);
        }
        break;
      case 38:
        if((keyAlreadyDownY === 0)) {
          keyAlreadyDownY = 1;
          keyDownY = setInterval(function() {
			  if(player.y >= 0) {
				  player.y -= 5;  
			  }
          }, 30);
        }
        break;
      case 39:
        if((keyAlreadyDownX === 0)) {
          keyAlreadyDownX = 1;
          keyDownX = setInterval(function() {
			  if(player.x + player.width <= canvas.width) {
				player.x += 5;
			  }
          }, 30);
        }
        break;
      case 40:
        if((keyAlreadyDownY === 0)) {
          keyAlreadyDownY = 1;
          keyDownY = setInterval(function() {
			  if(player.y + player.width <= canvas.height) {
				  player.y += 5;
			  }
          }, 30);
        }
        break;
      case 32:
        if(player.alive === false) {
            player.alive = true;
            score = 0;
        }
      default:
    }
  });
  
  document.body.addEventListener('keyup', function(e) {
    switch(e.which) {
      case 37:
      case 39:
        clearInterval(keyDownX);
        keyAlreadyDownX = 0;
        break;
      case 38:
      case 40:
        clearInterval(keyDownY);
        keyAlreadyDownY = 0;
        break;
      default:
    }
  });
  
  setInterval(function() {
    c.fillStyle = "rgba(255, 255, 255, 0.3)";
    c.fillRect(0, 0, canvas.width, canvas.height);
	
	if(player.alive === true) {
    	if(levelCounter <= 500) {
    		crusher.top.left.y += speed * crusher.top.direction;
    		crusher.top.right.y += speed * crusher.top.direction;
    		crusher.left.top.x += speed * crusher.left.direction;
    		crusher.left.bottom.x += speed * crusher.left.direction;
    		levelCounter += speed;
    	} else {
    	    crusher.top.direction = Math.floor(Math.random()*2);
    	    if(crusher.top.direction === 0) {
    	        crusher.top.direction = -1;
    	    }
    	    
    	    crusher.left.direction = Math.floor(Math.random()*2);
    	    if(crusher.left.direction === 0) {
    	        crusher.left.direction = -1;
    	    }
    	    
    		gapPosTop = Math.floor((Math.random() * canvas.width * 1 / 4) + (canvas.width / 4));
    		gapPosLeft = Math.floor((Math.random() * canvas.height * 1 / 4) + (canvas.height / 4));
    		
    		if(crusher.top.direction === 1) {
        		crusher.top.left.y = 0;
        		crusher.top.right.y = 0;
    		
        		crusher.top.left.width = gapPosTop;
        		crusher.top.right.x = gapPosTop + 60;
        		crusher.top.right.width = canvas.width - (gapPosTop + 60);
    		} else {
        		crusher.top.left.y = canvas.height - crusher.top.left.height;
        		crusher.top.right.y = canvas.height - crusher.top.right.height;
    		
        		crusher.top.left.width = gapPosTop;
        		crusher.top.right.x = gapPosTop + 60;
        		crusher.top.right.width = canvas.width - (gapPosTop + 60);
    		}
    		
    		if(crusher.left.direction === 1) {
        		crusher.left.top.x = 0;
        		crusher.left.bottom.x = 0;
    		
        		crusher.left.top.height = gapPosLeft;
        		crusher.left.bottom.y = gapPosLeft + 60;
        		crusher.left.bottom.height = canvas.width - (gapPosLeft + 60);
    		} else {
        		crusher.left.top.x = canvas.width - crusher.left.top.width;
        		crusher.left.bottom.x = canvas.width - crusher.left.bottom.width;
    		
        		crusher.left.top.height = gapPosLeft;
        		crusher.left.bottom.y = gapPosLeft + 60;
        		crusher.left.bottom.height = canvas.width - (gapPosLeft + 60);
    		}
    		
    		levelCounter = 0;
    		
            score++;
    		if(speed <= 5) {
    			speed += 0.5;
    		} else if(speed <= 7.5){
    			speed += 0.1;
    		}
    	}
    	
        c.fillStyle = "black";
        c.font = "25px Courier New";
        c.fillText("Score: " + score, 40, 40);
    	
    	if((player.x + player.width >= crusher.top.left.x) && (player.x <= crusher.top.left.x + crusher.top.left.width) && (player.y + player.width >= crusher.top.left.y) && (player.y <= crusher.top.left.y + crusher.top.left.height)) {
    	    player.alive = false;
            addParticles();
    	} else if((player.x + player.width >= crusher.top.right.x) && (player.x <= crusher.top.right.x + crusher.top.right.width) && (player.y + player.width >= crusher.top.right.y) && (player.y <= crusher.top.right.y + crusher.top.right.height)) {
    	    player.alive = false;
            addParticles();
        } else if((player.x + player.width >= crusher.left.top.x) && (player.x <= crusher.left.top.x + crusher.left.top.width) && (player.y + player.width >= crusher.left.top.y) && (player.y <= crusher.left.top.y + crusher.left.top.height)) {
            player.alive = false;
            addParticles();
        } else if((player.x + player.width >= crusher.left.bottom.x) && (player.x <= crusher.left.bottom.x + crusher.left.bottom.width) && (player.y + player.width >= crusher.left.bottom.y) && (player.y <= crusher.left.bottom.y + crusher.left.bottom.height)) {
            player.alive = false;
            addParticles();
        }
        
    	c.fillStyle = "#ff6666";
    	c.fillRect(crusher.top.left.x, crusher.top.left.y, crusher.top.left.width, crusher.top.left.height);
    	c.fillRect(crusher.top.right.x, crusher.top.right.y, crusher.top.right.width, crusher.top.right.height);
    	c.fillRect(crusher.left.top.x, crusher.left.top.y, crusher.left.top.width, crusher.left.top.height);
    	c.fillRect(crusher.left.bottom.x, crusher.left.bottom.y, crusher.left.bottom.width, crusher.left.bottom.height);
        
        c.fillStyle = "#00aaaa";
        c.fillRect(player.x, player.y, player.width, player.height);
	} else {
        c.fillStyle = "black";
        c.fillText("Score: " + score, 195, 245);
        c.fillText("[Space to Restart]", 120, 275);
        
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.vy += 0.3;
        
        p2.x += p2.vx;
        p2.y += p2.vy;
        p2.vy += 0.3;
        
        p3.x += p3.vx;
        p3.y += p3.vy;
        p3.vy += 0.3;
        
        p4.x += p4.vx;
        p4.y += p4.vy;
        p4.vy += 0.3;
        
        p5.x += p5.vx;
        p5.y += p5.vy;
        p5.vy += 0.3;
        
        p6.x += p6.vx;
        p6.y += p6.vy;
        p6.vy += 0.3;
        
        p7.x += p7.vx;
        p7.y += p7.vy;
        p7.vy += 0.3;
        
        p8.x += p8.vx;
        p8.y += p8.vy;
        p8.vy += 0.3;
        
        p9.x += p9.vx;
        p9.y += p9.vy;
        p9.vy += 0.3;
        
        p10.x += p10.vx;
        p10.y += p10.vy;
        p10.vy += 0.3;
        
        p11.x += p11.vx;
        p11.y += p11.vy;
        p11.vy += 0.3;
        
        p12.x += p12.vx;
        p12.y += p12.vy;
        p12.vy += 0.3;
        
        p13.x += p13.vx;
        p13.y += p13.vy;
        p13.vy += 0.3;
        
        p14.x += p14.vx;
        p14.y += p14.vy;
        p14.vy += 0.3;
        
        p15.x += p15.vx;
        p15.y += p15.vy;
        p15.vy += 0.3;
        
        c.fillStyle = "#11aaaa";
        c.fillRect(p1.x, p1.y, 5, 5);
        c.fillRect(p2.x, p2.y, 5, 5);
        c.fillRect(p3.x, p3.y, 5, 5);
        c.fillRect(p4.x, p4.y, 5, 5);
        c.fillRect(p5.x, p5.y, 5, 5);
        c.fillRect(p6.x, p6.y, 5, 5);
        c.fillRect(p7.x, p7.y, 5, 5);
        c.fillRect(p8.x, p8.y, 5, 5);
        c.fillRect(p9.x, p9.y, 5, 5);
        c.fillRect(p10.x, p10.y, 5, 5);
        c.fillRect(p11.x, p11.y, 5, 5);
        c.fillRect(p12.x, p12.y, 5, 5);
        c.fillRect(p13.x, p13.y, 5, 5);
        c.fillRect(p14.x, p14.y, 5, 5);
        c.fillRect(p15.x, p15.y, 5, 5);
        
        gapPosTop = Math.floor((Math.random() * canvas.width * 1 / 4) + (canvas.width / 4));
        gapPosLeft = Math.floor((Math.random() * canvas.height * 1 / 4) + (canvas.height / 4));
        speed = 1;
        levelCounter = 0;
  
        player = {
            x: canvas.width / 2 - 10,
            y: canvas.height / 2 - 10,
            width: 20,
            height: 20,
            alive: false
        };
  
        crusher = {
          top: {
        	  left: {
        		  x: 0,
        		  y: 0,
        		  width: 220,
        		  height: 40
        	  },
        	  right: {
        		  x: 280,
        		  y: 0,
        		  width: 220,
        		  height: 40
        	  },
        	  direction: 1
          },
          left: {
        	  top: {
        		  x: 0,
        		  y: 0,
        		  width: 40,
        		  height: 220
        	  },
        	  bottom: {
        		  x: 0,
        		  y: 280,
        		  width: 40,
        		  height: 220
        	  },
        	  direction: 1
          }
        };
	}
  }, 30);
};