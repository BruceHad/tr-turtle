var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 1;

function dc(angle, colour, length) {
    var md = new Dot(angle, colour);
    for(var n = 1; n <= 10000; n++) {
        md.forward(length);
        // https://en.wikipedia.org/wiki/Dragon_curve
        // See also bitwise operators
        if((((n & -n) << 1) & n) != 0) {
            md.rotate(0.25);
        } else {
            md.rotate(-0.25);
        }
    }
}

dc(1/8, '#f00', 3);
dc(5/8, '#0f0', 3);

