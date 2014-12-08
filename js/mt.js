var animating = false;
function Canvas(canvasId, pen) {
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  this.width = canvas.width;
  this.height = canvas.height;
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

function Turtle(activeCanvas, pen) {
  var canvas = activeCanvas;
  var x = pen.startX;
  var y = pen.startY;
  var angle = pen.startAngle;
  animating = false;
  var intId;
  this.width = canvas.width;
  this.height = canvas.height;
  this.rotate = function(rotateAngle, dir) {
    if(dir === "left") var direction = -1;
    else var direction = 1;
    angle += direction * rotateAngle * Math.PI * 2;
  };
  this.forward = function(moveLength) {
    animating = true;
    var stepLength = 6;
    var steps = moveLength / stepLength;
    var count = 0;
    intId = setInterval(function() {
      var newx = x + Math.cos(angle) * stepLength;
      var newy = y + Math.sin(angle) * stepLength;
      canvas.draw([x, y], [newx, newy]);
      x = newx;
      y = newy;
      count++;
      if(count >= steps) {
        count = 0;
        window.clearInterval(intId);
        animating = false;
      }
    }, 41); // around 24 frames per second
  };
  this.clear = function() {
    if(animating) {
      window.clearInterval(intId);
      animating = false;
    }
    x = pen.startX;
    y = pen.startY;
    angle = pen.startAngle;
    canvas.clear();
  };
}

function Controller(turtle){
  var stack = [];
  this.queue = function(command) {
    document.getElementById("tt-string").value += command;
  };
  this.go = function(commandStr, distance, angle) {
    var commands = commandStr.split('');
    var intId = setInterval(function(self) {
      if(!animating) {
        var command = commands.shift();
        if(command === 'F') turtle.forward(distance);
        else if(command === 'L' || command === '−') turtle.rotate(-1* angle);
        else if(command === 'R' || command === '+') turtle.rotate(angle);
        else if(command === '[') self.tPush();
        else if(command === ']') self.tPop();
        if(commands.length === 0) {
          window.clearInterval(intId);
        }
      }
    }, 10, this);
  };
  this.tPush = function(){
    stack.push([turtle.x, turtle.y, turtle.angle]);
  };
  this.tPop = function(){
    var data = stack.pop();
    turtle.x = data[0];
    turtle.y = data[1];
    turtle.angle = data[2];
  };
  this.expandLs = function(rules, count) {
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
//     console.log(str);
    return str;
  };
}
