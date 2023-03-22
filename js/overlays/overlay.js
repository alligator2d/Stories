export class Overlay {
	/**
	 * Список дoполнительных классов для виджета 
	 * @type {string[]}
	 */
	classes = []
	/**
	 * Словарь дполнительных стилей для виджета
	 * @type {Object<string, string | string[]>}
	 */
	styles= {}
	
	/**
	 * Создает новый экземпляр виджета
	 * @param params{{
	 *     classes?: string[],
	 *     styles?: Object<string, string>
	 *  }=}
	 */
	constructor(params) {
		
			this.classes = params?.classes ?? this.classes;
			if(!Array.isArray(this.classes)) {
				throw new TypeError('Additional classes can be defined only as Array')
			}
		
			this.styles = params?.styles ?? this.styles;
			if(typeof this.styles !== 'object') {
			throw new TypeError('Additional styles can be defined only as Object')
		}
	}
	
	/**
	 * Рендерит исходный виджет
	 * @returns {Element}
	 */
	render () {
		const classes = this.classes.join(' ')
		
		const styles = Object.entries(this.styles)
		.map((i) => i.join(":"))
		.join(";");
		
		const temp = `<div class="player-chunk-overlay ${this.classes}" style="${this.styles}"></div>`;
		const wrapper = document.createElement('div')
		wrapper.innerHTML = temp
		return wrapper.children[0]
	}
	
}