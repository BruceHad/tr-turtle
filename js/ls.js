// function expandLs(rules, count) {
//   // Lindermayer System
//   // Applies rules to string and returns results.
//   var str = rules.shift();
//   // Read rules
//   var ruleList = {};
//   for(var i = 0; i < rules.length; i++) {
//     var rule = rules[i].split('>');
//     ruleList[rule[0].trim()] = rule[1].trim();
//   }
//   console.log(ruleList);
//   // Repeatedly Apply rules to string
//   for(var i=0; i<count; i++){
//     var sStr = str.split('');
//     for(var j = 0; j < sStr.length; j++) {
//       if(sStr[j] in ruleList) {
//         sStr[j] = ruleList[sStr[j]];
//       }
//     }
//     str = sStr.join('');
//   }
//   return str;
// }

