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
    }
    turtle = new Turtle("canvas"+section);
}
