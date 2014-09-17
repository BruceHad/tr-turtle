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
	var md = new Dot(1 / 8, '#000', 3);
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

var ls = {
	steps: 10,
	axiom: 'FX',
	rules: ['F > ', 'X > X+YF+', 'Y > -FX-Y'],
	lsString: 'FX',
	count: 0
}

function init() {
    var textBoxStr = "<p>This is a dragon curve that's built up using the <a href='http://en.wikipedia.org/wiki/L-system'>lindenmayer system</a>, which give us flexibility to draw all sorts of things by adding new rules.</p>";
    textBoxStr += "<p>The l-system string:</p>";
    textBoxStr += "<form id='ls-rule'>"
    textBoxStr += "<input type='number' id='ls-steps' name='ls-steps' value="+ls.steps+"><label for='ls-steps'>No. of Steps</label><br>";
    textBoxStr += "<input type='text' id='ls-axiom' name='ls-axion' value="+ls.axiom+"><label for='ls-axion'>Axiom</label><br>";
    for(var i = 1; i <= ls.rules.length; i++) {
        textBoxStr += "<input type='text' id='ls-rule-"+i+"' name='ls-rule-"+i+"' value='"+ls.rules[i-1]+"'><label for='ls-rule-"+i+"'>Rule "+i+"</label><br>";
    }
    textBoxStr += "<button type='submit' form='ls-rule' name='ls-submit'>Update</button>";
    textBoxStr += "</form>"
    textBoxStr += "<p id='l-system'></p>";
	var textBox = document.getElementById("image-desc");
	textBox.innerHTML = textBoxStr; 
	anim();
}

if(document.getElementById('c')) init()
else document.addEventListener('DOMContentLoaded', funcInit);