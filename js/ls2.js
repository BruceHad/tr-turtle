var systemRules = {
    'dragon': ['FX', 'F > ', 'X > X+YF+', 'Y > -FX-Y'],
    'null': ['FX', 'F > ', 'X > X+YF+', 'Y > -FX-YF']
};

function expandLs(str, rules) {
	// Lindermayer System
	// Applies rules to string and returns results.
	
	// Read rules
	var ruleList = {};
	for(var i = 0; i < rules.length; i++) {
		var rule = rules[i].split('>');
		ruleList[rule[0].trim()] = rule[1].trim();
	}
	// Apply rules to string
	var sStr = str.split('');
	for(var j = 0; j < sStr.length; j++) {
		if(sStr[j] in ruleList) {
			sStr[j] = ruleList[sStr[j]];
		}
	}
	str = sStr.join('');
	return str;
}

function applyLs(str) {
	// Lindermayer System
	// Convert string into geometric structure,
	// using turtle.
	var angle = 1/8;
	var colour = '#000';
	var length = 4;
	if(typeof md == 'undefined') md = new Dot(angle, colour);
	md.clear();
	var sStr = str.split('');
	forEach(sStr, function(ch) {
		if(ch === 'F') md.forward(length);
		else if(ch === '+') md.left();
		else if(ch === '-') md.right();
	});
}

function tick(ls, dir){
	// Updates the LS String stack
	if(dir=='forward') {
		ls.lsString
			.push(expandLs(ls.lsString[ls.lsString.length-1], ls.rules));
	} 
	else {
		ls.lsString.pop();
	}
	return ls;
}

function updateMeta(ls, rule){
	// Displays/Updates form and text on page.
	var textBoxStr = "<h3>The L-System</h3>";
    textBoxStr += "<p>A <a href='http://en.wikipedia.org/wiki/L-system'>lindenmayer system</a> is made up of a starting point (axiom) and a set of rules used to repeatedly transform the string from the starting point.</p>";
    textBoxStr += "<p>The resulting string can then be used to control our Turtle.</p>";
    textBoxStr += "<form id='ls-rule' class='ls2-form'>";
    textBoxStr += "<p>Select a set of rules: <select id='ls-select'>"
    for (var prop in systemRules){
		var selected = rule==prop? "selected": "";
		textBoxStr += "<option value='"+prop+"' "+selected+">"+prop+"</option>";
    }
    textBoxStr += "</select></p>"
//     textBoxStr += "<p>Or enter your own rules:</p>";
//     textBoxStr += "<p><input disabled type='number' id='ls-steps' name='ls-steps' value="+ls.steps+"><label for='ls-steps'>No. of Steps</label><br>";
    textBoxStr += "<input disabled type='text' id='ls-axiom' name='ls-axion' value="+ls.axiom+"><label for='ls-axion'>Axiom</label><br>";
    for(var i = 1; i <= ls.rules.length; i++) {
        textBoxStr += "<input disabled type='text' id='ls-rule-"+i+"' name='ls-rule-"+i+"' value='"+ls.rules[i-1]+"'>";
		textBoxStr += "<label for='ls-rule-"+i+"'>Rule "+i+"</label><br>";
    }
    textBoxStr += "</p>";
    textBoxStr += "<p>Controls:</p>"
    textBoxStr += "<p><button type='button' form='ls-rule' name='ls-clear' id='ls-clear'>Clear Image</button></p>";
    textBoxStr += "<p><button type='button' form='ls-rule' name='ls-back' id='ls-back' disabled='true'>Step Back</button>";
    textBoxStr += "<span id='ls-count'>"+ls.lsString.length+"</span>";
    textBoxStr += "<button type='button' form='ls-rule' name='ls-forward' id='ls-forward'>Step Forward</button></p>";
    textBoxStr += "</form>"
	textBoxStr += "<p>The Lindenmayer string for this image looks like:</p>";
    textBoxStr += "<p id='ls-string'>"+ls.lsString[ls.lsString.length-1]+"</p>";
	var textBox = document.getElementById("meta");
	textBox.innerHTML = textBoxStr;
}

function update(ls){
	// Updates the page.
	document.getElementById('ls-string').innerHTML = ls.lsString[ls.lsString.length-1];
	document.getElementById('ls-count').innerHTML = ls.lsString.length;
	applyLs(ls.lsString[ls.lsString.length-1]);
}



function init() {
	// Initial setting on page
	// and set up event watchers.
	if(document.getElementById('ls-select')) {
		var selectedRule = document.getElementById('ls-select').value;
	}
	else{
		var selectedRule = 'dragon';
	}
	
	var ls = {
		axiom: systemRules[selectedRule][0],
		rules: systemRules[selectedRule].slice(1),
		lsString: [systemRules[selectedRule][0]], // stack of ls strings, initial set to axiom
		max: 15
	};
	updateMeta(ls, selectedRule);
	ls = tick(ls, 'forward'); // First tick
	update(ls);
	
	// Events
	document.getElementById('ls-select').onchange = function(){
		init();
	};
	document.getElementById('ls-clear').onclick = function(){
		init();
	};
	document.getElementById('ls-back').onclick = function(){
		ls = tick(ls, 'back');
		if(ls.lsString.length == 2) this.setAttribute("disabled", true);
		if(ls.lsString.length < ls.max) document.getElementById('ls-forward').removeAttribute("disabled");
		update(ls);
	};
	document.getElementById('ls-forward').onclick = function(){
		ls = tick(ls, 'forward');
		if(ls.lsString.length == ls.max) this.setAttribute("disabled", true);
		if(ls.lsString.length == 3) document.getElementById('ls-back').removeAttribute("disabled");
		update(ls);
	};
}

if(document.getElementById('c')) init()
else document.addEventListener('DOMContentLoaded', init);






