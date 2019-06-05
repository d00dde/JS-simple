var mouseTarget = "";

window.onload = function () {

	var colorFrame = document.getElementById ("colorFrame");
	var choosenColors = document.getElementById ("choosenColors");
	choosenColors.value = "";
	
		window.onkeydown = function (e) {
					if (e.keyCode === 13) {
					choosenColors.value += ","+  "\"" +  mouseTarget + "\""; 
				}
			}

			

	var symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d","e", "f"];
	var box = document.getElementById ("box");
	for (var i = 0; i < symbols.length; i++) {
		for (var j = 0; j < symbols.length; j++) {
			for (var k = 0; k < symbols.length; k++) {
				var text = "#" + symbols[i] + symbols[j] + symbols[k];
				var tile = document.createElement ("div");
				tile.innerText = text;
				tile.setAttribute ("class", "tile");
				tile.setAttribute ("id", text);
				tile.style.backgroundColor = text;
				tile.addEventListener("click", toFrame, false);
				tile.addEventListener("mouseover", function (e) {
						mouseTarget = e.target.id;
					}, false);
				box.appendChild(tile);
			}
		}
	}
	

function toFrame (e) {
	colorFrame.style.backgroundColor = e.target.innerText;
}


}

function printObject (object/*, withProto*/) {
	
	var body = document.getElementsByTagName("body")[0];
	var box = document.createElement ("div");
	box.setAttribute ("id", "box");
	if (document.getElementById("box")){
		body.replaceChild(box, document.getElementById ("box"));
	} else {
		body.appendChild (box);
	}
	var text = "";
	for (var key in object) {
		//if(object.hasOwnProperty(key) || withProto) {
			text = text + key + " : " + object[key] + "<br\/>";
		//}
	}
	box.innerHTML = text;
}

