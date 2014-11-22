function expandLs(rules, count) {
  // Lindermayer System
  // Applies rules to string and returns results.
  var stack = [];
  var str = rules.shift();
  stack.push(str);
  // Read rules
  var ruleList = {};
  for(var i = 0; i < rules.length; i++) {
    var rule = rules[i].split('>');
    ruleList[rule[0].trim()] = rule[1].trim();
  }
  // Repeatedly Apply rules to string
  for(var i=0; i<count; i++){
    var sStr = str.split('');
    for(var j = 0; j < sStr.length; j++) {
      if(sStr[j] in ruleList) {
        sStr[j] = ruleList[sStr[j]];
      }
    }
    str = sStr.join('');
    stack.push(str);
  }
  return stack;
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
