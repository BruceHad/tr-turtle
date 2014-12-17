var funcInit = function() {
  var canvases = document.getElementsByClassName("canvas-wrapper");
  var shownCanvas, timeoutId; // Needs to be global
  var oneTurtle = new Turtle("canvasone");
  var twoTurtle = new Turtle("canvastwo");
	var twoCont = new Controller(twoTurtle);
	twoCont.init(200, 100, 0);

  function detectCanvas() {
    // Detects the visibile canvas and activates if necc.
    // Called every time user scrolls/page loads
    // but buffer set to only run every 300ms or so.
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
  }
  document.addEventListener('click', function(e) {
    switch(e.target.name) {
      case "t-left":
        oneTurtle.rotate(-90);
        break;
      case "t-forward":
        oneTurtle.forward(10, true);
        break;
      case "t-right":
        oneTurtle.rotate(90);
        break;
      case "t-clear":
        oneTurtle.reset();
        break;

			case "queue-left":
        twoCont.queue("L");
				document.getElementById("tt-string").value += "L";
        break;
      case "queue-forward":
        twoCont.queue("F");
				document.getElementById("tt-string").value += "F";
        break;
      case "queue-right":
        twoCont.queue("R");
				document.getElementById("tt-string").value += "R";
        break;
      case "queue-clear":
				document.getElementById("tt-string").value = "";
        twoCont.init(200, 100, 0);
        break;
			case "queue-go":
				twoCont.setCommandString( document.getElementById("tt-string").value);
        twoCont.go(10,90, true);
        break;
      default:
        console.log(e.target.name);
    }
    e.stopPropagation();
  });
  window.onscroll = detectCanvas;
}
document.addEventListener('DOMContentLoaded', funcInit);
// var timeoutId, shownCanvas; // Needs to be global
// function detectCanvas() {
//   // Detects the visibile canvas and activates if necc.
//   // Called every time user scrolls/page loads
//   // but buffer set to only run every 300ms or so.
//   console.log("hello");
//   if(!timeoutId) {
//     timeoutId = setTimeout(function() {
//       var visible;
//       // Check to see if any of the canvases are visible.
//       for(var i = 0; i < canvases.length; i++) {
//         var elem = canvases[i];
//         var top = elem.getBoundingClientRect().top;
//         var bottom = elem.getBoundingClientRect().bottom;
//         var middle = top + (bottom - top) / 2;
//         var elem_id = elem.getAttribute("id");
//         if(middle > window.innerHeight * 1 / 5 && middle < window.innerHeight * 4 / 5) {
//           visible = elem_id;
//         }
//       }
//       if(visible && visible != shownCanvas) {
//         shownCanvas = visible;
//         updatePage(visible);
//       }
//       window.clearTimeout(timeoutId);
//       timeoutId = null;
//     }, 300);
//   }
// };
// var myTurtle, myCanvas;
// function updatePage(section) {
//   for(var i = 0; i < canvases.length; i++) {
//     var id = canvases[i].getAttribute("id");
//     if(id === section) {
//       console.log(section);
//       canvases[i].setAttribute("class", "canvas-wrapper show");
//     } else {
//       canvases[i].setAttribute("class", "canvas-wrapper hide");
//     }
//   }
//   myCanvas = new Canvas("canvas" + section, pen);
//   myTurtle = new Turtle(myCanvas, pen);
//   myController = new Controller(myTurtle);
//   if(section === "three"){
//     setLs();
//   }
// }
// var activeRule;
// function setLs() {
//   var ruleList = document.getElementById("rule-list");
//   if(ruleList.childNodes.length > 1) return; // don't repeatedly add nodes
//   var count = 0;
//   for(ruleName in lsRules) {
//     if(count === 0) activeRule = lsRules[ruleName];
//     var radio = createRadio(ruleName, count === 0 ? true : false);
//     ruleList.appendChild(radio);
//     count++;
//   }
// }
// function createRadio(ruleName, checked) {
//   var p = document.createElement("div");
//   p.setAttribute("class", "radio-p");
//   var radio = document.createElement("input");
//   radio.setAttribute("type", "radio");
//   radio.setAttribute("name", "ls-system");
//   radio.setAttribute("value", ruleName);
//   radio.setAttribute("id", ruleName);
//   if(checked) radio.setAttribute("checked", "true");
//   var label = document.createElement("label");
//   label.setAttribute("for", ruleName);
//   label.innerHTML = ruleName;
//   p.appendChild(radio);
//   p.appendChild(label);
//   return p;
// }
// function updateRules(event){
//   activeRule = lsRules[event.target.value];
//   myTurtle.clear();
//   myController.commandString="";
// }
// // function getRules(){
// //   var rules = [];
// //   if(document.getElementById('ls-axiom').value != 'undefined') rules.push(document.getElementById('ls-axiom').value);
// //   if(document.getElementById('ls-rule1').value != 'undefined') rules.push(document.getElementById('ls-rule1').value);
// //   if(document.getElementById('ls-rule2').value != 'undefined') rules.push(document.getElementById('ls-rule2').value);
// //   if(document.getElementById('ls-rule3').value != 'undefined') rules.push(document.getElementById('ls-rule3').value);
// //   if(document.getElementById('ls-rule4').value != 'undefined') rules.push(document.getElementById('ls-rule4').value);
// //   if(document.getElementById('ls-rule5').value != 'undefined') rules.push(document.getElementById('ls-rule5').value);
// //   return rules;
// // }
// // function startLs(){
// // 	var length = document.getElementById("string-length");
// // 	var linesDrawn = document.getElementById("lines-drawn");
// // 	var intervalId = window.setInterval(function(){
// // 		if(myController.commandString.length === 0) window.clearInterval(intervalId);
// // 		length.innerHTML = myController.commandString.length;
// // 		linesDrawn.innerHTML = myTurtle.linesDrawn;
// // 	}, 1000);
// // }
// // Event Handlers
// // window.onload = scrolled;
// window.onscroll = detectCanvas;
// var controls = document.getElementsByClassName("buttons");
// for(var i = 0; i < controls.length; i++) {
//   controls[i].addEventListener("click", doSomething, false);
// }
// function doSomething(e) {
//   if(e.target.name === "forward") myTurtle.forward(document.getElementById("distance").value);
//   else if(e.target.name === "left") myTurtle.rotate(0.25, "left");
//   else if(e.target.name === "right") myTurtle.rotate(0.25, "right");
//   else if(e.target.name === "add-forward") myController.queue("F");
//   else if(e.target.name === "add-left") myController.queue("L");
//   else if(e.target.name === "add-right") myController.queue("R");
//   else if(e.target.name === "tt-go") myController.go(document.getElementById("tt-string").value,document.getElementById("tt-distance").value, 0.25);
//   else if(e.target.name === "ls-go") myController.set(activeRule);
//   else if(e.target.name === "clear") {myTurtle.clear(); myController.commandString="";}
//   else if(e.target.name === "ls-system") updateRules(e);
//   e.stopPropagation();
// }