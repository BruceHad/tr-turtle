/* global Turtle Controller */

/** Collatz
 * Calculate the collatz sequences */
 
function reverse_string(s){
    return s.split("").reverse().join("");
}

function collatz_l(n, sequence = '', count = 0) {
    sequence += 'F'; // move forward on each turn
    count++;
    if(n == 1){
        return [sequence, count];
    }
    else if (n % 2 == 0) {
        sequence += 'L'; // Turn right if even
        return(collatz_l(n/2, sequence, count));
    }
    else {
        sequence += 'R'; // turn left if odd
        return(collatz_l(n * 3 + 1, sequence, count));
    }
}

let sequences = [], counts = [];
for (var i = 1; i <= 1000; i++){
    let sequence = collatz_l(i);
    sequences[i] = reverse_string(sequence[0]);
    counts[i] = sequence[1];
}

/** Turtle
 * Build the turtle */
const myTurtle = new Turtle('canvas');
const myCont = new Controller(myTurtle);

function go(seq, controller){
    controller.restart(350, 840, 270);
    controller.setCommandString(seq);
    controller.go(5, [12, 6], false);
}

for (var i in sequences){
    go(sequences[i], myCont);
    console.log(i, counts[i]);
}

