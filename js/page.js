var canvases = document.getElementsByClassName("canvas-wrapper");
var timeoutId, shownCanvas, myTurtle, myCanvas;
var lsRules = {
	"Dragon Curve": [0.5, 0.5, 5, 90, 'FX', 'F=', 'X=X+YF+', 'Y=−FX−Y'],
	"fractal plant": [0.1, 0.1, 3, 15, 'X', 'X=F-[[X]+X]+F[+FX]-X]', 'F=FF'],
  "Tree": [0.1, 0.1, 5, 25, 'FX', 'F=C0FF-[C1-F+F]+[C2+F-F]', 'X=C0FF+[C1+F]+[C3-F]']  
};

var controlsHTML = '\
<button name="left">Left</button>\
<button name="forward">Forward</button>\
<button name="right">Right</button>';

var settingsHTML = '\
<label for="angle">Angle: </label>\
<input type="text" id="angle" name="angle"><br>\
<label for="distance">Line Length: </label>\
<input type="text" id="distance" name="distance" value="10"><br>\
<label for="start-position">Starting Position:</label>\
<input type="text" id="position-x" class="narrow" name="start-position" maxlength="3">\
<input type="text" id="position-y" class="narrow"name="start-position" maxlength="3">\
<label for="ls-iterations">Iterations: </label>\
<input type="text" id="ls-iterations" value="">';

var actionsHTML = '\
<button name="clear">Clear Drawing</button>\
<button name="ls-go">Go Draw It</button>';

var stringHTML = '\
<label for="tt-string">Command Window: </label><br>\
<input type="text" id="tt-string" value="">';

var radioHTML = '\
<div id="rule-list"><!-- holder for LS Rules Radio Selector--></div>';

var lsHTML = '\
<label for="ls-axiom">Axiom: </label>\
<input type="text" id="ls-axiom" value=""><br>\
<label for="ls-rule1">Rule One: </label>\
<input type="text" id="ls-rule1" class="rule" value=""><br>\
<label for="ls-rule2">Rule Two: </label>\
<input type="text" id="ls-rule2" class="rule" value=""><br>\
<label for="ls-rule3">Rule Three: </label>\
<input type="text" id="ls-rule3" class="rule" value=""><br>\
<label for="ls-rule4">Rule Four: </label>\
<input type="text" id="ls-rule4" class="rule" value=""><br>\
<label for="ls-rule5">Rule Five: </label>\
<input type="text" id="ls-rule5" class="rule" value=""><br>';


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
    //     console.log(i + ":" + id + " " + section);
    if(id === section) {
      canvases[i].setAttribute("class", "canvas-wrapper show");
    } else {
      canvases[i].setAttribute("class", "canvas-wrapper hide");
    }
  }
	var ls = section === "one" : false ? true;
  myCanvas = new Canvas("canvas" + section);
  myTurtle = new Turtle(myCanvas, ls);
	generateForm(section);
}

function generateForm(sectionId){
	console.log(sectionId);
	var section = document.getElementById(sectionId);
	section.getElementsByClassName("turtle-controls")[0].innerHTML = controlsHTML;
	section.getElementsByClassName("turtle-settings")[0].innerHTML = settingsHTML;
	if(sectionId === "two") {
		section.getElementsByClassName("turtle-string")[0].innerHTML = stringHTML;
		section.getElementsByClassName("turtle-actions")[0].innerHTML = actionsHTML;
	}
	if(sectionId === "three") {
		section.getElementsByClassName("turtle-radio")[0].innerHTML = radioHTML;
		section.getElementsByClassName("turtle-ls-settings")[0].innerHTML = lsHTML;
		section.getElementsByClassName("turtle-actions")[0].innerHTML = actionsHTML;
		displayLsRadio();
	}
	setValues(sectionId);
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
}

function setValues(sectionId){
	if(sectionId === "one" || sectionId === "two"){
		console.log(sectionId);
		document.getElementById('position-x').value = Math.round(myTurtle.width/2)+0.5;
		document.getElementById('position-y').value = Math.round(myTurtle.height/2)+0.5;
		document.getElementById('ls-iterations').value = 4;
		document.getElementById('angle').value = 0;
	}
	else if(sectionId === "three"){
		var rule = lsRules[document.querySelector('input[name = "ls-system"]:checked').value];
		document.getElementById('position-x').value = Math.round(rule[0]*myTurtle.width);
		document.getElementById('position-y').value = Math.round(rule[1]*myTurtle.height);
		document.getElementById('ls-iterations').value = rule[2];
		document.getElementById('angle').value = rule[3];
		document.getElementById('ls-axiom').value = rule[4];
		document.getElementById('ls-rule1').value = rule[5];
		document.getElementById('ls-rule2').value = rule[6];
		document.getElementById('ls-rule3').value = rule[7];
		document.getElementById('ls-rule4').value = rule[8];
		document.getElementById('ls-rule5').value = rule[9];
	}
}
function displayRules(){
	var rule = lsRules[document.querySelector('input[name = "ls-system"]:checked').value];
	console.log(myTurtle.width);
	document.getElementById('position-x').value = Math.round(rule[0]*myTurtle.width) || "";
	console.log(document.getElementById('position-x').value);
	document.getElementById('position-y').value = Math.round(rule[1]*myTurtle.height) || "";
	document.getElementById('ls-iterations').value = rule[2] || "";
	document.getElementById('angle').value = rule[3] || "";
	document.getElementById('ls-axiom').value = rule[4] || "";
	document.getElementById('ls-rule1').value = rule[5] || "";
	document.getElementById('ls-rule2').value = rule[6] || "";
	document.getElementById('ls-rule3').value = rule[7] || "";
	document.getElementById('ls-rule4').value = rule[8] || "";
	document.getElementById('ls-rule5').value = rule[9] || "";
}

function runLs() {
	var cs = getCommandString();
  var dist = parseInt(document.getElementById("distance").value);
  var angle = parseInt(document.getElementById("angle").value) / 360;
  myTurtle.go(cs, dist, angle);
}

function getCommandString() {
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
// Event Handlers
window.onload = scrolled;
window.onscroll = scrolled;
var controls = document.getElementsByClassName("buttons");
for(var i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", doSomething, false);
}

function doSomething(e) {
  if(e.target.name === "forward") myTurtle.move();
  else if(e.target.name === "left") myTurtle.turn("L");
  else if(e.target.name === "right") myTurtle.turn("R");
  else if(e.target.name === "tt-go") myTurtle.go();
  else if(e.target.name === "ls-go") runLs();
  else if(e.target.name === "clear") myTurtle.clear();
  else if(e.target.name === "ls-system") displayRules();
  e.stopPropagation();
}