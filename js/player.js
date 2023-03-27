import { Overlay } from "./overlays/overlay.js";
import * as overlays from "./overlays/index.js";

import ClassSwitcher from "./switcher.js";




/**
 *
 * @typedef {{url: string, alt?: string, overlays?: Overlay[]}}}
 */
const Slide = null;
/**
 * @typedef	{Slide[]}
 */
const Slides = null;

export default class Player {
	/**
	 * Контейнер для плеера
	 * @type {Element}
	 */
	target;
	/**
	 * @type {Array}
	 */
	slides;
	/**
	 * @protected
	 */
	cs;
	
	/**
	 *
	 * @param {{ 
	 * target: string,
	 * slides: Slides
	 *     }} params
	 * @returns {Element|null}
	 */
	constructor(params) {
		this.target = document.querySelector(params?.target);
		
		if(this.target === null) {
			throw new ReferenceError("A target to mount the player is not specified");
		}
		
		this.slides = params?.slides;
		
		if(!Array.isArray(this.slides) === undefined) {
			throw new TypeError("Slides to render is not specified");
		}
		this.cs = new ClassSwitcher(this.target)
		
		this.mount()
	}
	mount () {
		this.target.appendChild(this.generatePlayerLayout()) 
		 
		this.target.querySelector(".player-chunk-prev").addEventListener("click", this.cs.switchToPrev.bind(this.cs));
		this.target.querySelector(".player-chunk-next").addEventListener("click", this.cs.switchToNext.bind(this.cs));
		
		this.cs.runInterval(2, 1);
	}
	
	
	/**
	 *
	 * @returns {DocumentFragment}
	 */
	generateTimelineChunks() {
		const wrapper = document.createDocumentFragment();
		
		for (const i of this.slides.keys()) {
			const el = document.createElement("div");
			el.innerHTML = `<div class="timeLine-chunk ${i === 0 ? "timeLine-chunk-active" : ""}">
						<div class="timeLine-chunk-inner"></div></div>`;
			wrapper.appendChild(el.children[0]);
		}
		return wrapper;
	}
	
	/**
	 *
	 * @returns {DocumentFragment}
	 */
	generatePlayerChunks() {
		const wrapper = document.createDocumentFragment();
		
		for (const [i, slide] of this.slides.entries()) {
			const style = [];
			
			if(slide.filter) {
				style.push(`filter: ${slide.filter.join(" ")}`);
			}
			
			const el = document.createElement("div");
			el.innerHTML = `<div class="player-chunk ${i === 0 ? "player-chunk-active" : ""}">
						<img src="${slide.url}" alt="${slide.name ?? ""}" style="${style.join(";")}">
						</div>`;
			const chunk = el.children[0]
			chunk.appendChild(this.generateOverlays(slide))
			wrapper.appendChild(chunk);
		}
		return wrapper;
	}
	
	/**
	 *
	 * @param {Slide} slide
	 * @returns {DocumentFragment}
	 */
	generateOverlays(slide) {
		const wrapper = document.createDocumentFragment();
		
		if(slide.overlays == null) {
			return wrapper;
		}
		for (const params of slide.overlays) {
			if(!(params.type in overlays)) {
				throw new TypeError("The specified type of overlay is not defined");
			}
			const overlay = new overlays[params.type](params);
			wrapper.appendChild(overlay.render());
			
		}
		return wrapper;
	}
	
	/**
	 * 
	 * @returns {Element}
	 */
	generatePlayerLayout() {
		const timeLine = document.createElement("div");
		timeLine.setAttribute("class", "timeLine");
		timeLine.appendChild(this.generateTimelineChunks())
		
		const content = document.createElement("div");
		content.setAttribute("class", "player-content");
		content.appendChild(this.generatePlayerChunks())
		
		
		const contentWrapper = document.createElement("div");
		contentWrapper.setAttribute("class", "player-content-wrapper");
		
		contentWrapper.innerHTML = `<div class="player-chunk-switcher player-chunk-prev"></div>
									<div class="player-chunk-switcher player-chunk-next"></div>`;
		
		contentWrapper.appendChild(content)
		
		const player = document.createElement("div");
		player.setAttribute("class", "player");
		player.appendChild(timeLine)
		player.appendChild(contentWrapper)
		
		return player
	}
}
