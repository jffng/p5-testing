var videoWidth = 320;
var videoHeight = 240;

var vgaConstraints = {
	video: {
		mandatory: {
			maxWidth: videoWidth,
			maxHeight: videoHeight
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