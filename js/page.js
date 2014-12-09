var canvases = document.getElementsByClassName("canvas-wrapper");
var timeoutId, shownCanvas, myTurtle, myCanvas;
var lsRules = { // posx, posy, dist, angle, iterations, starting angle,rules
	"Dragon Curve": 	[200.5, 150.5, 5, 90, 8, 0, 'FX', 'F=', 'X=X+YF+', 'Y=-FX-Y'],
  "Whispy Tree": 		[100.5, 290.5, 5, 25, 3, 300, 'FX', 'F=C0FF-[C1-F+F]+[C2+F-F]', 'X=C0FF+[C1+F]+[C3-F]'],
	"Fractal Plant":	[200.5, 290.5, 7, 25, 3, 270, 'X', 'X=F-[[X]+X]+F[+FX]-X', 'F=FF']
};

var pen = {
  colour: '#ffffff',
  width: 1,
  startX: 200.5,
  startY: 150.5,
  startAngle: 0.25
};

function createRadio(ruleName, checked) {
  var p = document.createElement("p");
  p.setAttribute("class", "radio-p");
  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("name", "ls-system");
  radio.setAttribute("value", ruleName);
  if(checked) radio.setAttribute("checked", "true");
  var span = document.createElement("span");
  span.innerHTML = ruleName;
  p.appendChild(radio);
  p.appendChild(span);
  return p;
}

function displayLsRadio() {
  var ruleList = document.getElementById("rule-list");
  if(ruleList.childNodes.length > 1) return; // don't repeatedly add nodes
  var count = 0;
  for(ruleName in lsRules) {
    var radio = createRadio(ruleName, count === 0 ? true : false);
    ruleList.appendChild(radio);
    count++;
  }
  updateRules();
}

function updateRules(){
  var rule = lsRules[document.querySelector('input[name = "ls-system"]:checked').value];
	document.getElementById('ls-x').value = rule[0];
	document.getElementById('ls-y').value = rule[1];
  document.getElementById('ls-distance').value = rule[2];
  document.getElementById('ls-angle').value = rule[3];
	document.getElementById('ls-iterations').value = rule[4];
	document.getElementById('ls-start-angle').value = rule[5];
  document.getElementById('ls-axiom').value = rule[6];
  document.getElementById('ls-rule1').value = rule[7];
  document.getElementById('ls-rule2').value = rule[8];
  document.getElementById('ls-rule3').value = rule[9];
  document.getElementById('ls-rule4').value = rule[10];
  document.getElementById('ls-rule5').value = rule[11];
	// Hacky
}

function scrolled() {
  if(!timeoutId) {
    timeoutId = setTimeout(function() {
      var visible;
      // Check to see if any of the canvases are visible.
      for(var i = 0; i < canvases.length; i++) {
        var elem = canvases[i];
        var top = elem.getBoundingClientRect().top;
        var bottom = elem.getBoundingClientRect().bottom;
        var middle = top + (bottom - top) / 2;
        var elem_id = elem.getAttribute("id");
        if(middle > window.innerHeight * 1 / 5 && middle < window.innerHeight * 4 / 5) {
          visible = elem_id;
        }
      }
      if(visible && visible != shownCanvas) {
        shownCanvas = visible;
        updatePage(visible);
      }
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }, 300);
  }
};

function updatePage(section) {
  for(var i = 0; i < canvases.length; i++) {
    var id = canvases[i].getAttribute("id");
    if(id === section) {
      canvases[i].setAttribute("class", "canvas-wrapper show");
    } else {
      canvases[i].setAttribute("class", "canvas-wrapper hide");
    }
  }
  myCanvas = new Canvas("canvas" + section, pen);
  myTurtle = new Turtle(myCanvas, pen);
  myController = new Controller(myTurtle);
  if(section === "three"){
    displayLsRadio();
  }
}

function getRules(){
  var rules = [];
  if(document.getElementById('ls-axiom').value != 'undefined') rules.push(document.getElementById('ls-axiom').value);
  if(document.getElementById('ls-rule1').value != 'undefined') rules.push(document.getElementById('ls-rule1').value);
  if(document.getElementById('ls-rule2').value != 'undefined') rules.push(document.getElementById('ls-rule2').value);
  if(document.getElementById('ls-rule3').value != 'undefined') rules.push(document.getElementById('ls-rule3').value);
  if(document.getElementById('ls-rule4').value != 'undefined') rules.push(document.getElementById('ls-rule4').value);
  if(document.getElementById('ls-rule5').value != 'undefined') rules.push(document.getElementById('ls-rule5').value);
  return rules;
}


// Event Handlers
window.onload = scrolled;
window.onscroll = scrolled;
var controls = document.getElementsByClassName("buttons");
for(var i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", doSomething, false);
}

function doSomething(e) {
  if(e.target.name === "forward") myTurtle.forward(document.getElementById("distance").value);
  else if(e.target.name === "left") myTurtle.rotate(0.25, "left");
  else if(e.target.name === "right") myTurtle.rotate(0.25, "right");
  else if(e.target.name === "add-forward") myController.queue("F");
  else if(e.target.name === "add-left") myController.queue("L");
  else if(e.target.name === "add-right") myController.queue("R");
  else if(e.target.name === "tt-go") myController.go(document.getElementById("tt-string").value,document.getElementById("tt-distance").value, 0.25);
	else if(e.target.name === "ls-go") {
		var rules = getRules();
		var iterations = document.getElementById('ls-iterations').value;
		var string = myController.expandLs(rules, iterations);
		var angle = document.getElementById('ls-angle').value/360;
		var startAngle = document.getElementById('ls-start-angle').value/360;
		myTurtle.angle = startAngle* Math.PI * 2;
// 		myTurtle.x = document.getElementById('ls-x').value;
// 		myTurtle.y = document.getElementById('ls-y').value;
		var distance = document.getElementById('ls-distance').value;
		myController.go(string, distance, angle);
	}
  else if(e.target.name === "clear") myTurtle.clear();
  else if(e.target.name === "ls-system") updateRules();
  e.stopPropagation();
}
