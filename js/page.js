var lsRules = {
  dragon: [5, 'FX', 'F=', 'X=X+YF+', 'Y=−FX−Y'],
  blank: [0, '']
}
var canvases = document.getElementsByClassName("canvas-wrapper");
var timeoutId, shownCanvas;
function scrolled() {
  if(!timeoutId) {
    timeoutId = setTimeout(function() {
			var visible;
			// Check to see if any of the canvases are visible.
      for(var i = 0; i < canvases.length; i++) {
        var elem = canvases[i];
        var top = elem.getBoundingClientRect().top;
				var bottom = elem.getBoundingClientRect().bottom;
				var middle = top+(bottom-top)/2;
        var elem_id = elem.getAttribute("id");
        if(middle > window.innerHeight * 1/5 
					 &&	middle < window.innerHeight * 4/5) {
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
    console.log(i+":"+id+" "+section);
    if(id === section) {
      canvases[i].setAttribute("class", "canvas-wrapper show");
    } else {
      canvases[i].setAttribute("class", "canvas-wrapper hide");
    }
    if(i === 2) {
      setLs()
    }
  }
  turtle = new Turtle("canvas"+section);
}

function setLs() {
  var selectedRule = document.querySelector('input[name = "ls-system"]:checked').value;
  var rule = lsRules[selectedRule];
  document.getElementById('ls-iterations').value = rule[0] || "";
  document.getElementById('ls-axiom').value = rule[1] || "";
  document.getElementById('ls-rule1').value = rule[2] || "";
  document.getElementById('ls-rule2').value = rule[3] || "";
  document.getElementById('ls-rule3').value = rule[4] || "";
  document.getElementById('ls-rule4').value = rule[5] || "";
  document.getElementById('ls-rule5').value = rule[6] || "";
}
// var dragonString = expandLs(['FX', 'F=', 'X=X+YF+', 'Y=−FX−Y'],5);
// var dragonString = expandLs(['F=C0FF-[C1-F+F+F]+[C2+F-F-F]'],5);
// console.log(dragonString);
// 
// Event Handler
window.onscroll = scrolled;
scrolled();