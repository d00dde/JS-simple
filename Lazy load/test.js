window.onload = function () {

const count = 25; 
const pictures = (function () {  
	let container = document.querySelector('.container');
	let images = [];
	
	for (let i = 0; i < count; i++) {
		let item = document.createElement('img');
		item.classList.add('picture');
		//Выбираем случайные картинки 800*600 с сайта https://picsum.photos
		item.setAttribute('imgSRC', `https://picsum.photos/id/${Math.floor(Math.random()*1000)}/800/600`);
		images[i] = item;
		container.appendChild(item);
	}
	return images;

})();

const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0
}

const intObs = new IntersectionObserver (loadHandler, options);
// Проверяем поддерживает ли браузер IntersectionObserver, если нет отрисовываем сразу все картинки
if (intObs) {  
	pictures.forEach (image => {
		intObs.observe(image);
		
	});
}
else {
	pictures.forEach (item => {
		item.setAttribute('src', item.getAttribute('imgSRC'));
	});
}

function loadHandler (items) {
	items.forEach(item => {
		if(item.intersectionRatio > 0) {
			item.target.setAttribute('src', item.target.getAttribute('imgSRC'));
			intObs.unobserve(item.target);
		}
	});
}

}
