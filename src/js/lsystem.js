/* global Turtle, Controller */

// Main Canvas

const myTurtle = new Turtle('canvas');
const myCont = new Controller(myTurtle);

const lsRules = { // posx, posy, dist, angle, iterations, starting angle,rules
  'Dragon Curve': {
    x: 150,
    y: 250,
    distance: 5,
    turnAngle: 90,
    iterations: 13,
    startAngle: 90,
    rules: ['FX', 'F=', 'X=X+YF+', 'Y=-FX-Y']
  },
  'Shaggy Bush': {
    x: 10,
    y: 370,
    distance: 6,
    turnAngle: 20,
    iterations: 5,
    startAngle: 330,
    rules: ['FX', 'F=C0FF-[>C1-F+F]<+[C2+F-F]', 'X=C0FF+[C1+F]+[C3-F]']
  },
  'Fractal Plant': {
    x: 200,
    y: 350,
    distance: 2,
    turnAngle: 25,
    iterations: 6,
    startAngle: 270,
    rules: ['X', 'X=F-[>[X]+X]+F[+FX]<-X', 'F=FF']
  },
  'Pythagoras Tree': {
    x: 300,
    y: 360,
    distance: 2,
    turnAngle: 45,
    iterations: 7,
    startAngle: 270,
    rules: ['G', 'F=FF', 'G=F[-G]+G']
  }
};

function createRadio(ruleName, checked) {
  // Creates a list element containing a radio box
  let container = document.createElement('p');
  let ruleId = ruleName.split(' ').map(function(elem) {
    return elem.toLowerCase();
  }).join('-');
  container.innerHTML = `<input name='ls-system' value='${ruleName}' id='${ruleId}' type='radio' ${checked ? 'checked' : ''}><label for='${ruleId}'>${ruleName}</label>`;
  return container;
}

function setUpRules(ruleList) {
  // Create a list of preset rules from lsRules
  let first = true;
  let form = document.getElementById('form-rules');
  for (var ruleName in ruleList) {
    if (first) updateRules(ruleList[ruleName]); // populates the rules
    // create radio and append to ruleUL, make 'checked' if first
    var radio = createRadio(ruleName, first);
    form.appendChild(radio);
    first = false;
  }
}

function updateRules(ruleData) {
  // insert rule data into form
  document.getElementById('ls-axiom').value = ruleData['rules'][0];
  document.getElementById('ls-rule1').value = ruleData['rules'][1];
  document.getElementById('ls-rule2').value = ruleData['rules'][2];
  document.getElementById('ls-rule3').value = ruleData['rules'][3];
  document.getElementById('ls-rule4').value = ruleData['rules'][4];
  document.getElementById('ls-rule5').value = ruleData['rules'][5];
  document.getElementById('ls-distance').value = ruleData['distance'];
  document.getElementById('ls-start-angle').value = ruleData['startAngle'];
  document.getElementById('ls-turn-angle').value = ruleData['turnAngle'];
  document.getElementById('ls-iterations').value = ruleData['iterations'];
  document.getElementById('ls-x').value = ruleData['x'];
  document.getElementById('ls-y').value = ruleData['y'];
}

function run() {
  var rules = [];
  rules[0] = document.getElementById('ls-axiom').value;
  rules[1] = document.getElementById('ls-rule1').value;
  rules[2] = document.getElementById('ls-rule2').value;
  rules[3] = document.getElementById('ls-rule3').value;
  rules[4] = document.getElementById('ls-rule4').value;
  rules[5] = document.getElementById('ls-rule5').value;

  var dist = document.getElementById('ls-distance').value;
  var startAngle = document.getElementById('ls-start-angle').value;
  var turnAngle = document.getElementById('ls-turn-angle').value;
  var iter = document.getElementById('ls-iterations').value;
  var x = document.getElementById('ls-x').value;
  var y = document.getElementById('ls-y').value;
  var animate = document.getElementById('ls-animate').checked;
  myCont.init(x, y, startAngle);
  myCont.go(dist, turnAngle, animate, rules, iter);
}

function clearCanvas() {
  var startAngle = document.getElementById('ls-start-angle').value;
  var x = document.getElementById('ls-x').value;
  var y = document.getElementById('ls-y').value;
  myCont.init(x, y, startAngle);
}

setUpRules(lsRules);

// Canvas 1

const myTurtleOne = new Turtle('canvasone');
const oneTurtle = {
  'rotateLeft': function() {
    myTurtleOne.rotate(-90);
  },
  'rotateRight': function() {
    myTurtleOne.rotate(90);
  },
  'forward': function() {
    myTurtleOne.forward(10, true);
  },
  'reset': function() {
    myTurtleOne.reset();
  }
};

// Canvas 2

const myTurtleTwo = new Turtle('canvastwo');
const myContTwo = new Controller(myTurtleTwo);
const twoTurtle = {
  'queueLeft': function() {
    myContTwo.queue('L');
    document.getElementById('tt-string').value += 'L';
  },
  'queueForward': function() {
    myContTwo.queue('F');
    document.getElementById('tt-string').value += 'F';
  },
  'queueRight': function() {
    myContTwo.queue('R');
    document.getElementById('tt-string').value += 'R';
  },
  'queueClear': function() {
    document.getElementById('tt-string').value = '';
    myContTwo.init(200, 100, 0);
  },
  'queueGo': function() {
    myContTwo.setCommandString(document.getElementById('tt-string').value);
    myContTwo.go(10, 90, true);
  }
};

// Event handlers
// Buttons
let buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(ev) {
    let actions = {
      'ls-go': run,
      'ls-clear': clearCanvas,
      't-left': oneTurtle.rotateLeft,
      't-forward': oneTurtle.forward,
      't-right': oneTurtle.rotateRight,
      't-clear': oneTurtle.reset,
      'queue-left': twoTurtle.queueLeft,
      'queue-forward': twoTurtle.queueForward,
      'queue-right': twoTurtle.queueRight,
      'queue-clear': twoTurtle.queueClear,
      'queue-go': twoTurtle.queueGo
    };
    actions[ev.target.name]();
  });
}

// Radios
let radios = document.querySelectorAll('input[type="radio"');
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener('click', function(ev) {
    updateRules(lsRules[ev.target.value]);
  });
}


