import EventEmitter from "../shared/EventEmitter.js";

export default class CarouselNav extends EventEmitter {

	constructor(node, items) {
		super();
		this.node = node;
		this.items = items;
		this.nav = node.querySelector('[data-carousel-nav]');

		this.setView();
		this.addListener();
	}

	setView() {
		let html = ``;
		this.items.forEach(item => {
			html += `
			<button class="carousel__nav-item">
				${item.getAttribute('data-carousel-item')}
			</button>
			`
		});
		this.nav.innerHTML = html;
	}

	getButtons() {
		return Array.from(this.nav.querySelectorAll('.carousel__nav-item'));
	}

	addListener() {
		this.buttons = this.getButtons();
		this.buttons.forEach((button, index) => {
			button.addEventListener('click', (e) => {
				const current = e.currentTarget;
				this.setActive(current);
				this.trigger('carouselNavClick', [index]);
			});
		})
	}

	setActive(current) {
		this.buttons.forEach((button) => {
			button.classList.remove('active');
		})
		current.classList.add('active');
	}
}

