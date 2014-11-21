function Pen() {
  var colour = '#000000';
  var width = 1;
  this.draw = true;
  this.pop = function() {
    draw = !draw
  };
};

function Canvas(canvasId) {
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  var intId = null;
  var steps = 10;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var count = 0;
  this.draw = function(start, end, pen) {
    ctx.strokeStyle = pen.colour;
    ctx.lineWidth = pen.width;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };
}

function Turtle(name) {
  var start = [10.5, 10.5, 0]; // x, y, angle - Half pixel offset
  var location = [start[0], start[1]];
  var angle = start[2];
  var pen = new Pen();
  var commandString = "";
  var isAnimating = false;
  var canvas = new Canvas(name);
  this.rotate = function(anglePercent) {
    // to simplify the maths anglePercent is a percentage of
    // a full circle. e.g to rotate turtle by 90 degrees == rotate(0.25).
    angle += anglePercent * Math.PI * 2;
  };
  this.forward = function(dist) {
    isAnimating = true;
    var steps = 10;
    var stepLength = dist / steps;
    var count = 0;
    var intId = setInterval(function() {
      pos2 = [location[0] + Math.cos(angle) * stepLength,
        location[1] + Math.sin(angle) * stepLength
      ];
      if(pen.draw) canvas.draw(location, pos2, pen);
      location = [pos2[0], pos2[1]];
      count++;
      if(count === steps) {
        count = 0;
        clearInterval(intId);
        isAnimating = false;
      }
    }, 40);
  };
  this.clear = function() {
    canvas = new Canvas(name);
    location = [start[0], start[1]];
    angle = start[2];
    commandString = "";
    document.getElementById("ls-string").innerHTML = commandString;
  };
  this.queue = function(command) {
    commandString += command;
    document.getElementById("ls-string").innerHTML = commandString;
  };
  this.go = function() {
		var dist = parseInt(document.getElementById("distance").value,10);
    var arr = commandString.split('');
    if(arr.length === 0) return;
    var intId = setInterval(anim, 100, this);

    function anim(self) {
      if(!isAnimating) {
        var command = arr.shift();
        if(command === 'F') self.forward(dist);
        else if(command === 'L') self.rotate(-0.25);
        else if(command === 'R') self.rotate(0.25);
        if(arr.length === 0) {
          clearInterval(intId);
        }
      }
    }
  };
	this.setCommandString = function(cs){
		commandString = cs;
	};
	this.setDistance = function(dist){
		document.getElementById("distance").value = dist;
	}
}

function Dragon(){
	
}

// Event Handlers
// 
var controls = document.getElementsByClassName("buttons");
for(var i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", doSomething, false);
}

function doSomething(e) {
  if(e.target.name === "forward") turtle.forward(100);
  else if(e.target.name === "left") turtle.rotate(-0.25);
  else if(e.target.name === "right") turtle.rotate(0.25);
  else if(e.target.name === "ls-forward") turtle.queue("F");
  else if(e.target.name === "ls-left") turtle.queue("L");
  else if(e.target.name === "ls-right") turtle.queue("R");
  else if(e.target.name === "ls-go") turtle.go();
  else if(e.target.name === "clear") turtle.clear();
	else if(e.target.name === "dragon") Dragon();
  e.stopPropagation();
}