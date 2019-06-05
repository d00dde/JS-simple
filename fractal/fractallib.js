var canvas;
var context;

var i_min = -1.5;
var i_max = 1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = max_iter + 1;
var palette = [];

function createTask (row) {
	var task = {
		row: row,
		width: rowData.width,
		generation: generation,
		r_min: r_min,
		r_max: r_max,
		i: i_max + (i_min - i_max)*row/canvas.height,
		max_iter: max_iter,
		escape: escape
	};

	return task;
}

function makePalette () {

	function wrap (x) {
		x = ((x + 256) & 0x1ff) - 256;
		if (x < 0) x = -x;
		return x;
	}

	for (var i = 0; i < this.max_iter; i++) {
		palette.push ([wrap(7*i), wrap(5*i), wrap(11*i)]);

	}
}

function drawRow (workerResults) {

	var values = workerResults.values;
	var pixelData = rowData.data;

	for (var i = 0; i < rowData.width; i++){
		var red = i*4;
		var green = i*4 + 1;
		var blue = i*4 + 2;
		var alpha = i*4 + 3;

		pixelData[alpha] = 255;

		if (values[i] < 0) {
			pixelData[red] = pixelData[green] = pixelData[blue] = 0;
		} else {
			var color = this.palette[values[i]];
			pixelData[red] = color[0];
			pixelData[green] = color[1];
			pixelData[blue] = color[2];
		}
	}
	context.putImageData (this.rowData, 0, workerResults.row);
}

function setupGraphics () {

	canvas = document.getElementById ("fractal");
	context = canvas.getContext ("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var width = ((i_min - i_max)*canvas.width/canvas.height);
	var r_mid = (r_max + r_min)/2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;

	rowData = context.createImageData (canvas.width, 1);
	makePalette ();
}

