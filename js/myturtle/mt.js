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

function ls(arr, callback) {
  var queue = function() {}
}

function Turtle(name) {
  var start = [10.5, 10.5, 0]; // x, y, angle - Half pixel offset
  var location = [start[0], start[1]];
  var angle = start[2];
  var pen = new Pen();
  var canvas = new Canvas(name);
  var maxSteps = 10;
  var commandString = "";
  this.rotate = function(anglePercent) {
    // to simplify the maths anglePercent is a percentage of
    // a full circle. e.g to rotate turtle by 90 degrees == rotate(0.25).
    angle += anglePercent * Math.PI * 2;
    return "complete";
  };
  this.forward = function(dist, animate) {
    if(animate) {
      var count = 0;
      var intId = setInterval(function() {
        if(count > maxSteps) {
          count = 0;
          clearInterval(intId);
					return "complete";
        } else {
          var step = dist / maxSteps;
          pos2 = [location[0] + Math.cos(angle) * step, location[1] + Math.sin(angle) * step];
          if(pen.draw) canvas.draw(location, pos2, pen);
          location = [pos2[0], pos2[1]];
          count++;
        }
      }, 40);
    } else {
      pos2 = [location[0] + Math.cos(angle) * dist, location[1] + Math.sin(angle) * dist];
      if(pen.draw) canvas.draw(location, pos2, pen);
      location = [pos2[0], pos2[1]];
			return "complete";
    }
    
  };
  this.clear = function() {
    canvas = new Canvas(name);
    location = [start[0], start[1]];
    angle = start[2];
    commandString = "";
		document.getElementById("ls-string").innerHTML = "<p>" + commandString + "</p>";
  };
  this.queue = function(command) {
    commandString += command;
    document.getElementById("ls-string").innerHTML = "<p>" + commandString + "</p>";
  };
  this.go = function() {
    var arr = commandString.split('');
    var status = "complete";
		console.log(arr);
    while(arr.length > 0) {
			console.log(status);
      if(status === "complete") {
        var ch = arr.shift();
        status = "working";
        if(ch === 'F') status = this.forward(100, true);
        else if(ch === 'L') status = this.rotate(-0.25);
        else if(ch === 'R') status = this.rotate(0.25);
      }
    }
  };
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
  e.stopPropagation();
}