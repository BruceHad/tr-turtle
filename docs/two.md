## TurtleTrack

It's not really very like the old big trak though. Think we need two things. 

* Animate it
* Pre-program it.

Animation in canvas is quite easy. The [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers.setInterval) function repeatedly calls a chunk of code until it is told to stop (by clearInterval()). And it lets you set a (rough) delay between running the code e.g. 40 millisecond delay is around 25 frames/calls per second.

So instead of calculating the whole distance and drawing it at once, we can chunk it up into intermediate steps and animate the drawing of the line. Something like this:

	...
	var maxSteps = 10; 
	var count = 0;
	var intId = setInterval(function(){
		if(count > maxSteps) {
			count = 0;
			clearInterval(intId)
		} else{
			var step = dist / maxSteps;
			pos2 = [location[0] + Math.cos(angle) * step, location[1] + Math.sin(angle) * step];
			if(pen.draw) canvas.draw(location, pos2, pen);
			location = [pos2[0], pos2[1]];
			console.log(count);
			count++;
		}				
	}, 40);
	...
	
Pre-programming should also be quite simple. What I really want to do is allow someone to enter a series of commands, then hit Go. The commands could be stored e.g. in a string, which is then interpretted by the turtle and turned into actions. But before we can do that we need to solve a problem. The animation method with setInterval is asynchronous, meaning the animation function is carried out in parallel with other processing. But the series of actions (Forward, Left, Forward, Forward) have to be carried out sequentially. So I need a way of ensuring the next action isn't carried out until the current action has completed.

### Promises
