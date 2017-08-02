var funcInit = function() {
  var lsRules = { // posx, posy, dist, angle, iterations, starting angle,rules
    "Dragon Curve": {
      x: 150,
      y: 250,
      distance: 5,
      turnAngle: 90,
      iterations: 13,
      startAngle: 90,
      rules: ['FX', 'F=', 'X=X+YF+', 'Y=-FX-Y']
    },
    "Shaggy Bush": {
      x: 10,
      y: 370,
      distance: 6,
      turnAngle: 20,
      iterations: 5,
      startAngle: 330,
      rules: ['FX', 'F=C0FF-[>C1-F+F]<+[C2+F-F]', 'X=C0FF+[C1+F]+[C3-F]']
    },
    "Fractal Plant": {
      x: 200,
      y: 350,
      distance: 2,
      turnAngle: 25,
      iterations: 6,
      startAngle: 270,
      rules: ['X', 'X=F-[>[X]+X]+F[+FX]<-X', 'F=FF']
    },
    "Pythagoras Tree": {
      x: 300,
      y: 360,
      distance: 2,
      turnAngle: 45,
      iterations: 7,
      startAngle: 270,
      rules: ['G', 'F=FF', 'G=F[-G]+G']
    }
  };
  var myTurtle = new Turtle("canvasone");
  var myCont = new Controller(myTurtle);
  var lsSystem = new System();
  lsSystem.setUpRules();

  function System() {
    var createRadio = function(ruleName, checked) {
      var div = document.createElement("div");
      div.setAttribute("class", "radio-p");
      var radio = document.createElement("input");
      radio.setAttribute("type", "radio");
      radio.setAttribute("name", "ls-system");
      radio.setAttribute("value", ruleName);
      radio.setAttribute("id", ruleName);
      if(checked) radio.setAttribute("checked", "true");
      var label = document.createElement("label");
      label.setAttribute("for", ruleName);
      label.innerHTML = ruleName;
      div.appendChild(radio);
      div.appendChild(label);
      return div;
    };
    this.setUpRules = function() {
      var ruleList = document.getElementById("rule-list");
      var count = 0;
      for(ruleName in lsRules) {
        if(count === 0) {activeRule = ruleName;}
        var radio = createRadio(ruleName, count === 0 ? true : false);
        ruleList.appendChild(radio);
        count++;
      }
      this.updateRules(activeRule);
    };
    this.updateRules = function(ruleName) {
      var ruleDetails = lsRules[ruleName];
      var rules = ruleDetails["rules"];
      document.getElementById('ls-axiom').value = rules[0];
      document.getElementById('ls-rule1').value = rules[1];
      document.getElementById('ls-rule2').value = rules[2];
      document.getElementById('ls-rule3').value = rules[3];
      document.getElementById('ls-rule4').value = rules[4];
      document.getElementById('ls-rule5').value = rules[5];
      document.getElementById('ls-distance').value = ruleDetails["distance"];
      document.getElementById('ls-start-angle').value = ruleDetails["startAngle"];
      document.getElementById('ls-turn-angle').value = ruleDetails["turnAngle"];
      document.getElementById('ls-iterations').value = ruleDetails["iterations"];
      document.getElementById('ls-x').value = ruleDetails["x"];
      document.getElementById('ls-y').value = ruleDetails["y"];
    };
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
    this.clear = function(){
      var startAngle = document.getElementById('ls-start-angle').value;
      var x = document.getElementById('ls-x').value;
      var y = document.getElementById('ls-y').value;
      myCont.init(x, y, startAngle);
    }
  }
  document.addEventListener('click', function(e) {
    switch(e.target.name) {
      case "ls-system":
      lsSystem.updateRules(e.target.value);
      break;
      case "ls-go":
      lsSystem.run();
      break;
      case "ls-clear":
      lsSystem.clear();
      break;
      default:
      console.log(e.target.name);
    }
    e.stopPropagation();
  });
}
document.addEventListener('DOMContentLoaded', funcInit);
