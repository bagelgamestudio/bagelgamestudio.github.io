window.onload = function() {
  var canvas = document.getElementById("paper");
  var c = canvas.getContext("2d");
  var whileKeyDownL = null;
  var whileKeyDownR = null;
  var countX = 0;
  var gravity = 0.5;
	var i;
	var x;
	var y;
	var z;
	var willRunIntoL = 0;
	var willRunIntoR = 0;
	var willRunIntoG = 0;
	var setY = 0;
	var rock = document.getElementById("rockModel");
	var lava = document.getElementById("lavaModel");
	
	var level = ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","2","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","2","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","2","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","2","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","1","1","2","0","4","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","1","1","1","1","1","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1",
	             "1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","3","1",
	             "1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"];
	             
	var enemies = [];
	             
	var curBoxG = {
	  x: 0,
	  y: 0,
	  height: 20,
	  width: 20
	};
	
	var curBoxL = {
	  x: 0,
	  y: 0,
	  height: 20,
	  width: 20
	};
	
	var curBoxR = {
	  x: 0,
	  y: 0,
	  height: 20,
	  width: 20
	};
  
  var player = {
    x: 60,
    y: 20,
    height: 28,
    width: 16,
    model: document.getElementById("playerRight")
  };
  
  function checkCollision() {
    for(x = 0; x < level.length; x++) {
      if(level[x] === "1") {
        curBoxG.x = (x % 20) * 20;
        curBoxG.y = Math.floor(x/20) * 20;
        
        if(((player.y + player.height >= curBoxG.y) && (player.y + player.height <= curBoxG.y + (curBoxG.height/2))) && ((player.x + player.width - 2 >= curBoxG.x) && (player.x + 2 <= curBoxG.x + curBoxG.width))) {
      	  willRunIntoG = 1;
      	  setY = curBoxG.y;
        } else if(player.y + player.height >= canvas.height) {
          gravity = 0;
          player.y = canvas.height - player.height;
          willRunIntoG = 2;
        } else if(((player.y <= curBoxG.y + curBoxG.height) && (player.y + player.height >= curBoxG.y + (curBoxG.height/2))) && ((player.x + player.width - 2 >= curBoxG.x) && (player.x + 2 <= curBoxG.x + curBoxG.width))) {
          willRunIntoG = 2;
          gravity = 0;
          player.y = curBoxG.y + curBoxG.height + 1;
        }
      } else if(level[x] === "2") {
        curBoxG.x = (x % 20) * 20;
        curBoxG.y = Math.floor(x/20) * 20;
        
        if(((player.y + player.height - 2 >= curBoxG.y) && (player.y <= curBoxG.y + curBoxG.height) && (player.x + player.width - 2 >= curBoxG.x) && (player.x + 2 <= curBoxG.x + curBoxG.width))) {
          player.x = 60;
          player.y = 60;
        }
      } else if(level[x] === "3") {
        curBoxG.x = (x % 20) * 20;
        curBoxG.y = Math.floor(x/20) * 20;
        
        if(((player.y + player.height - 2 >= curBoxG.y) && (player.y <= curBoxG.y + curBoxG.height) && (player.x + player.width - 2 >= curBoxG.x) && (player.x + 2 <= curBoxG.x + curBoxG.width))) {
          player.x = 60;
          player.y = 60;
          alert("Would send you to the next level if we had actual levels");
        }
      }
    }
  }
  
  function gravityFun() {
  	player.y += gravity;
  	checkCollision();
    if(willRunIntoG === 1) {
      gravity = 0;
  	  player.y = setY - player.height;
    } else if(willRunIntoG === 0) {
  	  gravity += 0.1;
    }
    willRunIntoG = 0;
  }
  
  function enemyGravity() {
    for(z = 0; z < enemies.length; z++) {
      enemies[z].y += enemies[z].gravity;
      enemies[z].gravity += 0.1;
      console.log(enemies[z].y);
    }
  }
  
  setInterval(gravityFun, 10);
  
  $(document).keydown(function(e) {
	  switch(e.which) {
  	  case 37:
  	    player.model = document.getElementById("playerLeft");
      	if(countX === 0) {
        	countX = 1;
        	whileKeyDownL = setInterval(function() {
            for(i = 0; i < level.length; i++) {
              if(level[i] === "1") {
                curBoxL.x = (i % 20) * 20;
                curBoxL.y = Math.floor(i/20) * 20;
                
                if(((player.x - 1 <= curBoxL.x + curBoxL.width) && (player.x + player.width - 1 >= curBoxL.x)) && ((player.y + player.height - 1 >= curBoxL.y) && (player.y <= curBoxL.y + curBoxL.height - 1)) || (player.x <= 0)) {
                  willRunIntoL = 1;
                }
              }
            }
            if(willRunIntoL === 0) {
              player.x -= 2;
      	    }
      	    willRunIntoL = 0;
          }, 20);
      	}
        break;
    	case 38:
        if(gravity === 0) {
        	gravity = -3.8;
        }
        break;
    	case 39:
  	    player.model = document.getElementById("playerRight");
      	if(countX === 0) {
        	countX = 1;
        	whileKeyDownR = setInterval(function() {
            for(y = 0; y < level.length; y++) {
              if(level[y] === "1") {
                curBoxR.x = (y % 20) * 20;
                curBoxR.y = Math.floor(y/20) * 20;
                
                if(((player.x + player.width + 1 >= curBoxR.x) && (player.x + 1 <= curBoxR.x + curBoxR.width)) && ((player.y + player.height - 1 >= curBoxR.y) && (player.y <= curBoxR.y + curBoxR.height - 1)) || (player.x + player.width >= canvas.width)) {
          	      willRunIntoR = 1;
          	    }
              }
            }
            if(willRunIntoR === 0) {
              player.x += 2;
            }
            willRunIntoR = 0;
        	}, 20);
        }
        break;
      default:
	  }
  });

  $(document).keyup(function(e) {
	  if(e.which === 37) {
      countX = 0;
  	  clearInterval(whileKeyDownL);
    } else if(e.which === 39) {
      countX = 0;
      clearInterval(whileKeyDownR);
    }
  });
  
  setInterval(function() {
    c.fillStyle = "rgba(255, 255, 255, 1)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    for(i = 0; i < level.length; i++) {
      switch(level[i]) {
        case "1":
          c.drawImage(rock, (i % 20) * 20, Math.floor(i/20) * 20);
          break;
        case "2":
          c.drawImage(lava, (i % 20) * 20, Math.floor(i/20) * 20);
          break;
        case "3":
          c.fillStyle = "#3f3";
          c.fillRect((i % 20) * 20, Math.floor(i/20) * 20, 20, 20);
          break;
        case "4":
          enemies.push({x: (i % 20) * 20, y: Math.floor(i/20) * 20, height: 10, width: 10});
          setInterval(enemyGravity, 100);
          break;
          default:
        }
      }
    
    c.fillStyle = "#c37";
    for(i = 0; i < enemies.length; i++) {
      c.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    }
    
    c.fillStyle = "#00aaaa";
    c.drawImage(player.model, player.x, player.y);
  }, 30);
};