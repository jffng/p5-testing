var vgaConstraints = {
	video: {
		mandatory: {
			maxWidth: 320,
			maxHeight: 240
		}
	}
};

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var video = document.createElement('video');
video.autoplay = true;

var errorCallback = function(e) {
	console.log('Reeeejected!', e);
};

if (navigator.getUserMedia) {
	navigator.getUserMedia(vgaConstraints, function(stream) {
	video.src = window.URL.createObjectURL(stream);
	}, errorCallback);
} else {
	console.log('bummer, no camera.');
	// video.src = 'somevideo.webm'; //fallback.
}