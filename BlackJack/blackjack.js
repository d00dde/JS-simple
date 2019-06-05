window.onload = function () {

	var imgs = [];
	imgs.push (["img/tier1_1.jpg", "img/tier1_2.jpg"]);
	imgs.push (["img/tier2_1.jpg", "img/tier2_2.jpg", "img/tier2_3.jpg", "img/tier2_4.jpg", "img/tier2_5.jpg", "img/tier2_6.jpg", "img/tier2_7.jpg"]);
	imgs.push (["img/tier3_1.jpg", "img/tier3_2.jpg", "img/tier3_3.jpg"]);
	imgs.push (["img/tier4_1.jpg", "img/tier4_2.jpg", "img/tier4_3.jpg", "img/tier4_4.jpg", "img/tier4_5.jpg", "img/tier4_6.jpg"]);
	imgs.push (["img/tier5.jpg"])

	var START_MONEY = 500;
	var player = {
		money: START_MONEY,
		score: 0,
		cardField: document.getElementById ("plcards"),
		scoreField: document.getElementById ("plscore"),
		moneyField: document.getElementById ("plmoney"),
	};

	var diler = {
		money: START_MONEY,
		score: 0,
		cardField: document.getElementById ("dlcards"),
		scoreField: document.getElementById ("dlscore"),
		moneyField: document.getElementById ("dlmoney"),
	};

	var out = [];
	var push = document.getElementById ("push");
	var stay = document.getElementById ("stay");
	var deal = document.getElementById ("deal");
	var start;
	var bet;
	var result = document.getElementById ("result");
	var pot = document.getElementById ("pot");
	var imgBox = document.getElementById ("imgBox");
	var progress = 0;
	setImage (progress);

	imgBox.width = 350;
	imgBox.height = 250;


		
	player.moneyField.innerText = player.money;
    diler.moneyField.innerText = diler.money;

    push.disabled = true;
	stay.disabled = true;

deal.onclick = function () {

    	clearGame();

    	deal.disabled = true;
    	push.disabled = false;
		stay.disabled = false;

       	bet = document.getElementById ("bet").value;

       	player.moneyField.innerText = player.money - bet;
    	diler.moneyField.innerText = diler.money - bet;
    	pot.innerText = 2*bet;

		draw (player);
		draw (player);
		draw (diler);

		

		
}

push.onclick = function () {
	draw (player);
	if (player.score > 21) {
		endGame (-1);
	}

}

stay.onclick = function () {
	while(diler.score < 17) {
		draw (diler);
	}
	if (diler.score > 21) {
		endGame (1);
	}
	else if(diler.score > player.score) {
		endGame (-1);
	}
	else if (diler.score < player.score){
		endGame (1);
	}
	else { endGame (0);
	}
}



function draw (player) {
	
	var card;
	
	do {
		var isUniqe = true;
		card = Math.floor(Math.random()*52);
		if(out[card]) {
			isUniqe = false;
		}

	
	} while(!isUniqe); 
	out[card] = true;

	addCard (player, card);
}

function addCard (player, card) {
	var suit;
	var type;
	var value;

	switch (parseInt(card/13)) {
		case 0: suit = "cards/clubs";
		break;
		case 1: suit = "cards/spade";
		break;
		case 2: suit = "cards/diamo";
		break;
		case 3: suit = "cards/heart";
		break;
	}

	switch (card%13) {
		case 0: type = "1"; value = 11;
		break;
		case 1: type = "2"; value = 2;
		break;
		case 2: type = "3"; value = 3;
		break;
		case 3: type = "4"; value = 4;
		break;
		case 4: type = "5"; value = 5;
		break;
		case 5: type = "6"; value = 6;
		break;
		case 6: type = "7"; value = 7;
		break;
		case 7: type = "8"; value = 8;
		break;
		case 8: type = "9"; value = 9;
		break;
		case 9: type = "10"; value = 10;
		break;
		case 10: type = "11"; value = 10;
		break;
		case 11: type = "12"; value = 10;
		break;
		case 12: type = "13"; value = 10;
		break;
	}

	var tempCard = document.createElement ("img");
	tempCard.setAttribute ("src", suit + type + ".jpg");
	tempCard.setAttribute ("width", 30);
	player.cardField.appendChild (tempCard);
 	player.score += value;
 	player.scoreField.innerText = player.score;
}

function clearGame () {
	out = [];
	bet = 0;
	player.score = 0;
	diler.score = 0;
	removeChilds (player.cardField);
	removeChilds (diler.cardField);
	
	
	result.innerText = "...";

}

function removeChilds (elem) {
	while (elem.lastChild){
		elem.removeChild (elem.lastChild);
	}
}

function endGame (win) {
	switch (win) {
		case 1: result.innerText = "YOU WIN !!!";
		player.money += Number(bet);
		diler.money -= Number(bet);
		break;
		case 0: result.innerText = "It`s a draw";
		break;
		case -1: result.innerText = "You loose";
		player.money -= Number(bet);
		diler.money += Number(bet);
		break;
	}
	push.disabled = true;
	stay.disabled = true;
	deal.disabled = false;


	player.moneyField.innerText = player.money;
    diler.moneyField.innerText = diler.money;
    pot.innerText = 0;
    if (player.money <= 0){
    	totalWin (false);
    }
    if (diler.money <=0) {
    	totalWin (true);
    }
}

function totalWin (isWin) {
	if (isWin) { 
		diler.money += Number(START_MONEY);
		progress++;
		setImage (progress);
		diler.moneyField.innerText = diler.money;
	} else {
		player.money += Number(START_MONEY);
		progress--;
		setImage (progress);
		player.moneyField.innerText = player.money;
	}
}

function setImage (progress) {
	
	var currImg = document.createElement ("img");

	currImg.src = imgs[progress][Math.floor(Math.random()*(imgs[progress].length))];

	currImg.id = "currImg";
	currImg.setAttribute ("width", 200);
	if (document.getElementById ("currImg")) {
		imgBox.replaceChild (currImg, document.getElementById ("currImg"));
	}
	else {
		imgBox.appendChild (currImg);
	}
}


}

