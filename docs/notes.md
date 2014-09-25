# The Page

## Lindermeyer System

The L-System is made up of an Axiom, a set of rules and the number of times to apply those rules.

Users should be able to edit the rules, or select from some preset values. 

They should also be able to step through each step of the transform, or play and animation.


# Dragon Curves

https://en.wikipedia.org/wiki/Dragon_curve
https://en.wikipedia.org/wiki/L-system

Dragon Curve is a name for self-similar fractal curves which can be approximated by recursive methods like Lindenmayer systems.

L-system is a type of symbolic grammar. It consists of:

* Alphabet of symbols that can be used to make strings.
* A collection of production rules that expand each symbol into some larger string of symbols.
* Initial 'axiom' string from which contruction begins.
* A mechanism for translating string into geometric structure.

The Jurassic Park dragon can be written in L-system as:


* Initial string FX
* Variables X Y
* Constants F + -
* Start FX
* Rules
  * X → X+YF+
  * Y → -FX-Y
  * F → ε (empty string/remove F)
* Angle 90 degrees.

Where F means draw forward, - means turn left, + means turn right. 

Starting from a base segment (two perpendicular line like a V) replace each segment by 2 segments with a right angle and with a rotation of 45 degrees, alternating to the left and the right.

The string replacement looks something like this.

0: FX
1: X+YF+
2: X+YF++-FX-Y+
3: X+YF++-FX-Y++-X+YF+--FX-Y+
4: X+YF++-FX-Y++-X+YF+--FX-Y++-X+YF++-FX-Y+--X+YF+--FX-Y+
5: X+YF++-FX-Y++-X+YF+--FX-Y++-X+YF++-FX-Y+--X+YF+--FX-Y++-X+YF++-F
X-Y++-X+YF+--FX-Y+--X+YF++-FX-Y+--X+YF+--FX-Y+

# L System



# Bitwise Operations

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

# Canvas

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
