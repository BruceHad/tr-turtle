var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 1;

var md = new Dot(1/8, '#000');
var count = 0;
var length = 10;
var segLength = 0;
var n = 1;
var step = 2;

function anim() {
    count++;
    if(count > 1000) {
        clearInterval(intId);
    } else {
        md.forward(step);
        segLength+=step;
        if(segLength == length) {
            if((((n & -n) << 1) & n) != 0) {
                md.rotate(0.25);
            } else {
                md.rotate(-0.25);
            }
            segLength = 0;
			n++;
        }
    }
}
var intId = setInterval(anim, 40);