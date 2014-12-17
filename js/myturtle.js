function fractionToRad(fraction) {
  return fraction * Math.PI * 2;
}

function degreeToRad(degree) {
  return degree * Math.PI / 180;
}

function offset(value) {
  // 	canvas lines look best as integers offset by half pixel
  // 	http://www.rgraph.net/docs/howto-get-crisp-lines-with-no-antialias.html
  return(Math.floor(value) + 0.5);
}

function expandLs(rules, iter) {
  // Takes a list of ls rules and returns resulting string
  var str = rules.shift(); // axiom
  var ruleList = {};
  for(var i = 0; i < rules.length; i++) {
    var rule = rules[i].split('=');
    ruleList[rule[0]] = rule[1];
  }
  // map the string to the expanded string
  for(var i = 0; i < iter; i++) {
    var stringArray = str.split('');
    var newStringArray = stringArray.map(function(rule) {
      if(ruleList[rule] != undefined) return ruleList[rule];
      else return rule;
    });
    try {
      str = newStringArray.join('');
      var limit = 500000;
      if(str.length > limit) throw new Error("Too many commands: " + str.length + "\n Limited to " + limit);
    } catch(e) {
      alert(e.message);
      console.log(e);
      break;
    }
  }
  return str;
};

function Canvas(canvasId, pen) {
  var cv = document.getElementById(canvasId);
  var ctx = cv.getContext('2d');
  this.width = cv.width;
  this.height = cv.height;
  ctx.clearRect(0, 0, this.width, this.height); // clean canvas
  this.draw = function(start, end) {
    ctx.strokeStyle = pen.colour;
    ctx.lineWidth = pen.width;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };
  this.clear = function() {
    ctx.clearRect(0, 0, this.width, this.height);
  }
}

function Turtle(canvasId) {
  var pen = {
    colour: '#ffffff',
    width: 1
  };
  var canvas = new Canvas(canvasId, pen);
  var intId;
  // default position and angle.
  var startPos = [offset(canvas.width / 2), offset(canvas.height / 2)];
  var startAngle = degreeToRad(90);
  this.moving = false;
  this.position = [startPos[0], startPos[1]];
  this.angle = startAngle;
  this.rotate = function(turnAngle) {
    this.angle += degreeToRad(turnAngle);
  };
  this.forward = function(moveLength) {
    moveLength = Math.floor(moveLength); // must be an integer
    var newx = this.position[0] + Math.cos(this.angle) * moveLength;
    var newy = this.position[1] + Math.sin(this.angle) * moveLength;
    canvas.draw(this.position, [newx, newy]);
    this.position = [newx, newy];
  };
  this.reset = function() {
    if(this.moving) {
      window.clearInterval(intId);
      this.moving = false;
    }
    this.position = [startPos[0], startPos[1]];
    this.angle = startAngle;
    canvas.clear();
  };
  this.move = function(x, y, angle) {
    // resets the starting position and angle.
    var startPos = [offset(x), offset(y)];
    var startAngle = degreeToRad(angle);
    this.moving = false;
    this.position = [startPos[0], startPos[1]];
    this.angle = startAngle;
  };
}

function Controller(turtle) {
  var stack = [];
  var commandString="", intId;
  this.stackPush = function() {
    var data = [turtle.position, turtle.angle];
    stack.push(data);
  };
  this.stackPop = function() {
    var data = stack.pop();
    turtle.position = data[0];
    turtle.angle = data[1];
  };
  this.init = function(x, y, sAngle) {
    window.clearInterval(intId);
    commandString = "";
    stack = [];
    turtle.reset();
    turtle.move(x, y, sAngle);

  };
  this.queue = function(command) {
    commandString += command;
  };
  this.setCommandString = function(str) {
    commandString = str;
  };
  this.go = function(moveLength, turnAngle, animate, rules, iterations) {
    console.log(animate);
    if(commandString==="") commandString = expandLs(rules, iterations);
    var commands = commandString.split('');
    if(!animate) {
      for(var i = 0; i < commands.length; i++) {
        if(commands[i] === 'F' || commands[i] === 'G') turtle.forward(moveLength);
        else if(commands[i] === 'L' || commands[i] === '-') turtle.rotate(-1 * turnAngle);
        else if(commands[i] === 'R' || commands[i] === '+') turtle.rotate(turnAngle);
        else if(commands[i] === '[') this.stackPush();
        else if(commands[i] === ']') this.stackPop();
      }
    } else {
      intId = setInterval(function(self) {
        if(!turtle.moving) {
          var command = commands.shift();
          self.commandString = commands.join('');
          if(command === 'F') turtle.forward(moveLength);
          else if(command === 'L' || command === '-') turtle.rotate(-1 * turnAngle);
          else if(command === 'R' || command === '+') turtle.rotate(turnAngle);
          else if(command === '[') self.stackPush();
          else if(command === ']') self.stackPop();
          if(commands.length === 0) {
            window.clearInterval(intId);
          }
        }
      }, 10, this);
    }
  };
}
