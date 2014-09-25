var funcInit = function() {
    var rules = ['F>', 'X > X+YF+', 'Y > -FX-Y'];
    var dragonStr = expandLs('FX', rules, 10);
    applyLs(dragonStr);
    var textBox = document.getElementById("meta");
    var lsStr = "<p>This is a dragon curve that's built up using the <a href='http://en.wikipedia.org/wiki/L-system'>lindenmayer system</a>, which give us flexibility to draw all sorts of things by adding new rules.</p>";
    lsStr += "<p>The l-system string:</p>";
    lsStr += "<p id='l-system'>"+dragonStr+"</p>";
    textBox.innerHTML = lsStr;

    function expandLs(axiom, rules, steps) {
        // Lindermayer system - expand from the initial
        // axiom for given number of steps and return
        // intruction set.
        // 1. Extract rules
        var ruleList = {};
        for(var i = 0; i < rules.length; i++) {
            var rule = rules[i].split('>');
            ruleList[rule[0].trim()] = rule[1].trim();
        }
        // 2. Repeatedly apply rules
        var str = axiom;
        for(var i = 0; i < steps; i++) {
            var sStr = str.split('');
            for(var j = 0; j < sStr.length; j++) {
                if(sStr[j] in ruleList) {
                    sStr[j] = ruleList[sStr[j]];
                }
            }
            str = sStr.join('');
        }
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