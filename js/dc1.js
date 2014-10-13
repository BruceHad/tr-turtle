var init = function() {
	
	var textBox = document.getElementById("meta");
	textBox.innerHTML = "<h3>Dragon Curves</h3>";
	
    function dc(angle, colour, length) {
        var md = new Dot(angle, colour);
        for(var n = 1; n <= 1000; n++) {
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
    dc(1 / 8, '#f00', 6);
    dc(5 / 8, '#0f0', 6);
	
	var md = new Dot(1 / 4, '#00f');
    var count = 0;
    var length = 6;
    var segLength = 0;
    var n = 1;
    var step = 2;

    function anim() {
        if(count > 1000) {
            clearInterval(intId);
        } else {
            md.forward(step);
            segLength += step;
            if(segLength == length) { // turn after full segment has been drawn
                if((((n & -n) << 1) & n) != 0) {
                    md.rotate(0.25);
                } else {
                    md.rotate(-0.25);
					
                }
				count++;
                segLength = 0;
                n++;
            }
        }
    }
    var intId = setInterval(anim, 40);
}

if(document.getElementById('c')) init()
else document.addEventListener('DOMContentLoaded', init);