## 3. L-Systems

One interesting possibility -- now that we can program the turtle with a string of commands -- is that we can generate that command string using an [L-system](http://en.wikipedia.org/wiki/L-system).

An L-System consists of an alphabet of commands (like 'F' is the command for forward()), and axiom or starting point, and a set of rules. These rules are repeatedly applied to the string to generate more and more complicated set of commands.

We seen the results of one of these L-Systems already. The long string above is the start of a [Dragon Curve](http://en.wikipedia.org/wiki/Dragon_curve). In the standard definition a dragon curve starts with the axiom FX then applies the following rules to that string:

* Replace F with null
* Replace X with X+YF+
* Replace Y with −FX−Y

So the first few iterations look something like this:

0: FX
1: X+YF+
2: X+YF++−FX−Y+
3: X+YF++−FX−Y++−X+YF+−−FX−Y+

Where F stands for forward(), + stands for 'turn right' and - 'turn left'. (X and Y are used in the L-system but don't equate to any commands).

