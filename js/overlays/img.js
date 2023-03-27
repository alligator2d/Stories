import {Overlay} from './overlay.js'
export class Image extends Overlay{
	/**
	 * @type {string}
	 */
	src;
	/**
	 * @type {string}
	 */
	alt;
	/**
	 * @override 
	 * 
	 * @param params{{
	 *     src: string, 
	 *     alt?: string,
	 * 	   type: string,
	 *     classes?: string[],
	 *     styles?: Object<string, string>,
	 *  }=}
	 *  1. Type - тип создаваемого класса
	 *  2. [classes] - список дополнительных классов
	 *  3. [styles] - список дополнительных стилей
	 * */
	
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
