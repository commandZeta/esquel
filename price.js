
const closeButton = document.getElementById('close')
const cardContainer = document.getElementById('crd-container')
const card = document.getElementById('card')
const main = document.getElementById('main')
const masButton = document.getElementById('plus')
const menosButton = document.getElementById('minus')
const cantidad = document.getElementById('quant')
const total = document.getElementById('amount')
const header = document.querySelector('header')
const contenido = document.querySelector('.contenido')
const bg_mainButton = document.getElementById('fade')
const blackout = document.getElementById('blackout')
const navBar = document.getElementById('nav')
const search = document.getElementById('search')
const logo = document.getElementById('logo')
const menuToggle = document.getElementById('toggle-menu')
const inputSearch = document.getElementById('input-search')
const searchToggle = document.getElementById('searchToggle')
const searchList = document.getElementById('searchList')
let mainButton = false

let cantHTML // Cantidad
let p // Precio del item
let strTot // Precio total
var suma_opcionales = 0
var inputsAdds = document.querySelectorAll('input[type="checkbox"]')

function price_parseInt (price) {

	// var decimals
	// if ( price.includes(',') ) decimals = parseInt(price.substr(-2)) / 100
	var n = ''
	for (let i=0 ; i<price.length; i++) if ( price[i] == '$' || price[i] == ' ' || price[i] == '.' ) continue; else n += price[i]
	return parseInt(n)
	// return parseInt(n) + decimals // con decimales
}

// CALCULA E IMPRIME EL TOTAL EN HTML
function tot () {

	// Calcula total
	strTot = ((p + suma_opcionales)*cantHTML).toString()
	// Da formato '$ 00.000'
	if( p*cantHTML >= 10000 ) {
		strTot = `$ ${strTot.substring(0,2)}.${strTot.substring(2,5)}`
	} else if ( p*cantHTML >= 1000 ) {
		strTot = `$ ${strTot.substring(0,1)}.${strTot.substring(1,4)}`
	} else strTot = `$ ${strTot}`
	// Imprime el total en HTML con formato
	total.innerHTML = strTot
}

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

// CALCULA ADICIONALES OPCIONALES
inputsAdds.forEach( inputAdd => {

	inputAdd.addEventListener('click', () => {

		var adds = 0
		var adds_check = document.querySelectorAll('input[type="checkbox"]:checked')
		adds_check.forEach(inputCheck => { adds += parseInt(inputCheck.value) });
		suma_opcionales = adds
		tot()
	})
})