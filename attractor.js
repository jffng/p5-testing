var Attractor = function(xPosition, yPosition) {
	this.location = new PVector(xPosition, yPosition);
	this.mass = 80;
	this.gravity = 1;
};

Attractor.prototype.attract = function(particle){
	var force = PVector.sub(this.location, particle.location);
	var d = force.mag();
	d = constrain(d, 5.0, 20.0);
	force.normalize();
	var strength = (this.gravity * this.mass * particle.mass) / (d * d);
	force.mult(strength);
	return force;
};

Attractor.prototype.update = function(x, y){
	this.location = new PVector(x, y);
}