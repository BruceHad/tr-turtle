var funcInit = function() {
	
	var textBox = document.getElementById("image-desc");
	textBox.innerHTML = "<p>This is a (double) dragon curve. It's drawn with a <a href='http://en.wikipedia.org/wiki/Logo_%28programming_language%29#Turtle_and_graphics'>turtle</a>, that rotates either left or right depending on formula as <a href='http://en.wikipedia.org/wiki/Dragon_curve#.5BUn.5DFolding_the_Dragon'>described here</a>.</p>";
	
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
}

if(document.getElementById('c')) funcInit()
else document.addEventListener('DOMContentLoaded', funcInit);