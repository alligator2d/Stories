function initPlayer(params) {
	const target = document.querySelector(params.target);
	if(target === null || params.slides === undefined) {
		return;
	}
	let timeLineChunks = "";
	let playerChunks = "";
	let isFirst = true;
	
	for (const el of params.slides) {
		timeLineChunks += `<div class="timeLine-chunk ${isFirst ? "timeLine-chunk-active" : ""}">
						<div class="timeLine-chunk-inner"></div></div>`;
		playerChunks += `<div class="player-chunk ${isFirst ? "player-chunk-active" : ""}">
						<img src="${el.url}" alt="${el.name || ""}"></div>`;
		isFirst = false;
	}
	target.innerHTML = `<div class="player"> 
						<div class="timeLine">${timeLineChunks}</div>
						<div class="player-content-wrapper">
						<div class="player-chunk-switcher player-chunk-prev"></div>
						<div class="player-chunk-switcher player-chunk-next"></div>
						<div class="player-content">${playerChunks}</div>
						</div>
						</div>`;
	
}


let prev = document.querySelector(".player-chunk-prev");
let next = document.querySelector(".player-chunk-next");

prev.addEventListener("click", function () {
	const el = moveClass("timeLine-chunk-active", "previousElementSibling");
	
	moveClass("player-chunk-active", "previousElementSibling");
	if(el) {
		el.querySelector(".timeLine-chunk-inner").style.width = "";
	}
});

next.addEventListener("click", nextImg);

function moveClass(className, method) {
	const active = document.querySelector("." + className);
	
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
	if(el) {
		el.querySelector(".timeLine-chunk-inner").style.width = "";
	}
}

function runInterval(time, step) {
	let timer;
	clearInterval(timer);
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

runInterval(2, 1);

