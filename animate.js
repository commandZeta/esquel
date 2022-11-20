const animation_opacity_in = [
	{ opacity: 0 },
	{ opacity: 1 }
];

const animation_opacity_out = [
	{ opacity: 1 },
	{ opacity: 0 }
];

const animation_translateY_toTop = [
	{ transform: 'translateY(0)' },
	{ transform: 'translateY(-100vh)' }
];

const animation_translateY_toRight = [
	{ transform: 'translateY(0)' },
	{ transform: 'translateY(100vw)' }
];

const animation_translateY_toBottom = [
	{ transform: 'translateY(0)' },
	{ transform: 'translateY(100vh)' }
];

const animation_translateY_toLeft = [
	{ transform: 'translateY(0)' },
	{ transform: 'translateY(-100vw)' }
];

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