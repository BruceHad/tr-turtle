var lsRules = {
    dragon: [5, 'FX', 'F=', 'X=X+YF+', 'Y=−FX−Y'],
    blank: [0, '']
}
var articles = document.getElementById("content").getElementsByTagName("article"); //articles
var canvases = document.getElementById("canvas").getElementsByTagName("section");
var buffer = null;
var visible = null;
var show = "one";
updatePage(show);


window.onscroll = function(e){
    if(!buffer){
        buffer = setTimeout(function(){
            for(var i=0; i<articles.length; i++){
                var elem = articles[i];
                var position = elem.getBoundingClientRect().top;
                var name = elem.getAttribute("class");
                var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                // console.log(name+" position: "+ position+" viewHeight: "+viewHeight);
                if(viewHeight-position > viewHeight/1.5){
                    visible = name;
                }
            }
            if(visible != show){
                show = visible;
                updatePage(show);
            }
            buffer = null;
        }, 300);
    }
};

function updatePage(section){
    for (var i=0; i<canvases.length; i++){
        var id = canvases[i].getAttribute("id");
        // console.log(i+":"+id+" "+section);
        if(id === section){
            canvases[i].setAttribute("class", "show");
        } else {
            canvases[i].setAttribute("class", "hide");
        }
        if(i===2){
            setLs()
        }
    }
    turtle = new Turtle("canvas"+section);
}

function setLs(){
    var selectedRule = document.querySelector('input[name = "ls-system"]:checked').value;
    var rule = lsRules[selectedRule];
    document.getElementById('ls-iterations').value = rule[0] || "";
    document.getElementById('ls-axiom').value = rule[1] || "";
    document.getElementById('ls-rule1').value = rule[2] || "";
    document.getElementById('ls-rule2').value = rule[3] || "";
    document.getElementById('ls-rule3').value = rule[4] || "";
    document.getElementById('ls-rule4').value = rule[5] || "";
    document.getElementById('ls-rule5').value = rule[6] || "";
}




// var dragonString = expandLs(['FX', 'F=', 'X=X+YF+', 'Y=−FX−Y'],5);
// var dragonString = expandLs(['F=C0FF-[C1-F+F+F]+[C2+F-F-F]'],5);
// console.log(dragonString);
