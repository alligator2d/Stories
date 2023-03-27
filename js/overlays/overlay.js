export class Overlay {
	/**
	 * 
	 */
	type;
	/**
	 * Список дoполнительных классов для виджета 
	 * @type {string[]}
	 */
	classes = []
	/**
	 * Словарь дполнительных стилей для виджета
	 * @type {Object<string, string>}
	 */
	styles= {}
	
	/**
	 * Создает новый экземпляр виджета
	 *      @param {{
	 * 	    type: string,
	 * 	    classes?: string[],
	 * 	    styles?: Object<string, string>
	 * 	  }=} [params] - параметры наложения:
	 *     *
	 *     * 1. type - тип создаваемого наложения
	 *     * 2. [classes] - список дополнительных классов
	 *     * 3. [styles] - список дополнительных стилей
	 *     */
	
	constructor(params) {
			this.type = params.type;
			if(typeof this.type !== 'string')  {
				throw new TypeError('Additional types can be defined only as String')
				
			}
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
		
		const temp = `<div class="player-chunk-overlay ${classes}" style="${styles}"></div>`;
		const wrapper = document.createElement('div')
		wrapper.innerHTML = temp
		return wrapper.children[0]
	}
	
}