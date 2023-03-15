let prev = document.querySelector(".player-chunk-prev");
let next = document.querySelector(".player-chunk-next");

prev.addEventListener("click", function () {
	const el = moveClass("timeLine-chunk-active", "previousElementSibling", (el) => {
		const inner = el.querySelector('.timeLine-chunk-inner')
		let w = parseFloat(inner.style.width) || 0;
		el.querySelector('.timeLine-chunk-inner').style.width = ''
		return w<=10
	})
	
	moveClass("player-chunk-active", "previousElementSibling");
	if (el) {
		el.querySelector('.timeLine-chunk-inner').style.width = ''
	}
});

next.addEventListener("click", nextImg);

function moveClass(className, method, pred) {
	const active = document.querySelector("." + className);
	
	if(pred && !pred(active)) {
		return
	}
	
	if(active[method]) {
		active.classList.remove(className);
		active[method].classList.add(className);
		return active;
	}
	return null;
}

function nextImg() {
	const el = moveClass("timeLine-chunk-active", "nextElementSibling");
	moveClass("player-chunk-active", "nextElementSibling");
	if (el) {
		el.querySelector('.timeLine-chunk-inner').style.width = ''
	}
}
function runInterval (time, step) {
	let timer;
	clearInterval(timer) 
	timer = setInterval(() => {
		const active = document.querySelector(".timeLine-chunk-active").querySelector(".timeLine-chunk-inner");
		let w = parseFloat(active.style.width) || 0;
		if(w === 100 && active) {
			if(nextImg()) {
				// active.style.width = "";
			}
			return;
		}
		active.style.width = String(w + step) + "%";
	}, time * 1000 * step / 100);
}

runInterval(2,  1)

