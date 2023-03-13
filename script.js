let clickPrev = document.querySelector('.player-chunk-prev')
clickPrev.addEventListener('click', prev)
let clickNext = document.querySelector(('.player-chunk-next'))
clickNext.addEventListener('click', next)
function prev() {
	console.log('left');
}
function next () {
	console.log('rigth');
}