var init = function() {
	
	var textBox = document.getElementById("meta");
	textBox.innerHTML = "<h3>Spiral</h3>";
	
    var md = new Dot(0, '#000');
	var dist = 5, angle = 89.5/360, inc=1.75;
    for(var n = 1; n <= 250; n++) {
        md.forward(dist);
        md.rotate(angle);
		dist += inc;
    }
}
if(document.getElementById('c')) init()
else document.addEventListener('DOMContentLoaded', init);