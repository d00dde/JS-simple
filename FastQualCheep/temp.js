window.onload = function () {

let checkbox = {
	items: 0,

	init: function () {
		this.items = document.querySelectorAll('.box');
		this.items.forEach(function(item){
			item.onclick = function () {
				if(this.firstElementChild.classList.contains('checked')) {
					this.firstElementChild.classList.remove('checked');
					this.firstElementChild.classList.add('uncheck');
				}
				else {
				checkbox.check (this);
				}
			}
		});
	},

	check: function (item) {
		
		let checked = document.querySelectorAll ('.checked');
		
		if(checked.length > 1) {
			let change = Math.floor(Math.random()*2);
			checked[change].classList.remove('checked');
			checked[change].classList.add('uncheck');
		}
		item.firstElementChild.classList.add('checked');
		item.firstElementChild.classList.remove('uncheck');

	}
}

checkbox.init ();
}

