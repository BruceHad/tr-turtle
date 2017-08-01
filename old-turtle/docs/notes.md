## Turtles, Systems and Patterns



To do:

* Convert CSS to SASS
* ---Show 'info' on ls system----
* --- Get a 'reset' that works---
* ---Simplify page style and colour canvas---
* ---Add in Starting position---
* ---Update Rules on radio changing---
* ---Add in support for angle.---
* Check performance of map()
* ---Switch Ls to array.map()---
* ---Check the tt-string updates---


## Colour Changes

Given a base colour, we can re-calculate the shade of the colour (brightness) with the following code.

	function changeBrightness(hex, percent) {
		// strip the leading # if it's there
		hex = hex.replace(/^\s*#|\s*$/g, '');
		var red = parseInt(hex.substr(0, 2), 16);
		var green = parseInt(hex.substr(2, 2), 16);
		var blue = parseInt(hex.substr(4, 2), 16);
		if(percent > 0){
			//lighten
		hex = 
				((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) 
			+ ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) 
			+ ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
		} else if(percent < 0) {
			//darken
			percent *= -1;
			hex = 
				((0 | (1 << 8) + r * (100 - percent) / 100).toString(16)).substr(1) 
			+ ((0 | (1 << 8) + g * (100 - percent) / 100).toString(16)).substr(1) 
			+ ((0 | (1 << 8) + b * (100 - percent) / 100).toString(16)).substr(1);
		}
		return '#' + newHex;
	}

Amended slightly from https://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour

But that doesn't give us exactly what we need. Basically want a range of similar shades and calculating those programmatically is difficult. Changing brightness up or down will eventually lead to black or white, losing any colour information it had (e.g. how do you move from black back to green by simply changing brightness).



## Dragon Curves

A [Dragon Curve](https://en.wikipedia.org/wiki/Dragon_curve) is a self-similar fractal curve. There are a couple of methods for drawing or approximating them.

My first attempt used a formula found on the wikipedia page and a little investigation into [bitwise operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators).

	for(var n = 1; n <= 1000; n++) {
		turtle.forward(length);
		if((((n & -n) << 1) & n) != 0) {
			turtle.rotate(0.25);
		} else {
			turtle.rotate(-0.25);
		}
	}

View Dragon Curve or view the Animated Version.

## Spirals

With a turtles we can easily generate pretty spirals. e.g. with the following couple of lines of code.

	for(var n = 1; n <= 250; n++) {
        turtle.forward(dist);
        turtle.rotate(89.5);
		dist += 1.75;
    }

## L-systems

[Lindenmayer Systems](https://en.wikipedia.org/wiki/L-system) are an interesting method of defining patterns, that can be combined with a Turtle to generate and draw complex models. The L-system is a type of 'symbolic grammar', generally taking the form of a sequence of characters that represent actions. It consists of:

* An alphabet of symbols that can be used to make strings.
* An initial 'axiom' string from which contruction begins.
* A collection of rules that are repeatedly applied to the string, expanding it into some larger string of symbols.
* A mechanism for translating string into geometric structure.

For example a dragon curve could be written in L-system as:

* Axiom FX
* Variables [X, Y]
* Constants [F, +, -]
* Rules:
  * X → X+YF+
  * Y → -FX-Y
  * F → ε (empty string/remove F)

Applying these rules would result in:

0: FX
1: X+YF+
2: X+YF++-FX-Y+
3: X+YF++-FX-Y++-X+YF+--FX-Y+
4: X+YF++-FX-Y++-X+YF+--FX-Y++-X+YF++-FX-Y+--X+YF+--FX-Y+
5: X+YF++-FX-Y++-X+YF+--FX-Y++-X+YF++-FX-Y+--X+YF+--FX-Y++-X+YF++-F
X-Y++-X+YF+--FX-Y+--X+YF++-FX-Y+--X+YF+--FX-Y+

This can be translated into a curve by applying the following:

* F means draw forward
* - means turn left (90 degrees)
* + means turn right (90 degrees)

(X and Y are ignored in the drawing)

f(.01, 89.5, .01, 184) f(dist, angle, incr, segs /*(number of segments)*/) {
	start in the center of a square view-space,
	facing east repeat segs times:
		go dist * (60% the view-space width) in the current direction turn angle degrees clockwise (to your right)
		increment dist by incr }

## Fractal Plant
Example 7: Fractal plant

    variables : X F
    constants : + − [ ]
    start  : X
    rules  : (X → F-[[X]+X]+F[+FX]-X), (F → FF)
    angle  : 25°

Here, F means "draw forward", - means "turn left 25°", and + means "turn right 25°". X does not correspond to any drawing action and is used to control the evolution of the curve. [ corresponds to saving the current values for position and angle, which are restored when the corresponding ] is executed.

## Bitwise Operations

Bitwise operations directly manipulate bits.

Left shift << and right shift >> operators shit the bits of a number over by a given number of slots.

	0b000001 << 2 == 0b000100 (1 << 2 = 4)

The bitwise and & operator compares two numbers and returns a number where the bit is turned on (1) if the bits are turned on in both numbers.

	a:     00101010   42
	b:     00001111   15
	====================
	a & b: 00001010   10

Similarly the OR I operator compares the numbers and returns a 1 if either of the bits are turned on. XOR ^ works similarly.

The bitwise NOT ~ operator flips the bits. (Seems a bit more complicated than that as ~0b1 = -0b10 not 0) This is mathematically equivalent to adding 1 to the number and making it negative. e.g. ~3 (0b011) = -4 (-0b100)

You can combine these with masks to manipulate binary numbers.

## HTML Canvas

Grab the element and create the context object for drawing on the canvas.

	var canvas = document.getElementById('tutorial');
	var ctx = canvas.getContext('2d');

Once you have a context (2d) you can draw on it. Useful methods:

* beginPath() creates a new path by resetting the list of subpaths.
* closePath() tries to draw a line from the current position to the starting point.
* lineTo() connects the last point in the subpath to the x, y coords provided. Straight line.
* clearRect(x, y, width, height) sets all pixel in the defined rectange to a transparent black.
* fillRect(x, y, width, height)
* fillText(text, x, y, [maxwidth])
* save() saves the current state of the canvas and adds to stack.
* restore() restores the most recent saved state from stack.
