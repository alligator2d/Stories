let prev = document.querySelector(".player-chunk-prev");
let next = document.querySelector(".player-chunk-next");

prev.addEventListener("click", function () {
	moveClassPrev("timeLine-chunk-active");
	moveClassPrev("player-chunk-active");
});

next.addEventListener("click", function () {
	moveClassNext("timeLine-chunk-active");
	moveClassNext("player-chunk-active");
	
});

function moveClassNext(className) {
	let active = document.querySelector("." + className);
	if(active.nextElementSibling) {
		active.classList.remove(className);
		active.nextElementSibling.classList.add(className);
	}
}
function moveClassPrev(className) {
	let active = document.querySelector("." + className);
	let prev = active.previousElementSibling
	if(prev && (prev.classList.contains('player-chunk') || prev.classList.contains('timeLine-chunk'))) {
		active.classList.remove(className);
		active.previousElementSibling.classList.add(className);
	}
}