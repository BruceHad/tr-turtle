function Dot(angle, colour) {
    this.angle = angle * Math.PI * 2; //starting angle
    this.position = [canvas.width / 2, canvas.height / 2];
	ctx.strokeStyle = colour;
    this.forward = function(dist) {
        ctx.beginPath();
        ctx.moveTo(this.position[0], this.position[1]);
		this.position[0]+= Math.cos(this.angle) * dist;
		this.position[1]+= Math.sin(this.angle) * dist;
        ctx.lineTo(this.position[0], this.position[1]);
        ctx.stroke();
    };
    this.rotate = function(angle) {
        this.angle += angle * Math.PI *2;
    }
}
