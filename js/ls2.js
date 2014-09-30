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
	return str;
}

function applyLs(str) {
	// Lindermayer system - translate string
	// into geometric structure
	var angle = 1/8;
	var colour = '#000';
	var length = 4;
	if(typeof md != 'undefined') md.clear()
	else md = new Dot(angle, colour);
	var sStr = str.split('');
	forEach(sStr, function(ch) {
		if(ch === 'F') md.forward(length);
		else if(ch === '+') md.left();
		else if(ch === '-') md.right();
	});
}

function tick(ls, dir){
	// 	if(ls.count > ls.steps) console.log("You are breaking it");
	if(dir=='forward') {
		if(ls.count == 10) return ls;
		ls.lsString.push(
			expandLs(ls.lsString[ls.lsString.length-1], ls.rules));
		ls.count++;
	} 
	else {
		if(ls.count == 1) return ls;
		ls.lsString.pop();
		ls.count--;
	}
	update(ls)
	return ls;
}

function update(ls){
	document.getElementById('ls-string').innerHTML = ls.lsString[ls.lsString.length-1];
	document.getElementById('ls-count').innerHTML = ls.count;
	applyLs(ls.lsString[ls.lsString.length-1]);
}

// function anim(){
// 	intId = setInterval(tick, 1000);
// }

var systemRules = {
    'dragon': ['FX', 'F > ', 'X > X+YF+', 'Y > -FX-Y'],
    'null': ['FX', 'F > ', 'X > X+YF+', 'Y > -FX-YF']
};

function updateMeta(ls, rule){
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
    textBoxStr += "<span id='ls-count'>"+ls.count+"</span>";
    textBoxStr += "<button type='button' form='ls-rule' name='ls-forward' id='ls-forward'>Step Forward</button></p>";
//     textBoxStr += "<button type='button' form='ls-rule' name='ls-play' id='ls-play'>Play</button></p>";
    textBoxStr += "</form>"
	textBoxStr += "<p>The Lindenmayer string for this image looks like:</p>";
    textBoxStr += "<p id='ls-string'>"+ls.lsString[ls.lsString.length-1]+"</p>";
	var textBox = document.getElementById("meta");
	textBox.innerHTML = textBoxStr;
}

function init() {
	if(typeof md != 'undefined') md.clear();
	if(document.getElementById('ls-select')) var selectedRule = document.getElementById('ls-select').value;
	else var selectedRule = 'dragon';
	
	/* convert lsString to a stack so I can easily get back previous strings */
	var ls = {
		steps: 10,
		axiom: systemRules[selectedRule][0],
		rules: systemRules[selectedRule].slice(1),
		lsString: [systemRules[selectedRule][0]], // reset string to axiom
		count: 0
	};
	updateMeta(ls, selectedRule);
	ls = tick(ls, 'forward'); // First tick
	
	// Events
	document.getElementById('ls-select').onchange = function(){
		init();
	};
	document.getElementById('ls-clear').onclick = function(){
		init();
	};
	document.getElementById('ls-back').onclick = function(){
		ls = tick(ls, 'back');
		if(ls.count == 1) this.setAttribute("disabled", true);
// 		update(ls);
	};
	document.getElementById('ls-forward').onclick = function(){
		ls = tick(ls, 'forward');
		if(ls.count == 2) document.getElementById('ls-back').removeAttribute("disabled");
// 		update(ls);
	};
}

if(document.getElementById('c')) init()
else document.addEventListener('DOMContentLoaded', init);






