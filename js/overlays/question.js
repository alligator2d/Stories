import {Overlay} from './overlay.js'
export class Question extends Overlay{
	/**
	 * @type {string}
	 */
	src;
	/**
	 * @type {string}
	 */
	alt;
	/**
	 * @override */
	constructor(params) {
		super(params);
		this.src = params?.src
		if (typeof this.src !== 'string')  {
			throw new TypeError('Additional src can be defined only as String')
		}
		this.alt = params?.alt
	}
	
	/**
	 * @override */
	render () {
		const el = super.render()
		el.innerHTML = `img src="${this.src}" alt='${this.alt}'`
		return el
	}
}
