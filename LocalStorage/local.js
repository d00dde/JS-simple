var delImg = "images\\delete.png";
window.onload = function () {

	var addButton = document.getElementById ("addButton");
	var clearButton = document.getElementById ("clearSticks");
	var textField = document.getElementById ("textField");
	
	var colors = ["#0dc","#2fa","#df7","#f8e","#f82","#f32"];
	drawColorMenu (colors);

	drawSticks ();

	addButton.onclick = function () {
		addStick ();
	}

	clearButton.onclick = function () {
		if(confirm ("Вы действительно хотите удалить ВСЕ заметки?")){
			if(getStickArray().length != 0){
				localStorage.clear();
				window.location.reload(true);
			} else {
				alert ("Ты что, дибил? Заметок же и так нет!");
			}
		}
	}
					
	textField.onkeyup = function (e) {
		if (e.keyCode === 13) {
			addStick ();
		}
	}
}

function addStick () {
	var textField = document.getElementById ("textField");
	if (!textField.value)
		return;

	var userColor = document.getElementById ("titleColor");
	var stick = writeStick (textField.value, userColor.style.backgroundColor);
	addStickToPage (stick);
	textField.value = "";
}

function Stick (stickId, text, color) {
	this.stickId = stickId;
	this.text = text;
	this.color = color;
	this.date = formatDate (stickId);
}

function drawSticks () {
	var stickies = getStickArray ();
	for (var i = 0; i < stickies.length; i++) {
		var currentStick = JSON.parse (localStorage.getItem (stickies[i]));
		addStickToPage (currentStick);
	}
}

function getStickArray () {
	var stickies = localStorage.getItem ("stickies");
	if(!stickies) {
		stickies = [];
		localStorage.setItem ("stickies", JSON.stringify(stickies));
	} else {
		stickies = JSON.parse (stickies);
	}
	return stickies;
}

function addStickToPage (stick) {

	var stickBox = document.getElementById ("stickBox");

	var viewStick = document.createElement ("div");
	viewStick.setAttribute ("class", "stick");
	viewStick.setAttribute ("id", stick.stickId);
	viewStick.style.backgroundColor = stick.color;

	var delStick = document.createElement ("img");
	delStick.setAttribute ("class", "delStick");
	delStick.setAttribute ("src", delImg);
	delStick.addEventListener ("click", deleteStick, false);

	var stickTextDiv =  document.createElement ("div");
	stickTextDiv.setAttribute ("class", "stickText");
	stickTextDiv.innerText = stick.text;

	var time = document.createElement ("div");
	time.setAttribute ("class", "time");
	time.innerText = stick.date;

	viewStick.appendChild (delStick);
	viewStick.appendChild (time);
	viewStick.appendChild (stickTextDiv);
	stickBox.appendChild (viewStick);
}

function writeStick (text, color) {
	var stickies = getStickArray ();
	var currentDate = new Date ();
	var stickId = currentDate.getTime();
	var stick = new Stick (stickId, text, color);
	var stickName = "stick_" + stickId;

	stickies.push (stickName);
	localStorage.setItem (stickName, JSON.stringify(stick))
	localStorage.setItem ("stickies", JSON.stringify(stickies));

	return stick;
}

function deleteStick () {
	
	var chosenStick = this.parentNode;
	
	var stickies = getStickArray ();
	var stickName = "stick_" + chosenStick.id;
	for (var i = 0; stickies.length; i++) {
		if(stickies[i] == stickName) {
			stickies.splice (i, 1);
			localStorage.removeItem (stickName);
			break;
		}
	}

	localStorage.setItem ("stickies", JSON.stringify(stickies));
	
	var stickBox = document.getElementById ("stickBox");
	stickBox.removeChild (chosenStick);
}

function drawColorMenu (colors) {

	var titleColor =  document.getElementById ("titleColor");
	titleColor.style.backgroundColor = "#ffffa6";
	var colorMenu = document.getElementById ("colorMenu");
	for (var i = 0; i < colors.length; i++) {
		var colorItem = document.createElement ("div");
		colorItem.setAttribute ("class", "color");
		colorItem.setAttribute ("id", colors[i]);
		colorItem.addEventListener ("click", setUserColor, false);
		colorItem.style.backgroundColor = colors[i];
		colorMenu.appendChild (colorItem);
	}
}

function setUserColor (e) {
	var userColor = document.getElementById ("titleColor");
	userColor.style.backgroundColor = e.target.id;
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

function formatDate (milliseconds) {
	
    var date = new Date (Number(milliseconds));
	var formatter = new Intl.DateTimeFormat("ru", {
		month: "short",
		year: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
});
	return formatter.format(date);
}

