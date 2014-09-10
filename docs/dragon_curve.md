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

* Angle 90 degrees.
* Initial string FX
* Rules
  * X -> X+FX+
  * Y -> -FX-Y

Starting from a base segment (two perpendicular line like a V) replace each segment by 2 segments with a right angle and with a rotation of 45 degrees, alternating to the left and the right.

