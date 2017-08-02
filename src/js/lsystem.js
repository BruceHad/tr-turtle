/* global Turtle, Controller */

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
  var li = document.createElement('li');
  li.innerHTML = `<input name='ls-system' value='${ruleName}' type='radio' ${checked ? 'checked' : ''}><label for='${ruleName}'>${ruleName}</label>`;
  return li;
}

function setUpRules(ruleList) {
  // Create a list of preset rules from lsRules
  let activeRule, 
    ruleUL = document.getElementById('rule-list');
  for (let ruleName in ruleList) {
    // set one of the rules as active
    if(activeRule === undefined) activeRule = ruleName;
    // create radio and append to ruleUL
    var radio = createRadio(ruleName, activeRule === ruleName ? true : false);
    ruleUL.appendChild(radio);
  }
  updateRules(ruleList[activeRule]);
}

function updateRules(ruleData) {
  // insert rule data into form
  let rules = ruleData['rules'];
  document.getElementById('ls-axiom').value = rules[0];
  document.getElementById('ls-rule1').value = rules[1];
  document.getElementById('ls-rule2').value = rules[2];
  document.getElementById('ls-rule3').value = rules[3];
  document.getElementById('ls-rule4').value = rules[4];
  document.getElementById('ls-rule5').value = rules[5];
  document.getElementById('ls-distance').value = ruleData['distance'];
  document.getElementById('ls-start-angle').value = ruleData['startAngle'];
  document.getElementById('ls-turn-angle').value = ruleData['turnAngle'];
  document.getElementById('ls-iterations').value = ruleData['iterations'];
  document.getElementById('ls-x').value = ruleData['x'];
  document.getElementById('ls-y').value = ruleData['y'];
}

function System() {
  this.run = function() {
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
  };
  this.clear = function() {
    var startAngle = document.getElementById('ls-start-angle').value;
    var x = document.getElementById('ls-x').value;
    var y = document.getElementById('ls-y').value;
    myCont.init(x, y, startAngle);
  };
}

setUpRules(lsRules);
let myTurtle = new Turtle('canvasone');
let myCont = new Controller(myTurtle);
let lsSystem = new System();


document.addEventListener('click', function(e) {
  switch (e.target.name) {
    case 'ls-system':
      updateRules(lsRules[e.target.value]);
      break;
    case 'ls-go':
      lsSystem.run();
      break;
    case 'ls-clear':
      lsSystem.clear();
      break;
    default:
      console.log(e.target.name);
  }
  e.stopPropagation();
});
