/**
 * Инициализирует плеер Stories по заданным параметрам
 *
 * @param {{
 * target: string,
 * slides: Array<{url: string, alt?: string}>
 *     }} params
 * @returns {Element|null}
 */

function initPlayer(params) {
	const target = document.querySelector(params.target);
	if(target === null || params.slides === undefined) {
		return null;
	}
	let timeLineChunks = "";
	let playerChunks = "";
	let isFirst = true;
	let timer;
	
	for (const slide of params.slides) {
		timeLineChunks += generateTimelineChunk(isFirst);
		playerChunks += generatePlayerChunk(slide, isFirst);
		isFirst = false;
	}
	target.innerHTML = generatePlayerLayout();
	
	let prev = document.querySelector(".player-chunk-prev");
	let next = document.querySelector(".player-chunk-next");
	
	prev.addEventListener("click", switchToPrev);
	next.addEventListener("click", switchToNext);
	
	runInterval(2, 1);
	
	return target.querySelector(".player");
	
	function generateTimelineChunk(isFirst) {
		return `<div class="timeLine-chunk ${isFirst ? "timeLine-chunk-active" : ""}">
						<div class="timeLine-chunk-inner"></div></div>`;
	}
	
	function generatePlayerChunk(slide, isFirst) {
		const style = []
		if (slide.filter) {
			style.push(`filter: ${slide.filter.join(' ')}`)
		}
		return `<div class="player-chunk ${isFirst ? "player-chunk-active" : ""}">
						<img src="${slide.url}" alt="${slide.name || ""}" style="${style.join(';')}">
						${generateOverlays(slide)}</div>`;
	}
	
	function generateOverlays(slide) {
		if(slide.overlays === undefined) {
			return "";
		}
		let res = "";
		for (const el of slide.overlays) {
			const classes = el.classes !== undefined ? el.classes.join(' ') : ''
			
			const styles = (el.styles !== undefined ? Object.entries(el.styles) : [])
			.map((i) => i.join(":"))
			.join(";");
			
			res += `<div class="player-chunk-overlay ${classes}" style="${styles}">${renderOverlay(el)}</div>`;
		}
		return res;
		function renderOverlay (overlay) {
			if (overlay.type === 'text') {
				return overlay.value
			}
			if (overlay.type === 'img'){
				return `img src="${overlay.value}" alt=''`
			}
			return ''
		}
	}
	
	function generatePlayerLayout() {
		return `<div class="player"> 
						<div class="timeLine">${timeLineChunks}</div>
						<div class="player-content-wrapper">
						<div class="player-chunk-switcher player-chunk-prev"></div>
						<div class="player-chunk-switcher player-chunk-next"></div>
						<div class="player-content">${playerChunks}</div>
						</div>
						</div>`;
	}
	
	function moveClass(className, method) {
		const active = document.querySelector("." + className);
		
		if(active[method]) {
			active.classList.remove(className);
			active[method].classList.add(className);
			return active;
		}
		return null;
	}
	
	function switchToPrev() {
		const el = moveClass("timeLine-chunk-active", "previousElementSibling");
		
		moveClass("player-chunk-active", "previousElementSibling");
		if(el) {
			el.querySelector(".timeLine-chunk-inner").style.width = "";
		}
	}
	
	function switchToNext() {
		const el = moveClass("timeLine-chunk-active", "nextElementSibling");
		moveClass("player-chunk-active", "nextElementSibling");
		if(el) {
			el.querySelector(".timeLine-chunk-inner").style.width = "";
		}
	}
	
	function runInterval(time, step) {
		clearInterval(timer);
		timer = setInterval(() => {
			const active = document.querySelector(".timeLine-chunk-active").querySelector(".timeLine-chunk-inner");
			let w = parseFloat(active.style.width) || 0;
			if(w === 100 && active) {
				switchToNext();
				return;
			}
			active.style.width = String(w + step) + "%";
		}, time * 1000 * step / 100);
	}
}
