function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function Dot(angle, colour) {
	// For angle 0 = 3 o'clock. 0.25 = 6 o'clock etc.
	var canvas = document.getElementById('c');
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.strokeStyle = colour;
	this.angle = angle * Math.PI * 2; // starting angle converted to rads.
	this.turn = 1/4; //default to 90 degrees
    this.position = [canvas.width / 2, canvas.height / 2]; // starting position in middle of canvas
	this.pen = true; // pen is on
    this.forward = function(dist) {
		// move turtle forward by dist
		ctx.beginPath();
        ctx.moveTo(this.position[0], this.position[1]);
		this.position[0]+= Math.cos(this.angle) * dist;
		this.position[1]+= Math.sin(this.angle) * dist;
        ctx.lineTo(this.position[0], this.position[1]);
        if(this.pen) ctx.stroke();
    };
    this.rotate = function(angle) {
		// rotate turtle 0.25 = rotate by 90 degrees.
        this.angle += angle * Math.PI *2;
    };
	this.right = function(){
		this.rotate(this.turn);
	};
	this.left = function(){
		this.rotate(this.turn*-1);
	}
	this.setPen = function(){
		// switch pen on/off
		this.pen = !this.pen;
	};
	this.setPosition = function(x, y){
		// manually set position of turtle.
		this.position = [x, y];
	};
}





