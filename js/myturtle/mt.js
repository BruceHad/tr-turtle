var canvas = document.getElementById('c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 1;
var tid;

function centre() {
    return [window.innerWidth / 2, window.innerHeight / 2];
}

function Dot() {
    this.angle = 0;
    this.position = centre();
    this.forward = function(dist) {
        ctx.beginPath();
        ctx.moveTo(this.position[0], this.position[1]);
		this.position[0]+= Math.cos(this.angle) * dist;
		this.position[1]+= Math.sin(this.angle) * dist;
        ctx.lineTo(this.position[0], this.position[1]);
        ctx.stroke();
    };
    this.rotate = function(angle) {
        this.angle += angle * Math.PI;
    }
}