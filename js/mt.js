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

function expandLs(rules, count) {
  // Lindermayer System
  // Applies rules to string and returns results.
  var str = rules.shift(); // axiom
  // Read rules
  var ruleList = {};
  for(var i = 0; i < rules.length; i++) {
    var rule = rules[i].split('=');
    ruleList[rule[0]] = rule[1];
  }
  for(var i=0; i<count; i++){
    var sStr = str.split('');
    for (len = str.length, j=0; j<len; j++){
      var c = sStr[j];
      rule = ruleList[c];
      if(rule != undefined) sStr[j] = rule;
      str = sStr.join('');
    }
    console.log(str);
  }
  return str;
}

function getCommandString(){
  // Get command string from rules on page
  var rules = [];
  var count = document.getElementById('ls-iterations').value;
  rules[0] = document.getElementById('ls-axiom').value;
  if(document.getElementById('ls-rule1').value) rules[1] = document.getElementById('ls-rule1').value;
  if(document.getElementById('ls-rule2').value) rules[2] = document.getElementById('ls-rule2').value;
  if(document.getElementById('ls-rule3').value) rules[3] = document.getElementById('ls-rule3').value;
  if(document.getElementById('ls-rule4').value) rules[4] = document.getElementById('ls-rule4').value;
  if(document.getElementById('ls-rule5').value) rules[5] = document.getElementById('ls-rule5').value;
  return expandLs(rules, count);
}

function Turtle(name) {
  var start = [200.5, 150.5, 0]; // x, y, angle - Half pixel offset
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
    var stepLength = 3;
    // var rate = stepLength/12; // around 10 pixels per second
    var steps = dist/stepLength;
    var count = 0;
    var intId = setInterval(function() {
      pos2 = [location[0] + Math.cos(angle) * stepLength, location[1] + Math.sin(angle) * stepLength];
      if(pen.draw) canvas.draw(location, pos2, pen);
      location = [pos2[0], pos2[1]];
      count++;
      if(count >= steps) {
        count = 0;
        clearInterval(intId);
        isAnimating = false;
      }
    }, 83); // around 12 frames per second
  };
  this.clear = function() {
    canvas = new Canvas(name);
    location = [start[0], start[1]];
    angle = start[2];
    document.getElementById("distance").value = "20";
    document.getElementById("ls-string").value = "";
  };
  this.queue = function(command) {
    document.getElementById("ls-string").value += command;
  };
  this.go = function() {
    var dist = 5;
    console.log(dist);
    var commandString = document.getElementById("ls-string").value || getCommandString();
    var arr = commandString.split('');
    if(arr.length === 0) return;
    var intId = setInterval(anim, 10, this);

    function anim(self) {
      if(!isAnimating) {
        var command = arr.shift();
        if(command === 'F') self.forward(dist);
        else if(command === 'L' || command === '−') self.rotate(-0.25);
        else if(command === 'R' || command === '+') self.rotate(0.25);
        if(arr.length === 0) {
          clearInterval(intId);
        }
      }
    }
  };
}

// Event Handlers
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
