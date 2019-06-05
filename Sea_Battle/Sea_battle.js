
window.onload = function () {

	var wrapper = document.getElementById ("wrapper");
	var counter = document.getElementById ("counter");
	console.log (counter);
	counter.innerText = 0;
	var cells = [];
	var field = [];
	var ships = [];
	var fsize = 9;

	
	for (var i = 0; i < fsize; i++) {

		var row = document.createElement ("tr");
		wrapper.appendChild (row);
		for (var j = 0; j < fsize; j++){
			var cell = document.createElement ("td");
			cell.setAttribute ("class", "cell");
			row.appendChild (cell);
			cells.push (cell);
		}
	}

	wrapper.addEventListener ("click", function (e) {
				if (e.target.classList.contains("click"))
					return;
				e.target.classList.add ("click");
				counter.innerText++;
			}, false);

	//createShips (4, 1, ships, field, fsize);
	createShips (3, 2, ships, field, fsize);
	createShips (2, 3, ships, field, fsize);
	//createShips (1, 4, ships, field, fsize);

	for (var i in ships) {
		//console.log (ships);
		ships[i].showShip(cells);
	}


	for (var i = 0; i < cells.length; i++) {
		if (field[i] && cells[i].style.backgroundColor == ""){
			//console.log(i);
			cells[i].style.backgroundColor = "#bbb";
		}
	}

}

function createShips (size, count, ships, field, fsize) {
	for (var i = 0; i < count; i++) {
		ships.push (new Ship (size, field, fsize));
	}
}

function Ship (size, field, fsize) {
	this.size = size;
	this.coordinates = setShip (size, field, fsize);
	this.showShip = function (cells) {
		for (var i = 0; i < this.coordinates.length; i++) {
			cells[this.coordinates[i]].style.backgroundColor = "#234";
		}

	}
}

function setShip (size, field, fsize) {  // распологает корабль указанного размера на поле
	var coordinates = false;	  // переменная, в которой будет массив с координатами корабля
	do {
		var begin = Math.floor(Math.random()*fsize*fsize);   // случайно выбрать клетку начала корабля
		var direction = Math.floor(Math.random()*4); // случайно выбрать направление, в котором будет расположен корабль
		coordinates = isFree (begin, size, direction, field, fsize); // пробуем расположить корабль указанного размера в указанном направлении
	} while (!coordinates);                      // повторяем пока не получим координаты, а не false. Программа зависнет, если корабль в принципе нельзя расположить
	blockCells (coordinates, field, fsize);		// блокируем соответствующие клетки (координаты корабля и смежные клетки)
	return coordinates;						// возвращаем координаты успешно расположенного корабля

}

function isFree (begin, size, direction, field, fsize) {  // проверяет возможно ли расположить корабль указанного размера в указанном направлении от выбранной клетки начала
	
	var coordinates = [];   // здесь будем сохранять координаты корабля

	switch (direction) {                         
		case 0: if (begin > ((size-1)*fsize - 1)) { 	// расположить корабль вверх от клетки начала
			for (var i = 0; i < size; i++) { 	 	// если корабль указанного размера в принципе может быть расположен вверх от клетки начала
				if (!field[begin - fsize*i]) {		  	// для каждой клетки в данном направлении проверяем в массиве field не занято ли оно
					coordinates[i] = begin - fsize*i;  // если не занято, то записываем поле в координаты
				}
				else {
					coordinates = false;	            // если хотя бы одно поле занято, то устанавливаем coordinates в false и выходим из цикла
					break;
				}
			}
			break;		// если выход произошел здесь, то корабль расположен, координаты записаны в coordinates
		}
		coordinates = false;  // если корабль такого размера в принципе нельзя расположить в данном направлении от клетки начала
		break;				 // устанавливаем coordinates в false и выходим из цикла
		case 1: if (begin < (fsize*fsize - (size-1)*fsize)) {  // расположить корабль вниз от клетки начала
			for (var i = 0; i < size; i++) {
				if (!field[begin + fsize*i]) {
					coordinates[i] = begin + fsize*i;  // все аналогично case 0
				}
				else {
					coordinates = false;	
					break;
				}
			}
			break;
		}
		coordinates = false;
		break;
		case 2: if (begin%fsize < (fsize - size)) {  // расположить корабль вправо от клетки начала
			for (var i = 0; i < size; i++) {
				if (!field[begin + i]) {
					coordinates[i] = begin + i;  // все аналогично case 0
				}
				else {
					coordinates = false;	
					break;
				}
			}
			break;
		}
		coordinates = false;
		break;
		case 3: if (begin%fsize > (size - 2)) { // расположить корабль влево от клетки начала
			for (var i = 0; i < size; i++) {
				if (!field[begin - i]) {
					coordinates[i] = begin - i;  // все аналогично case 0
				}
				else {
					coordinates = false;	
					break;
				}
			}
			break;
		}
		coordinates = false;
		break;
	}
	return coordinates;  // если корабль удалось расположить, возвращаем координаты корабля
						 // если корабль расположить не удалось, возвращаем false
}

function blockCells (coordinates, field, fsize) { // отмечает в массиве field заблокированные клетки
	for(var i = 0; i < coordinates.length; i++) { // изначально массив пустой, все клетки в нем undefined
		if (coordinates[i] == 0) {				  // поэтому заблокированные клетки будем отмечать как true 
			field[0] = true;					  // в цепочке else if отработает только один блок для каждой клетки координат
			field[1] = true;					  // блокируется сама клетка координат и все смежные
			field[fsize] = true;					  // сначала проверяем угловые клетки или нет
			field[fsize+1] = true;					  // потом проверяем принадлежат ли клетки верхнему, нижнему ряду,
		} else if (coordinates[i] == fsize-1) {		  // правой либо левой стороне, блокируя соответствующие смежные клетки
			field[fsize-1] = true;					  // последний блок else отработает для всех клеток не на краю поля
			field[fsize-2] = true;
			field[2*fsize-1] = true;
			field[2*fsize-2] = true;			
		} else if (coordinates[i] == (fsize-1)*fsize) {
			field[(fsize-1)*fsize] = true;
			field[(fsize-2)*fsize] = true;
			field[(fsize-1)*fsize+1] = true;
			field[(fsize-2)*fsize+2] = true;			
		} else if (coordinates[i] == fsize*fsize-1) {
			field[fsize*fsize-1] = true;
			field[(fsize-1)*fsize-1] = true;
			field[fsize*fsize-2] = true;
			field[(fsize-1)*fsize-2] = true;			
		} else if (coordinates[i] < fsize) {
			field[coordinates[i]] = true;
			field[coordinates[i]+1] = true;
			field[coordinates[i]-1] = true;
			field[coordinates[i]+fsize] = true;
			field[coordinates[i]+fsize+1] = true;
			field[coordinates[i]+fsize-1] = true;
		} else if (coordinates[i] > (fsize-1)*fsize-1) {
			field[coordinates[i]] = true;
			field[coordinates[i]+1] = true;
			field[coordinates[i]-1] = true;
			field[coordinates[i]-fsize] = true;
			field[coordinates[i]-fsize-1] = true;
			field[coordinates[i]-fsize+1] = true;
		} else if (coordinates[i]%fsize == fsize-1) {
			field[coordinates[i]] = true;
			field[coordinates[i]-1] = true;
			field[coordinates[i]-fsize] = true;
			field[coordinates[i]-fsize-1] = true;
			field[coordinates[i]+fsize] = true;
			field[coordinates[i]+fsize-1] = true;
		} else if (coordinates[i]%fsize == 0) {
			field[coordinates[i]] = true;
			field[coordinates[i]+1] = true;
			field[coordinates[i]+fsize] = true;
			field[coordinates[i]+fsize+1] = true;
			field[coordinates[i]-fsize] = true;
			field[coordinates[i]-fsize+1] = true;
		} else {
			field[coordinates[i]] = true;
			field[coordinates[i]+1] = true;
			field[coordinates[i]-1] = true;
			field[coordinates[i]-fsize-1] = true;
			field[coordinates[i]-fsize] = true;
			field[coordinates[i]-fsize+1] = true;
			field[coordinates[i]+fsize+1] = true;
			field[coordinates[i]+fsize] = true;
			field[coordinates[i]+fsize-1] = true;
		}
	}
}


function printObject (object, letter = false) {   // функция принимает на вход объект, создает div и распечатывает в него все всойства объекта и их значения. 
												  //Если задан второй параметр (буква), то выводятся только значения, начинающиеся на эту букву. 	
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
		if(!letter || key[0] == letter) {
			text = text + key + " : " + object[key] + "<br\/>";
		}
	}
	box.innerHTML = text;
}