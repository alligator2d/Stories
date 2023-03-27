import {Overlay} from './overlay.js'
export class Text extends Overlay{
	/**
	 * @type {string}
	 */
	text;
	/**
	 * @param params{{
	 * 	   text: string,
	 *	   type: string,
	 *     classes?: string[],
	 *     styles?: Object<string, string>
	 *  }=}
	 *  1. Type - тип создаваемого класса
	 *  2. [classes] - список дополнительных классов
	 *  3. [styles] - список дополнительных стилей
	 */
	 constructor(params) {
		 super(params);
		 this.text = params?.text
		 if (typeof this.text !== 'string') {
			 throw new TypeError('Additional text can be defined only as String')
			 
		 }
	 }
	
	/**
	 * @override
	 */
	render () {
		const el = super.render()
		
		const span = document.createElement('span')
		span.textContent = this.text
		el.appendChild(span)
		return el
	}
}
