function disableScroll() {
	document.body.classList.add("stop-scrolling");
}

function enableScroll() {
	document.body.classList.remove("stop-scrolling");
}

const animation_card_in = [
	{ transform: 'translate(100vw)', opacity: 0 },
	{ transform: 'translate(0vw)', opacity: 1 }
];

const animation_card_out = [
	{ transform: 'translate(0vw)', opacity: 1 },
	{ transform: 'translate(100vw)', opacity: 0 }
];

const animation_timing = {
	duration: 500,
	iterations: 1,
	easing: 'cubic-bezier(.5, .5, 0, 1)'
}

const animation_main_out = [
	{ transform: 'scale(1)', opacity: 1 },
	{ transform: 'scale(.9)', transform: 'translate(-20vw)', filter: 'brightness(.2)',  opacity: 0 }
];

const animation_main_in = [
	{ transform: 'scale(.9)', filter: 'brightness(.8)', opacity: 0 },
	{ transform: 'scale(1)', filter: 'brightness(1)', opacity: 1 }
];

const animation_timing2 = {
	duration: 750,
	iterations: 1,
}

const animation_timing3 = {
	duration: 550,
	iterations: 1,
	easing: 'cubic-bezier(.5, .5, 0, 1)'
}

const product = document.querySelector('#productTitle')
const closeButton = document.querySelector('#close')
const cardContainer = document.querySelector('#crd-container')
const card = document.querySelector('#card')
const main = document.querySelector('#main')
const masButton = document.querySelector('#plus')
const menosButton = document.querySelector('#minus')
const cantidad = document.querySelector('#quant')
const total = document.querySelector('#amount')
const header = document.querySelector('header')
const contenido = document.querySelector('.contenido')

// INPUT SEARCH FOCUS PLACEHOLDER
const search = document.querySelector('#search')

search.addEventListener('focus', () => {
	search.setAttribute('placeholder', 'me gustaría...')
})

search.addEventListener('blur', () => {
	search.setAttribute('placeholder', '')
})


let cantHTML // Cantidad
let p // Precio del item
let str // Precio total

function tot () {
	// Calcula total
	str = (p*cantHTML).toString()
	// Da formato '$ 00.000'
	if( p*cantHTML >= 10000 ) {
		str = `$ ${str.substring(0,2)}.${str.substring(2,5)}`
	} else if ( p*cantHTML >= 1000 ) {
		str = `$ ${str.substring(0,1)}.${str.substring(1,4)}`
	} else str = `$ ${str}`
	// Imprime total en HTML
	total.innerHTML = str
}

// RESETEA VALORES DE CARD
function resetCard () {
	cantHTML = 1
	p = 990
	cant()
	tot()
}

// CLICK ITEM
product.addEventListener('click', () => {
	resetCard()
	header.classList.toggle('filter')
	contenido.classList.toggle('filter')
	disableScroll()
	cardContainer.classList.toggle('display-none')
	window.onscroll = function() {
		console.log("Vertical: " + window.scrollY);
		console.log("Horizontal: " + window.scrollX);
	};
	cardContainer.animate(animation_card_in, animation_timing)
});

// COSE CARD
closeButton.addEventListener('click', () => {
	enableScroll()
	header.classList.toggle('filter')
	contenido.classList.toggle('filter')
	cardContainer.animate(animation_card_out, animation_timing)
	setTimeout( e => {
		cardContainer.classList.toggle('display-none')
	}, 450)
});

// CANTIDAD UNIDADES ( + ) N ( - )
function cant () {
	// Imprime cantidad
	cantidad.innerHTML = cantHTML.toString()
	// Deshabilita el boton (-)
	cantHTML > 1 ? menosButton.classList.remove('dis') : menosButton.classList.add('dis')
	tot()
}

// BOTON (+)
masButton.addEventListener('click', () => {
	cantHTML++
	cant()
})

// BOTON (-)
menosButton.addEventListener('click', () => {
	if (cantHTML > 1 ) {
		cantHTML--
		cant()
	}
})

tot()

// ANIMACION ADD TO CART
const addButton = document.querySelector('#add-to-cart')

addButton.addEventListener('click', () => {
	console.log('clic')
	card.classList.add('anim-card-to-cart')
	setTimeout( e => {
		card.classList.remove('anim-card-to-cart')
		card.classList.toggle('display-none')
	}, 400)
})

const product2 = document.querySelector('#productTitle2')
const product3 = document.querySelector('#productTitle3')
const product4 = document.querySelector('#productTitle4')
const product5 = document.querySelector('#productTitle5')

product2.addEventListener('click', () => {
	resetCard()
	header.classList.toggle('filter')
	contenido.classList.toggle('filter')
	disableScroll()
	cardContainer.classList.toggle('display-none')
	cardContainer.animate(animation_card_in, animation_timing)
});

product3.addEventListener('click', () => {
	resetCard()
	header.classList.toggle('filter')
	contenido.classList.toggle('filter')
	disableScroll()
	cardContainer.classList.toggle('display-none')
	cardContainer.animate(animation_card_in, animation_timing)
});

product4.addEventListener('click', () => {
	resetCard()
	header.classList.toggle('filter')
	contenido.classList.toggle('filter')
	disableScroll()
	cardContainer.classList.toggle('display-none')
	cardContainer.animate(animation_card_in, animation_timing)
});

product5.addEventListener('click', () => {
	resetCard()
	header.classList.toggle('filter')
	contenido.classList.toggle('filter')
	disableScroll()
	cardContainer.classList.toggle('display-none')
	cardContainer.animate(animation_card_in, animation_timing)
});

// DRAG TO SCROLL - MENU SCROLLEABLE

const slider = document.querySelector('#scroll-to');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
	isDown = true;
	slider.classList.add('active');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
	isDown = false;
	slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
	isDown = false;
	slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
	if(!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 5; //scroll-fast
	slider.scrollLeft = scrollLeft - walk;
});

