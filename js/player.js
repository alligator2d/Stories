import {Overlay} from "./overlays/overlay";

/**
 * @typedef	{Array<{url: string, alt?: string, overlays?: Overlay[]}>}}
 */
const Slides = null;
export class Player{
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
			throw new ReferenceError('A target to mount the player is not specified')
		}
		
		this.slides = params?.slides
		
		if (!Array.isArray(this.slides) === undefined) {
			throw new TypeError('Slides to render is not specified')
		}
	}
	generateTimelineChunks() {
		let temp = '';
		for (const i of this.slides.keys()) {
			temp += `<div class="timeLine-chunk ${i === 0 ? "timeLine-chunk-active" : ""}">
						<div class="timeLine-chunk-inner"></div></div>`;
		}
	}
	
	generatePlayerChunk(slide, isFirst) {
		const style = []
		if (slide.filter) {
			style.push(`filter: ${slide.filter.join(' ')}`)
		}
		return `<div class="player-chunk ${isFirst ? "player-chunk-active" : ""}">
						<img src="${slide.url}" alt="${slide.name || ""}" style="${style.join(';')}">
						${generateOverlays(slide)}</div>`;
	}
	
	generateOverlays(slide) {
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
	 generatePlayerLayout() {
		return `<div class="player"> 
						<div class="timeLine">${timeLineChunks}</div>
						<div class="player-content-wrapper">
						<div class="player-chunk-switcher player-chunk-prev"></div>
						<div class="player-chunk-switcher player-chunk-next"></div>
						<div class="player-content">${playerChunks}</div>
						</div>
						</div>`;
	}
}