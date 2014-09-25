function expandLs(str, rules) {
	// Lindermayer system - expand from the initial state using rules
	// 1. Extract rules
	var ruleList = {};
	for(var i = 0; i < rules.length; i++) {
		var rule = rules[i].split('>');
		ruleList[rule[0].trim()] = rule[1].trim();
	}
	// 2. Apply rules
	var sStr = str.split('');
	for(var j = 0; j < sStr.length; j++) {
		if(sStr[j] in ruleList) {
			sStr[j] = ruleList[sStr[j]];
		}
	}
	str = sStr.join('');
    console.log(str);
	return str;
}

function applyLs(str) {
	// Lindermayer system - translate string
	// into geometric structure
	md = new Dot(1 / 8, '#000', 3);
	var sStr = str.split('');
	forEach(sStr, function(ch) {
		if(ch === 'F') md.forward(10);
		else if(ch === '+') md.left();
		else if(ch === '-') md.right();
	});
}

function tick(){
	if(ls.count > ls.steps) {
		clearInterval(intId);
		console.log("done");
	} else {
		ls.lsString = expandLs(ls.lsString, ls.rules);
		applyLs(ls.lsString);
		ls.count++;
	}
}

function anim(){
	intId = setInterval(tick, 1000);
}

var systemRules = {
    'dragon': ['FX', 'F > ', 'X > X+YF+', 'Y > -FX-Y'],
    'null': ['FX', 'F > ', 'X > X+YF+', 'Y > -FX-YF']
};

var ls = {
	steps: 10,
	axiom: 'FX',
	rules: systemRules['dragon'].slice(1),
	lsString: 'FX',
	count: 0
};

function init() {
    if(typeof md != 'undefined') md.clear();
    var textBoxStr = "<h3>The L-System</h3>";
    textBoxStr += "<p>A <a href='http://en.wikipedia.org/wiki/L-system'>lindenmayer system</a> is made up of a starting point (axiom) and a set of rules used to repeatedly transform the string from the starting point.</p>";
    textBoxStr += "<p>The resulting string can then be used to control our Turtle.</p>";
    textBoxStr += "<form id='ls-rule' class='ls2-form'>";
    textBoxStr += "<p>Select a set of rules: <select id='ls-select'>"
    for (var prop in systemRules){
        textBoxStr += "<option value='"+prop+"'>"+prop+"</option>";
    }
    textBoxStr += "</select></p>"
    textBoxStr += "<p>Or enter your own rules:</p>";
    textBoxStr += "<p><input type='number' id='ls-steps' name='ls-steps' value="+ls.steps+"><label for='ls-steps'>No. of Steps</label><br>";
    textBoxStr += "<input type='text' id='ls-axiom' name='ls-axion' value="+ls.axiom+"><label for='ls-axion'>Axiom</label><br>";
    for(var i = 1; i <= ls.rules.length; i++) {
        textBoxStr += "<input type='text' id='ls-rule-"+i+"' name='ls-rule-"+i+"' value='"+ls.rules[i-1]+"'><label for='ls-rule-"+i+"'>Rule "+i+"</label><br>";
    }
    textBoxStr += "</p>";
    textBoxStr += "<p>Controls:</p>"
    textBoxStr += "<p><button type='button' form='ls-rule' name='ls-clear'>Clear Image</button>";
    textBoxStr += "<button type='button' form='ls-rule' name='ls-back'>Step Back</button>";
    textBoxStr += "<span id='ls-count'>0</span>";
    textBoxStr += "<button type='button' form='ls-rule' name='ls-forward'>Step Forward</button>";
    textBoxStr += "<button type='button' form='ls-rule' name='ls-play'>Play</button></p>";
    textBoxStr += "</form>"
    textBoxStr += "<p id='l-system'></p>";
	var textBox = document.getElementById("meta");
	textBox.innerHTML = textBoxStr; 
	tick();
}

if(document.getElementById('c')) init()
else document.addEventListener('DOMContentLoaded', init);

var lsSelect = document.getElementById('ls-select');
lsSelect.onchange = function(){
    ls.rules = systemRules[lsSelect.value].slice(1);
    ls.axiom = systemRules[lsSelect.value][0];
    ls.lsString = ls.axiom; // reset
    init();
};

var clear = document.getElementById('ls-clear');
console.log(clear);
// clear.onclick = function(ev){console.log(ev)};

