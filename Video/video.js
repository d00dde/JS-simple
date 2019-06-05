window.onload = function () {

var video = document.getElementById ("video");
var buferCanvas = document.getElementById ("bufer");
var bufer = buferCanvas.getContext("2d");
var displayCanvas = document.getElementById ("display");
var display = displayCanvas.getContext("2d");
var fileName = document.getElementById ("fileName");
var userFilter = document.getElementById ("userFilter");

video.setAttribute ("src", fileName.value);

video.addEventListener ("play", processFrame, false);
var frame;


function processFrame () {
	if (video.paused || video.ended) {
		printFrame(frame);
		return;
	}

	if (video.videoWidth > 1000) {
			video.width = video.videoWidth/2;
			video.height = video.videoHeight/2;
		} else {
			video.width = video.videoWidth;
			video.height = video.videoHeight;
		}
		buferCanvas.setAttribute ("width", video.width);
		displayCanvas.setAttribute ("width", video.width);
		buferCanvas.setAttribute ("height", video.height);
		displayCanvas.setAttribute ("height", video.height);


	bufer.drawImage (video, 0, 0, buferCanvas.width, buferCanvas.height);
	frame = bufer.getImageData (0, 0, buferCanvas.width, buferCanvas.height);
	var length = frame.data.length/4;

	for (var i = 0; i < length; i++) {
		r = frame.data[i*4 + 0];
		g = frame.data[i*4 + 1];
		b = frame.data[i*4 + 2];
		userEffect(i, r, g, b, frame.data);
	}

	display.putImageData (frame, 0, 0);
 	setTimeout (processFrame, 0);

}


var userEffect = new Function ("pos, r, g, b, data", userFilter.value);


userFilter.addEventListener ("input", function () {
	userEffect = new Function ("pos, r, g, b, data", userFilter.value);
}, false);
	
	/*var brightness = ((3*r + 4*b + g) >>> 3) < 0 ? 0 : ((3*r + 4*b + g) >>> 3);
	data [pos*4 + 0] = brightness;
	data [pos*4 + 1] = b;
	data [pos*4 + 2] = g;

}*/


}



function printObject (object) {
	var head = document.getElementsByTagName ("body") [0];
	var div = document.createElement ("div");
	div.setAttribute ("id", "box");
	if (document.getElementById ("box")){
		head.replaceChild (div, document.getElementById ("box"));
	} else {	
		head.appendChild (div);
	}
	var text = "";
	for (var key in object) {
		text = text + key + " : " + object[key] + "<br\/>";
	}
	div.innerHTML = text;
}



