var canvas,ctx,frame,img;

function setup () {
	var width = 320;
	var height = 240;
	canvas = createCanvas(width,height);
	canvas.position(0,0);
	ctx = canvas.context;

}

function snapshot() {
	if( video.readyState === video.HAVE_ENOUGH_DATA ){
		ctx.drawImage(video, 0, 0);
		frame = ctx.canvas.toDataURL('image/webp',0.1);

		img = loadImage(frame, function(){
			img.loadPixels();	
		});
		// background(0,120,255);
	}
}

function draw (){	
	snapshot();
}