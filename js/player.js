import { Overlay } from "./overlays/overlay";
import * as overlays from "./overlays/index";

/**
 *
 * @typedef {{url: string, alt?: string, overlays?: Overlay[]}}}
 */
const Slide = null;
/**
 * @typedef	{Slide[]}
 */
const Slides = null;

export class Player {
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
	generatePlayerChunk() {
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
			wrapper.appendChild(el);
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
		// let res = "";
		for (const params of slide.overlays) {
			if(!(params.type in overlays)) {
				throw new TypeError("The specified type of overlay is not defined");
			}
			const overlay = new overlays[params.type](params);
			wrapper.appendChild(overlay.render());
			
			// const classes = el.classes !== undefined ? el.classes.join(' ') : ''
			//
			// const styles = (el.styles !== undefined ? Object.entries(el.styles) : [])
			// .map((i) => i.join(":"))
			// .join(";");
			//
			// res += `<div class="player-chunk-overlay ${classes}" style="${styles}">${renderOverlay(params)}</div>`;
		}
		return wrapper;
		// function renderOverlay (overlay) {
		// 	if (overlay.type === 'text') {
		// 		return overlay.value
		// 	}
		// 	if (overlay.type === 'img'){
		// 		return `img src="${overlay.value}" alt=''`
		// 	}
		// 	return ''
		// }
	}
	
	generatePlayerLayout() {
		const timeLine = document.createElement("div");
		timeLine.setAttribute("class", "timeLine");
		timeLine.appendChild(this.generateTimelineChunks())
		
		
		const contentWrapper = document.createElement("div");
		contentWrapper.setAttribute("class", "player-content-wrapper");
		
		contentWrapper.innerHTML = `<div class="player-chunk-switcher player-chunk-prev"></div>
						<div class="player-chunk-switcher player-chunk-next"></div>`;
		
		const content = document.createElement("div");
		content.setAttribute("class", "player-content");
		
		const player = document.createElement("div");
		player.setAttribute("class", "player");
		
		player.innerHTML = `<div class="player"> 
						<div class="timeLine">${timeLineChunks}</div>
						<div class="player-content-wrapper">
						<div class="player-chunk-switcher player-chunk-prev"></div>
						<div class="player-chunk-switcher player-chunk-next"></div>
						<div class="player-content">${playerChunks}</div>
						</div>
						</div>`;
	}
}
