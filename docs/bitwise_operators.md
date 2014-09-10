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