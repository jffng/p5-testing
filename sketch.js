var canvas,ctx,frame,img;

var width = window.innerWidth;
var height = window.innerHeight;

var worldRecordR, worldRecordG, worldRecordB;

var aR, aG, aB;

var particlesR = [];
var particlesB = [];
var particlesG = [];

function setup () {
	canvas = createCanvas(width,height);
	canvas.position(0,0);
	ctx = canvas.context;
	worldRecordB = 500;
	worldRecordG = 500;
	worldRecordR = 500;
	aR = new Attractor(width/2, height/2);
	aG = new Attractor(width/2, height/2);
	aB = new Attractor(width/2, height/2);
	for (var i = 0; i < 100; i++) {
		particlesR.push(new Particle(Math.random(0, width), Math.random(0, height), color(200, 40, 30)));
		particlesG.push(new Particle(Math.random(0, width), Math.random(0, height), color(40, 180, 40)));
		particlesB.push(new Particle(Math.random(0, width), Math.random(0, height), color(60, 60, 200)));
	}	
}

function snapshot() {
	if( video.readyState === video.HAVE_ENOUGH_DATA ){
		ctx.drawImage(video, 0, 0);
		frame = ctx.canvas.toDataURL('image/webp',0.1);
		img = loadImage(frame, function(){
			img.loadPixels();
			for(var x = 0; x < videoWidth; x++){
				for(var y = 0; y < videoHeight; y++){
					var location = x + y*videoWidth;
					var currentColor = img.pixels[location];
					var r1 = currentColor[0];
					var g1 = currentColor[1];
					var b1 = currentColor[2];
					var dR = dist(r1, g1, b1, 255, 0, 0);
					var dG = dist(r1, g1, b1, 0, 255, 0);
					var dB = dist(r1, g1, b1, 0, 0, 255);

					if (dR < worldRecordR) {
						worldRecordR = dR;
						aR = new Attractor(x, y);
					}

					if (dG < worldRecordG) {
						worldRecordG = dG;
						aG = new Attractor(x, y);
					}

					if (dB < worldRecordB) {
						worldRecordB = dB;
						aB = new Attractor(x, y);
					}
				}
			}
		});
	}
}

function draw (){
	// setInterval(snapshot(), 10000);

	background(0);
	aR.update(mouseX, mouseY);
	aG.update(mouseX, mouseY);
	aB.update(mouseX, mouseY);

	for (var i = particlesR.length-1; i >= 0; i--) {
	var force = aR.attract(particlesR[i]);

	particlesR[i].applyForce(force);
	particlesR[i].update();
	particlesR[i].display(5);
}

for (i = particlesG.length-1; i >= 0; i--) {
	var force = aG.attract(particlesG[i]);

	particlesG[i].applyForce(force);
	particlesG[i].update();
	particlesG[i].display(5);
}

for (i = particlesB.length-1; i >= 0; i--) {
	var force = aB.attract(particlesB[i]);

	particlesB[i].applyForce(force);
	particlesB[i].update();
	particlesB[i].display(5);
}
}