function Pen(){
  var colour = '#000000';
  var width = 1;
  this.draw = true;
  this.pop = function(){
    draw = !draw
  };
};

function Canvas(canvasId){
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  this.draw = function(start, end, pen){
    ctx.strokeStyle = pen.colour;
    ctx.lineWidth = pen.width;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };
}

function Turtle(name){
  var location = [10.5,10.5]; // Half pixel offset
  var angle = 0; // Radians
  var pen = new Pen();
  var canvas = new Canvas(name);
  this.rotate = function(anglePercent) {
    // to simplify the maths anglePercent is a percentage of
    // a full circle. e.g to rotate turtle by 90 degrees == rotate(0.25).
    angle += anglePercent * Math.PI *2;
  };
  this.forward = function(dist) {
    pos2 = [location[0]+ Math.cos(angle) * dist, location[1]+ Math.sin(angle) * dist];
    if(pen.draw) canvas.draw(location, pos2, pen);
    location = [pos2[0], pos2[1]];
  };
}

// Event Handlers
// 
var controls = document.getElementsByClassName("buttons");
for(var i=0; i<controls.length; i++){
	controls[i].addEventListener("click", doSomething, false);
}

function doSomething(e){
	if(e.target.name === "forward")	turtle.forward(100);
	else if(e.target.name === "left") turtle.rotate(-0.25);
	else if(e.target.name === "right") turtle.rotate(0.25);
	e.stopPropagation();
}
