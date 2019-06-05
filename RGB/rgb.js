window.onload = function () {
	var r_scrol = document.getElementById ("r_scrol");
	var g_scrol = document.getElementById ("g_scrol");
	var b_scrol = document.getElementById ("b_scrol");

	var r_field = document.getElementById ("r_field");
	var g_field = document.getElementById ("g_field");
	var b_field = document.getElementById ("b_field");

	r_field.disabled = true;
	g_field.disabled = true;
	b_field.disabled = true;

	var canvas = document.getElementById ("canvas");
	var cntx = canvas.getContext ("2d");

	//printObject (r_field);

	r_scrol.addEventListener ("input", setColor, false);
	g_scrol.addEventListener ("input", setColor, false);
	b_scrol.addEventListener ("input", setColor, false);

	function setColor () {
		r_field.value = r_scrol.value;
		g_field.value = g_scrol.value;
		b_field.value = b_scrol.value;

		cntx.fillStyle = "rgb(" + r_field.value + "," + g_field.value + "," + b_field.value + ")";
		cntx.fillRect (0,0,canvas.width, canvas.height);


	}
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
	box.innerHTML = text;
}