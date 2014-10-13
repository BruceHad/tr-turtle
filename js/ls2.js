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
	var textBox = document.getElementById("meta");
	textBox.innerHTML = textBoxStr;
	
	var formStr = "<form id='ls-rule' class='ls2-form'>";
	formStr += "<select id='ls-select' style='display:none'>"
    for (var prop in systemRules){
		var selected = rule==prop? "selected": "";
		formStr += "<option value='"+prop+"' "+selected+">"+prop+"</option>";
    }
    formStr += "</select></p>"
    formStr += "<input disabled type='text' id='ls-axiom' name='ls-axion' value="+ls.axiom+"><label for='ls-axion'>Axiom</label><br>";
    for(var i = 1; i <= ls.rules.length; i++) {
        formStr += "<input disabled type='text' id='ls-rule-"+i+"' name='ls-rule-"+i+"' value='"+ls.rules[i-1]+"'>";
		formStr += "<label for='ls-rule-"+i+"'>Rule "+i+"</label><br>";
    }
    formStr += "</p>";
    formStr += "<p>Controls:</p>"
    formStr += "<p><button type='button' form='ls-rule' name='ls-back' id='ls-back' disabled='true'>Step Back</button>";
    formStr += "<span id='ls-count'>"+ls.lsString.length+"</span>";
    formStr += "<button type='button' form='ls-rule' name='ls-forward' id='ls-forward'>Step Forward</button></p>";
	formStr += "<p><button type='button' form='ls-rule' name='ls-clear' id='ls-clear'>Clear Image</button></p>";
    formStr += "</form>"
	formStr += "<p>The Lindenmayer string for this image looks like:</p>";
    formStr += "<p id='ls-string'>"+ls.lsString[ls.lsString.length-1]+"</p>";
	
	var div = document.createElement('div');
	div.innerHTML = formStr;
	console.log(div.childNodes);
	document.getElementById("display").appendChild(div);
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






