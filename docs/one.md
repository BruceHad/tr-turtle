## Turtles

Like a lot of 80s kids, my first introduction to programming was a toy called a [Big Trak](https://en.wikipedia.org/wiki/Big_Trak), which was a toy car that could be programmed with a route (3 forward, turn right, reverse 5 and so on) and would then follow that route (until it crashed into the skirting boards).

To program something similar (aka a [Turtle](https://en.wikipedia.org/wiki/Turtle_graphics)) you just needs to know a couple of actions: move and turn, while keeping track of current location and direction. With that you have a basic turtle.

	function Turtle(){
	  var location = [0,0]; // Set starting location 
	  var angle = 0; // Angle is in radians
	  var canvas = new Canvas(); // Need a canvas to draw on
	  this.rotate = function(anglePercent) {
	    angle += anglePercent * Math.PI *2;
	  };
	  this.forward = function(dist) {
	    newLocation = [location[0]+ Math.cos(angle) * dist, 
				location[1]+ Math.sin(angle) * dist];
	    canvas.draw(location, newLocation, pen);
	    location = [newLocation[0], newLocation[1]];
	  };
	}
	
In order to do this on a webpage we need something like the HTML [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element and some code to help with drawing lines. Something like this works for me.

	function Canvas(canvasId) {
		var canvas = document.getElementById(canvasId);
		var ctx = canvas.getContext('2d');
		var intId = null;
		var steps = 10;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var count = 0;
		this.draw = function(start, end, pen) {
			ctx.strokeStyle = pen.colour;
			ctx.lineWidth = pen.width;
			ctx.beginPath();
			ctx.moveTo(start[0], start[1]);
			ctx.lineTo(end[0], end[1]);
			ctx.stroke();
		};
	}

Add in a few basic controls and you've got the beginnings of a turtle to play with.