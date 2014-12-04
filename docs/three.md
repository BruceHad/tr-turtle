The string of commands I generated was based on a pattern called a [Dragon Curve](http://en.wikipedia.org/wiki/Dragon_curve). It's one of many patterns that can be generated using Lindenmayer System or [L-system](http://en.wikipedia.org/wiki/L-system).

L-Systems consist of alphabets of commands (like 'F' is the command for forward()). It starts with a basic string (the axiom) and a set of rules. These rules are repeatedly applied to the string to generate more and more complicated set of commands.

For a dragon curve you start with the axiom 'FX' then apply the following rules:

* Replace F with null
* Replace X with X+YF+
* Replace Y with −FX−Y

So the first few iterations look something like this:

0: FX
1: X+YF+
2: X+YF++−FX−Y+
3: X+YF++−FX−Y++−X+YF+−−FX−Y+

Where F stands for forward(), + stands for 'turn right' and - 'turn left'. (X and Y are used in the L-system but don't equate to any commands).

