var pen = {
  colour: '#ffffff',
  width: 1,
  x: 200.5,
  y: 150.5, // Half pixel offset looks better
  angle: 0,
  animating: false
};

var stack = [];

function Canvas(canvasId) {
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  this.draw = function(start, end) {
    ctx.strokeStyle = pen.colour;
    ctx.lineWidth = pen.width;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };
  this.clear = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function Turtle(activeCanvas) {
  var canvas = activeCanvas;
  var commandString = "";
  var intId, angle;

  function init() {
    pen.x = 200.5;
    pen.y = 150.5;
    pen.angle = 0;
    document.getElementById("distance").value = 10;
    document.getElementById("tt-string").value = "";
  }
  this.rotate = function(anglePercent) {
    // to simplify the maths anglePercent is a percentage of
    // a full circle. e.g to rotate turtle by 90 degrees == rotate(0.25).
    pen.angle += anglePercent * Math.PI * 2;
  };
  this.forward = function(dist) {
    pen.animating = true;
    var stepLength = 6;
    // var rate = stepLength/12; // around 10 pixels per second
    var steps = dist / stepLength;
    var count = 0;
    intId = setInterval(function() {
      var newx = pen.x + Math.cos(pen.angle) * stepLength;
      var newy = pen.y + Math.sin(pen.angle) * stepLength;
      canvas.draw([pen.x, pen.y], [newx, newy]);
      pen.x = newx;
      pen.y = newy;
      count++;
      if(count >= steps) {
        count = 0;
        clearInterval(intId);
        pen.animating = false;
      }
    }, 41); // around 24 frames per second
  };
  this.clear = function() {
    if(pen.animating) {
      console.log("Is animating");
      return;
    }
    canvas.clear();
    init();
  };
  this.queue = function(command) {
    document.getElementById("tt-string").value += command;
  };
  this.go = function(commandStr, lineLength, angle) {
    var commandString = document.getElementById("tt-string").value || commandStr; 
    var commands = commandString.split('');
    var dist = lineLength || parseInt(document.getElementById("distance").value);
		var angle = angle || parseInt(document.getElementById("ls-angle").value)/360;
    var goIntId = setInterval(function(self) {
      if(!pen.animating) {
        var command = commands.shift();
        if(command === 'F') self.forward(dist);
        else if(command === 'L' || command === '−') self.rotate(-1* angle);
        else if(command === 'R' || command === '+') self.rotate(angle);
				else if(command === '[') self.tPush();
				else if(command === ']') self.tPop()
        if(commands.length === 0) {
          clearInterval(goIntId);
        }
      }
    }, 10, this);
  };
	this.tPush = function(){
		stack.push([pen.x, pen.y, pen.angle]);
	};
	this.tPop = function(){
		var data = stack.pop();
		pen.x = data[0];
		pen.y = data[1];
		pen.angle = data[2];
	}
  init();
}

function expandLs(rules, count) {
  // Get Axiom
  var str = rules.shift(); // axiom
  // Then get the rules into a nice object
  var ruleList = {};
  for(var i = 0; i < rules.length; i++) {
    var rule = rules[i].split('=');
    ruleList[rule[0]] = rule[1];
  }
  // then iteritevely map the string to the expanded string
  for(var i = 0; i < count; i++) {
    var stringArray = str.split('');
    var newStringArray = stringArray.map(function(rule) {
      if(ruleList[rule] != undefined) return ruleList[rule];
			else return rule;
    });
    str = newStringArray.join('');
	}
	console.log(str);
  return str;
}