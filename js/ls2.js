var funcInit = function() {
    var steps = 100;
    var axiom = 'FX';
    var rules = ['F > ', 'X > X+YF+', 'Y > -FX-Y'];
    var textBox = document.getElementById("image-desc");
    var lsStr = "<p>This is a dragon curve that's built up using the <a href='http://en.wikipedia.org/wiki/L-system'>lindenmayer system</a>, which give us flexibility to draw all sorts of things by adding new rules.</p>";
    lsStr += "<p>The l-system string:</p>";
    lsStr += "<form id='ls-rule'>"
    lsStr += "<input type='number' id='ls-steps' name='ls-steps' value="+steps+"><label for='ls-steps'>No. of Steps</label>";
    lsStr += "<input type='text' id='ls-axiom' name='ls-axion' value="+axiom+"><label for='ls-axion'>Axiom</label>";
    for(var i = 1; i <= rules.length; i++) {
        lsStr += "<input type='text' id='ls-rule-"+i+"' name='ls-rule-"+i+"' value='"+rules[i-1]+"'><label for='ls-rule-"+i+"'>Rule "+i+"</label>";
    }
    lsStr += "<button type='submit' form='ls-rule' name='ls-submit'>Update</button>";
    lsStr += "</form>"
    lsStr += "<p id='l-system'>"+dragonStr+"</p>";
    textBox.innerHTML = lsStr;
    var dragonStr = expandLs(axiom, rules);
    applyLs(dragonStr);

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
        return "Complete";
    }
}
if(document.getElementById('c')) funcInit()
else document.addEventListener('DOMContentLoaded', funcInit);