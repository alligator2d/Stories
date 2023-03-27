export default class ClassSwitcher {
	/**
	 * @type {Element}
	 */
	root;
	/**
	 * @type {number | undefined}
	 */
	timer;
	
	/**
	 * 
	 * @param {Element} root
	 */
	constructor(root) {
		this.root = root
		
		if (!(this.root instanceof Element)) {
			throw new TypeError('Root element is not defined!')
		}
	}
	moveClass(className, method) {
		const active = this.root.querySelector("." + className);
		
		if(active[method]) {
			active.classList.remove(className);
			active[method].classList.add(className);
			return active;
		}
		return null;
	}
	
	 switchToPrev() {
		const el = this.moveClass("timeLine-chunk-active", "previousElementSibling");
		
		this.moveClass("player-chunk-active", "previousElementSibling");
		if(el) {
			el.querySelector(".timeLine-chunk-inner").style.width = "";
		}
	}
	
	switchToNext() {
		const el = this.moveClass("timeLine-chunk-active", "nextElementSibling");
		this.moveClass("player-chunk-active", "nextElementSibling");
		if(el) {
			el.querySelector(".timeLine-chunk-inner").style.width = "";
		}
	}
	
	runInterval(time, step) {
		clearInterval(this.timer);
		this.timer = setInterval(() => {
			const active = this.root.querySelector(".timeLine-chunk-active").querySelector(".timeLine-chunk-inner");
			let w = parseFloat(active.style.width) || 0;
			if(w === 100 && active) {
				this.switchToNext();
				return;
			}
			active.style.width = String(w + step) + "%";
		}, time * 1000 * step / 100);
	}
}