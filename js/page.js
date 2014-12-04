var canvases = document.getElementsByClassName("canvas-wrapper");
var timeoutId, shownCanvas, myTurtle, myCanvas;
var lsRules = {
  tree: [5, 25, 'FX', 'F=C0FF-[C1-F+F]+[C2+F-F]', 'X=C0FF+[C1+F]+[C3-F]'],
  dragon: [5, 90, 'FX', 'F=', 'X=X+YF+', 'Y=−FX−Y']
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
    if(i === 2) {
      // Hacky. Need to figure out better method.
      setLs(); // If set of rules is selected.
    }
  }
  myCanvas = new Canvas("canvas" + section);
  myTurtle = new Turtle(myCanvas);
}

function setLs() {
  var ruleList = document.getElementById("rule-list");
  if(ruleList.childNodes.length > 1) return; // don't repeatedly add nodes
  var count = 0;
  for(ruleName in lsRules) {
    var radio = createRadio(ruleName, count === 0 ? true : false);
    ruleList.appendChild(radio);
    count++;
  }
	displayRules();
}
function displayRules(){
	var rule = lsRules[document.querySelector('input[name = "ls-system"]:checked').value];
  console.log(rule);
  document.getElementById('ls-iterations').value = rule[0] || "";
  document.getElementById('ls-angle').value = rule[1] || "";
  document.getElementById('ls-axiom').value = rule[2] || "";
  document.getElementById('ls-rule1').value = rule[3] || "";
  document.getElementById('ls-rule2').value = rule[4] || "";
  document.getElementById('ls-rule3').value = rule[5] || "";
  document.getElementById('ls-rule4').value = rule[6] || "";
  document.getElementById('ls-rule5').value = rule[7] || "";
}

function runLs() {
  var cs = getCommandString();
  var dist = parseInt(document.getElementById("ls-distance").value);
  var angle = parseInt(document.getElementById("ls-angle").value) / 360;
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
  if(e.target.name === "forward") myTurtle.forward(50);
  else if(e.target.name === "left") myTurtle.rotate(-0.25);
  else if(e.target.name === "right") myTurtle.rotate(0.25);
  else if(e.target.name === "tt-forward") myTurtle.queue("F");
  else if(e.target.name === "tt-left") myTurtle.queue("L");
  else if(e.target.name === "tt-right") myTurtle.queue("R");
  else if(e.target.name === "tt-go") myTurtle.go();
  else if(e.target.name === "ls-go") runLs();
  else if(e.target.name === "clear") myTurtle.clear();
  else if(e.target.name === "ls-system") displayRules();
  e.stopPropagation();
}