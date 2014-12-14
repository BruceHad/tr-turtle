var canvases = document.getElementsByClassName("canvas-wrapper");

var lsRules = { // posx, posy, dist, angle, iterations, starting angle,rules
	"Dragon Curve": 	{posx: 200.5, posy: 150.5, dist: 5, angle: 90, iterations: 8, starting_angle: 0, rules:['FX', 'F=', 'X=X+YF+', 'Y=-FX-Y']},
  "Whispy Tree": 		{posx: 100.5, posy: 290.5, dist: 5, angle: 25, iterations: 3, starting_angle: 360, rules:['FX', 'F=C0FF-[C1-F+F]+[C2+F-F]', 'X=C0FF+[C1+F]+[C3-F]']},
  "Fractal Plant":	{posx: 200.5, posy: 290.5, dist: 7, angle: 25, iterations: 3, starting_angle: 360, rules: ['X', 'X=F-[[X]+X]+F[+FX]-X', 'F=FF']}
};

var pen = {
  colour: '#748700',
  width: 1,
  startX: 200.5,
  startY: 150.5,
  startAngle: 0.25
};

var timeoutId, shownCanvas; // Needs to be global
function detectCanvas() {
  // Detects the visibile canvas and activates if necc.
  // Called every time user scrolls/page loads
  // but buffer set to only run every 300ms or so.
  console.log("hello");
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

var myTurtle, myCanvas;
function updatePage(section) {
  for(var i = 0; i < canvases.length; i++) {
    var id = canvases[i].getAttribute("id");
    if(id === section) {
      console.log(section);
      canvases[i].setAttribute("class", "canvas-wrapper show");
    } else {
      canvases[i].setAttribute("class", "canvas-wrapper hide");
    }
  }
  myCanvas = new Canvas("canvas" + section, pen);
  myTurtle = new Turtle(myCanvas, pen);
  myController = new Controller(myTurtle);
  if(section === "three"){
    setLs();
  }
}

var activeRule;
function setLs() {
  var ruleList = document.getElementById("rule-list");
  if(ruleList.childNodes.length > 1) return; // don't repeatedly add nodes
  var count = 0;
  for(ruleName in lsRules) {
    if(count === 0) activeRule = lsRules[ruleName];
    var radio = createRadio(ruleName, count === 0 ? true : false);
    ruleList.appendChild(radio);
    count++;
  }
}

function createRadio(ruleName, checked) {
  var p = document.createElement("div");
  p.setAttribute("class", "radio-p");
  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("name", "ls-system");
  radio.setAttribute("value", ruleName);
  radio.setAttribute("id", ruleName);
  if(checked) radio.setAttribute("checked", "true");
  var label = document.createElement("label");
  label.setAttribute("for", ruleName);
  label.innerHTML = ruleName;
  p.appendChild(radio);
  p.appendChild(label);
  return p;
}

function updateRules(event){
  activeRule = lsRules[event.target.value];
  myTurtle.clear();
  myController.commandString="";
}

// function getRules(){
//   var rules = [];
//   if(document.getElementById('ls-axiom').value != 'undefined') rules.push(document.getElementById('ls-axiom').value);
//   if(document.getElementById('ls-rule1').value != 'undefined') rules.push(document.getElementById('ls-rule1').value);
//   if(document.getElementById('ls-rule2').value != 'undefined') rules.push(document.getElementById('ls-rule2').value);
//   if(document.getElementById('ls-rule3').value != 'undefined') rules.push(document.getElementById('ls-rule3').value);
//   if(document.getElementById('ls-rule4').value != 'undefined') rules.push(document.getElementById('ls-rule4').value);
//   if(document.getElementById('ls-rule5').value != 'undefined') rules.push(document.getElementById('ls-rule5').value);
//   return rules;
// }

// function startLs(){
// 	var length = document.getElementById("string-length");
// 	var linesDrawn = document.getElementById("lines-drawn");
// 	var intervalId = window.setInterval(function(){
// 		if(myController.commandString.length === 0) window.clearInterval(intervalId);
// 		length.innerHTML = myController.commandString.length;
// 		linesDrawn.innerHTML = myTurtle.linesDrawn;
// 	}, 1000);
// }


// Event Handlers
// window.onload = scrolled;
window.onscroll = detectCanvas;
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
  else if(e.target.name === "ls-go") myController.set(activeRule);
  else if(e.target.name === "clear") {myTurtle.clear(); myController.commandString="";}
  else if(e.target.name === "ls-system") updateRules(e);
  e.stopPropagation();
}
