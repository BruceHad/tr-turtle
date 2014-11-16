## Turtles

Like a lot of 80s kids, my first introduction to programming was a toy called [Big Trak](https://en.wikipedia.org/wiki/Big_Trak). It was a truck with a keypad on it's back, and it could be programmed to follow a route...3 forward, turn right, reverse 5 and so on. I didn't know at the time, but this was similar to a [Turtle](https://en.wikipedia.org/wiki/Turtle_graphics), a programming method whereby a 'pen' is programmed to draw lines on a cartesian plane. Programming a truck is cool an' all, but turtles can draw pictures, which is better.

To work, a turtle needs three attributes: a location (generally x,y co-ordinates on a plane), an orientation (angle) and a pen.

Turtle also needs a couple of actions: to move the turtle and rotate the orientation:

* forward(distance) - moves turtle forward by a distance
* rotate(angle) - rotates orientation by set angle.

These two actions should be enough to do just about anything, but I could add more to make controls simpler.

	function Turtle(){
	  var location = [0.5,0.5]; // Half pixel offset
	  var angle = 0; // Radians
	  var pen = new Pen();
	  var canvas = new Canvas();
	  this.rotate = function(anglePercent) {
	    // to simplify the maths anglePercent is a percentage of
	    // a full circle. e.g to rotate turtle by 90 degrees == rotate(0.25).
	    angle += anglePercent * Math.PI *2;
	  };
	  this.forward = function(dist) {
	    pos2 = [location[0]+ Math.cos(angle) * dist, location[1]+ Math.sin(angle) * dist];
	    if(pen.draw) canvas.draw(location, pos2, pen);
	    location = [pos2[0], pos2[1]];
	  };
	}

The pen also has a number of attributes such as colour, width, pen up or down (i.e. draw or don't draw).

	function Pen(){
	  var colour = '#000000';
	  var width = 1;
	  this.draw = true;
	  this.pop = function(){
	    draw = !draw
	  };
	};

And that's basically it for the turtle.

Though to implement this we need to do a bit more work.

We need a [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) with some line drawing type functions.

	function Canvas(){
	  var canvas = document.getElementById('c');
	  var ctx = canvas.getContext('2d');
	  this.draw = function(start, end, pen){
	    ctx.strokeStyle = pen.colour;
	    ctx.lineWidth = pen.width;
	    ctx.beginPath();
	    ctx.moveTo(start[0], start[1]);
	    ctx.lineTo(end[0], end[1]);
	    ctx.stroke();
	  };
	}

And it would be good to add a few controls for the turtle.

