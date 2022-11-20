// HOVER ON OFF
function watchForHover() {
	// lastTouchTime is used for ignoring emulated mousemove events
	// that are fired after touchstart events. Since they're
	// indistinguishable from real events, we use the fact that they're
	// fired a few milliseconds after touchstart to filter them.
	let lastTouchTime = 0

	function enableHover() {
		if (new Date() - lastTouchTime < 500) return
		document.body.classList.add('hasHover')
	}

	function disableHover() { document.body.classList.remove('hasHover') }

	function updateLastTouchTime() { lastTouchTime = new Date() }

	document.addEventListener('touchstart', updateLastTouchTime, true)
	document.addEventListener('touchstart', disableHover, true)
	document.addEventListener('mousemove', enableHover, true)

	enableHover()
}

watchForHover()
// end hover on off


// SCROLL ON OFF
function disableScroll() { document.body.classList.add("stop-scrolling"); }
function enableScroll() { document.body.classList.remove("stop-scrolling"); }
// end scroll on off


// RESETEA VALORES DE CARD
function resetCard () {

	cantHTML = 1
	p = 1000 // Precio del item
	// Resetea adicionales
	suma_opcionales = 0
	var adds = document.querySelectorAll('input[type="checkbox"]')
	adds.forEach(inputAdd => { inputAdd.checked = false });
	cant()
}

function close_searchList() {

	searchList.animate(animation_opacity_out, 120)
	setTimeout( () => {

		searchToggle.animate(animation_opacity_out, 120)
		setTimeout( () => {

			searchToggle.classList.add('hidden')
			searchList.innerHTML = ''
		}, 110)
	}, 120)
}

function inputSearch__toggle() {

	if(inputSearch.value!='') setTimeout( e => { inputSearch.value = '' }, 300)

	search.classList.toggle('s-active')
	logo.classList.toggle('l-active')
	menuToggle.classList.remove('unfolded')

	search.classList.contains('s-active') ? document.getElementById('input-search').focus() : document.getElementById('input-search').blur()
	// search.classList.contains('s-active') ? backdropFilter__blackBlur(true, 'search') : backdropFilter__blackBlur(false, 'search')

	if (!search.classList.contains('s-active')) {
		backdropFilter__blackBlur(false, 'search')
		close_searchList()
	}
}


// BACKDROP FILTER BLACK BLUR
function backdropFilter__blackBlur (on, div) {
	
	if (on) {
		blackout.classList.remove('hidden')
		disableScroll()
		if (div === 'search') {
			blackout.style = 'z-index: 1;'
			contenido.classList.add('filter')
		}
		if (div === 'card') {
			blackout.style = 'z-index: 3;'
			header.classList.add('filter')
			contenido.classList.add('filter')
		}
		blackout.style.top = window.scrollY
	} else {
		blackout.classList.add('hidden')
		enableScroll()
		if (div === 'search') {
			blackout.style.removeProperty('z-index')
			contenido.classList.remove('filter')
		}
		if (div === 'card') {
			blackout.style.removeProperty('z-index')
			header.classList.remove('filter')
			contenido.classList.remove('filter')
		}
	}
}
// end backdrop filter black blur


// CLOSE CARD
function closeCard_card () {

	backdropFilter__blackBlur(false, 'card')
	// enableScroll()
	// header.classList.toggle('filter')
	// contenido.classList.toggle('filter')
	
	// blackout.classList.toggle('hidden')
	bg_mainButton.classList.toggle('hidden')

	// card.animate(animation_card_out, animation_timing)
	cardContainer.animate(animation_card_out, animation_timing)
	setTimeout( () => {
		// card.classList.toggle('hidden')
		cardContainer.classList.toggle('hidden')
	}, 450)
}

function closeCard_button () {
	// if (bagEmpty) {}
}
// end close card


// CLICK ITEM
function itemSelect() {

	resetCard()
	backdropFilter__blackBlur(true, 'card')

	cardContainer.classList.toggle('hidden')
	bg_mainButton.classList.toggle('hidden')

	cardContainer.animate(animation_card_in, animation_timing)
}

function itemsLoad () {

	var items = document.querySelectorAll('.item');
	items.forEach( item => { item.addEventListener('click', itemSelect) })
}

window.onload = itemsLoad()
// end click item


// INPUT SEARCH FOCUS PLACEHOLDER
/* const search = document.querySelector('#search')

search.addEventListener('focus', () => {
	search.setAttribute('placeholder', 'me gustaría...')
})

search.addEventListener('blur', () => {
	search.setAttribute('placeholder', '')
}) */

// function close_searchList() {

// 	searchToggle.animate(animation_opacity_out, 500)

// 	setTimeout( () => {
// 		searchToggle.classList.add('hidden')
// 	},490)
// }
// end input search focus placeholder


// INPUT SEARCH
search.addEventListener('click', inputSearch__toggle)

inputSearch.addEventListener('input', () => {

	if (inputSearch.value.length == 1) {
		backdropFilter__blackBlur(true, 'search')

		searchToggle.classList.toggle('hidden')
		// searchList.style.height = 'auto'

		setTimeout( () => { searchList.style.opacity = 1 }, 100)

		// CANTIDAD DE ITEMS A MOSTRAR:
		let items = 
		parseInt( window.innerHeight / parseInt( // Viewheight en REM
			getComputedStyle(
				document.querySelector(':root')
			)['font-size']
		) / 6.5 ) - 2

		searchList.style.maxHeight = `${items*6.5}rem`

		let cantItems = 17 // Cantidad de items devueltos de la busqueda en la base de datos
		let itemString = ''
		for (let i=1 ; i<=cantItems ; i++) {
			if (i==1) itemString += `
			`

			itemString +=
			`<div class="search-result item">
				<h6>Wok</h6>
				<dt>Yakimeshi ${i}</dt>
				<dd class="cc">Mix de hojas verdes, tomate cherry, palta, pepino, repollo y zanahoria, con adherezo balsámico</dd>
				<div class="de price">$&nbsp;990</div>
			</div>

			`
		}

		itemString += `<div class="padding-bottom"> <!-- this is just a padding-bottom --> </div>
		`
		searchList.innerHTML = itemString
	}

	const itemsReload = document.querySelectorAll('.search-result')

	itemsReload.forEach(item => {
		
		item.addEventListener('click', () => {
			inputSearch__toggle()
			itemSelect()
			close_searchList()
		})
	});
})
// end input search


menuToggle.addEventListener('click', () => {

	document.querySelector('.menu-icon-2').classList.toggle('unfolded')

	setTimeout( () => {
		inputSearch.value = ''
		search.classList.remove('s-active')
		logo.classList.remove('l-active')
	}, 200)
});

// ANIMATION ADD TO CART
// const addButton = document.querySelector('#add-to-cart')

// addButton.addEventListener('click', () => {
// 	enableScroll()
// 	header.classList.toggle('filter')
// 	contenido.classList.toggle('filter')
	
// 	blackout.classList.toggle('hidden')
// 	bg_mainButton.classList.toggle('hidden')

// 	cardContainer.animate(animation_card_out, animation_timing)
// 	setTimeout( e => {
// 		cardContainer.classList.toggle('hidden')
// 	}, 450)
// })
// end animation add to cart

closeButton.addEventListener('click', () => { closeCard_card() });

blackout.addEventListener('click', () => {
	if (!cardContainer.classList.contains('hidden')) closeCard_card(); else {
		backdropFilter__blackBlur(false, 'search')

		// Esto hay que hacerlo function (codigo repetido)
		setTimeout( e => {
			inputSearch.value = ''
		}, 300)
		search.classList.toggle('s-active')
		logo.classList.toggle('l-active')
		menuToggle.classList.remove('unfolded')
	}
});


// SLIDE TO CLOSE - 
// const topCard = document.querySelector('#top-crd')
// const bodyCard = document.querySelector('#body-crd')
// var xStart, yStart, xEnd, yEnd

// function is_slidingToClose () {
// 	if (xStart+10 < xEnd || yStart+5 < yEnd)
// 		closeCard_card()
// }

// topCard.addEventListener('mousedown', (e) => {
// 	xStart = e.clientX
// 	yStart = e.clientY
// })

// topCard.addEventListener('mouseup', (e) => {
// 	xEnd = e.clientX
// 	yEnd = e.clientY

// 	is_slidingToClose()
// })

// bodyCard.addEventListener('mouseup', (e) => {
// 	xEnd = e.clientX
// 	yEnd = e.clientY

// 	is_slidingToClose()
// })

// blackout.addEventListener('mouseup', (e) => {
// 	xEnd = e.clientX
// 	yEnd = e.clientY

// 	is_slidingToClose()
// })
// end slide to close


// DRAG TO SCROLL
const slider = document.querySelector('#scroll-to');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => { // presiono click
	// document.removeEventListener("dragover");
	isDown = true;
	// slider.classList.add('active');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => { // me voy del div
	isDown = false;
	// slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => { // levanto click
	document.removeEventListener("click");
	isDown = false;
	// slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => { // muevo el mouse sobre el div
	if(!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 2; // scroll-fast
	slider.scrollLeft = scrollLeft - walk;
});
// end drag to scroll

// WIDGET
// const widget = document.getElementById('widget')
// const imgcover = document.getElementById('imgcover')

// widget.onmouseover = () => { imgcover.classList.add('cover-hover') }
// widget.onmouseout = () => { imgcover.classList.remove('cover-hover') }
// end widget

// SWITCH ON OFF
const switch_LR = document.querySelectorAll('input[type="radio"]')
const switchTile = document.getElementById('switch')

switch_LR.forEach( input => {
	
	input.addEventListener('click', () => {

		if ( input.value == 'delivery') {
			switch_LR.forEach( e => { e.removeAttribute('checked') } )
			input.setAttribute('checked', '')
			switchTile.classList.add('switch-l')
			switchTile.classList.remove('switch-r')
		} else {
			switch_LR.forEach( e => { e.removeAttribute('checked') } )
			input.setAttribute('checked', '')
			switchTile.classList.add('switch-r')
			switchTile.classList.remove('switch-l')
		}
	})
})
// end switch on off

// INPUT OPTIONAL
function inputTurn_OFF (form) {
	var l = form.querySelectorAll('label')

	l.forEach( lbl => {
		var forProp = lbl.htmlFor
		var i = form.querySelector(`input[id="${forProp}"]`)

		if ( i.checked ) {
			i.removeAttribute('disabled')
			lbl.classList.remove('lbl-disabled')
		} else {
			i.setAttribute('disabled', '')
			lbl.classList.add('lbl-disabled')
			lbl.removeEventListener('click', () => {} )
			lbl.removeEventListener('mouseover', () => {} )
			lbl.removeEventListener('mouseout', () => {} )
		}
	})
}

function inputTurn_ON (form) {
	var l = form.querySelectorAll('label')

	l.forEach( lbl => {
		var forProp = lbl.htmlFor
		var i = form.querySelector(`input[id="${forProp}"]`)

		if ( ! i.checked ) {
			i.removeAttribute('disabled')
			lbl.classList.remove('lbl-disabled')
		}
	})
}

document.querySelectorAll('.frm').forEach( form => {

	var max = parseInt(form.getAttribute('max'))
	var selected = 0
	var lblsForm = form.querySelectorAll('label')

	lblsForm.forEach( label => {

		var stroke_ext = label.querySelector('.str-ext')
		var stroke_int = label.querySelectorAll('.str-int')
		var forProperty = label.htmlFor
		var inputAdd = form.querySelector(`input[id="${forProperty}"]`)
		var maxHTML = form.querySelector('.limit')

		if ( form.hasAttribute('max') ) maxHTML.innerHTML = `${selected}/${max}`

		if ( inputAdd.disabled ) {

			label.classList.add('lbl-disabled')
		} else {

			label.classList.remove('lbl-disabled')

			label.addEventListener('click', () => {

				if ( ! inputAdd.disabled ) {
					if( stroke_ext.classList != null ) {
						stroke_ext.classList.toggle('add-check')
						stroke_int.forEach( e => { e.classList.toggle('add-check') })
						stroke_ext.classList.toggle('str-ext')
						stroke_int.forEach( e => { e.classList.toggle('str-int') })
					}
	
					setTimeout( () => {
						inputAdd.checked ? selected++ : selected--
						
						if ( form.hasAttribute('max') )
							maxHTML.innerHTML = `${selected}/${max}`

						if ( selected >= max ) {
							maxHTML.classList.add('max')
							inputTurn_OFF(form)
							lblsForm = form.querySelectorAll('label')
						} else {
							maxHTML.classList.remove('max')
							inputTurn_ON(form)
							lblsForm = form.querySelectorAll('label')
						}
					})
				}
			})

			// remove hover from touch devices (?)

			label.addEventListener('mouseover', (t) => {

				if ( ! inputAdd.disabled && ! inputAdd.checked )
					stroke_int.forEach( (e) => { e.classList.toggle('str-int-hover', ! t.sourceCapabilities.firesTouchEvents ) } )
			})

			label.addEventListener('mouseout', (t) => {

				if ( ! inputAdd.disabled && ! inputAdd.checked )
					stroke_int.forEach( (e) => { e.classList.toggle('str-int-hover', t.sourceCapabilities.firesTouchEvents ) } )
			})
		}
	})
})
// end input optional