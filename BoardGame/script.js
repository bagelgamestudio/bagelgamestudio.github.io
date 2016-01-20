var level = [];
var player = {
x: 2,
y: 2
};

var throneRoom = [
["X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
["X"," "," "," "," "," "," "," "," "," "," "," "," ","D"],
["X"," "," "," "," "," "," "," "," "," "," "," "," ","X"],
["X"," ","A"," "," "," "," "," "," "," "," "," "," ","X"],
["X"," "," "," "," "," "," "," "," "," "," "," "," ","X"],
["X"," "," "," "," "," "," "," "," "," "," "," "," ","D"],
["X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
];


var c = document.getElementById("map");
var ctx = c.getContext("2d");
var placeX = null;
var placeY = null;
var i = null;
var n = null;


for(n = 0; n < throneRoom.length; n++){
placeY = 10*n;
for(i = 0; i < throneRoom[n].length; i++){
placeX = 10*i;
switch(throneRoom[n][i]){
case "X": ctx.fillStyle = "grey";
break;
case " ": ctx.fillStyle = "red";
break;
case "D": ctx.fillStyle = "#8A4B08";
break;
case "A": ctx.fillStyle = "yellow";
break;
  default:
}
ctx.fillRect(placeX,placeY,10,10);
}
}