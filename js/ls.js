var funcInit = function() {
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
            console.log(i + ": " + str);
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
    }
    var rules = ['F>', 'X > X+YF+', 'Y > -FX-Y'];
    var dragonStr = expandLs('FX', rules, 10);
    applyLs(dragonStr);
}
if(document.getElementById('c')) funcInit()
else document.addEventListener('DOMContentLoaded', funcInit);