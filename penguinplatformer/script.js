var viewpane = "splash";
var transparency = 1;

function showInstructions() {
  document.getElementById("instructionsDiv").style.visibility = "visible";
}

function play() {
  viewpane = "play";
  document.getElementById("b1").style.visibility = "hidden";
  document.getElementById("b2").style.visibility = "hidden";
}

window.onload = function() {
  var canvas = document.getElementById("paper");
  var c = canvas.getContext("2d");
  
  var splashImage = document.getElementById("splashImage");
  
  var slideTime = null;
  
  play();
  
  var level = {
    x: 0,
    displacement: 0,
    current: 1,
    colY: 0,
    speed: 10,
    levels: [
      [[1000, 200, 100], [500, 100, 200], [600, 200, 300], [200, 250, 200], [200, 300, 200], [200, 400, 200]] 
      ],
    draw: function() {
      c.fillStyle = "rgba(100, 200, 230, 1)";
      
      level.x = level.displacement;
      
      level.findcolY();
      
      var i;
      for(i = 0; i < level.levels[level.current - 1].length; i++) {
        
        c.fillRect(level.x, 500 - level.levels[level.current - 1][i][1], level.levels[level.current-1][i][0], 400);
        
        level.x += level.levels[level.current - 1][i][2] + level.levels[level.current - 1][i][0];
        
      }
      
      level.displacement -= level.speed;
    },
    
    findcolY: function() {
      var total = -30;
      var i = 0;
      var done = false;
      
      while(total <= -level.x + 100 && done === false) {
        
        total += level.levels[level.current - 1][i][0]; 
        
        if(total > -level.x + 100 || total > -level.x + 70) {
          level.colY = 500 - level.levels[level.current - 1][i][1];
          done = true;
        }
        
        total += level.levels[level.current - 1][i][2];
        
        if(total > -level.x + 100 && done === false) {
          level.colY = -300;
        }
        
        if(i + 1 < level.levels[level.current - 1].length) {
          i++;
        } else {
          done = true;
        }
      }
      
    },
  };
  
  var player = {
    height: 60,
    width: 30,
    x: 100,
    y: 200,
    vy: 0.5,
    sliding: false,
    onground: false,
    canBash: true,
    slide: function() {
      player.sliding = true;
      player.height = 30;
      player.width = 60;
      player.y += 30;
      
      slideTime = setTimeout(function () {
        player.width = 30;
        player.height = 60;
        player.y -= 30;
        
        slideTime = null;
        
        setTimeout(function() {
          player.sliding = false;
        }, 100);
      }, 1000);
    },
    
    jump: function() {
      player.onground = false;
      player.vy = -15;
    },
    
    bash: function() {
      
    },
    
    findpoints: function() {
      player.y += player.vy;
      player.vy += 1;
      
      if(player.y > level.colY - player.height && player.y - 30 < level.colY - player.height) {
        player.vy = 0;
        player.y = level.colY - player.height;
        player.onground = true;
      } else if(player.vy > 1) {
        player.onground = false;
      }
      
      player.draw();
    },
    
    draw: function() {
      c.fillStyle = "rgba(20, 100, 170, 1)";
      c.fillRect(player.x, player.y, player.width, player.height);
    },
  };



  document.addEventListener("keydown", function(e) {
  	switch(e.keyCode) {
    	case 83:
    	    if(player.sliding === false && player.onground === true) {
    	      player.slide();
    	    }
      	break;
      	
      case 87:
          if(player.onground === true) {
            player.jump();
            
            if(slideTime !== null) {
              clearTimeout(slideTime);
              
              player.width = 30;
              player.height = 60;
              player.y -= 30;
              
              slideTime = null;
              
              setTimeout(function() {
                player.sliding = false;
              }, 100);
            }
          }
        break;
        
      case 68:
          if(player.canBash) {
            player.canBash = false;
            level.speed = 30;
            transparency = 0.7;
            
            setTimeout(function() {
              level.speed = 10;
              transparency = 1;
            }, 300);
            
            setTimeout(function() {
              player.canBash = true;
            }, 1000);
          }
      	break;
        
      default:
    }
  });
  
  
  
  document.addEventListener("keyup", function(e) {
  	switch(e.keyCode) {
      case 65:
      case 68:
      	break;
      	
      case 32:
        break;
        
      default:
    }
  });
  
  
  
  function drawSplash() {
    c.drawImage(splashImage, 0, 0);
  }
  
  setInterval(function() {
    c.fillStyle = "rgba(255, 255, 255, "+transparency+")";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    switch (viewpane) {
      case 'splash':
        drawSplash();
        break;
        
      case "play":
        level.draw();
        player.findpoints();
        break;
        
      default:
    }
  }, 30);
};
