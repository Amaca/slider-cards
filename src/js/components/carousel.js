import { gsap } from "gsap";
import BreakPoints from "../shared/breakpoints";
import CarouselNav from "./carousel.nav";

export default class Carousel extends BreakPoints {

	constructor(node) {
		super();
		this.node = node;
		this.wrapper = this.node.querySelector('.swiper-wrapper');
		const attribute = this.node.getAttribute('data-carousel');
		
		this.settings = {
			speed: 0.8,
			scale: 0.87,
			easing: "expo.out",
			defaultItem: attribute ? attribute : 1,
			nav: true
		}

		this.init();
	}

	init() {
		if (this.isMediaQueryMd === false) {
			this.items = this.getItems();
			this.setView();
			this.addListeners();
			this.node.classList.add('carousel');
			this.node.classList.remove('carousel--mobile');
		} else {
			this.node.classList.remove('carousel');
			this.node.classList.add('carousel--mobile');
		}
	}

	onMediaQueryMd() {
		this.destroy();
		this.node.classList.remove('carousel');
		this.node.classList.add('carousel--mobile');
	}

	onDesktop() {
		this.node.classList.add('carousel');
		this.node.classList.remove('carousel--mobile');
		this.init();
	}

	destroy() {
		if (this.items && this.items !== null) {
			this.items.forEach((item, i) => {
				const card = item.querySelector('.carousel__card');
				const caption = item.querySelector('figcaption');
				item.style.transform =  'none';
				card.style.width = '100%';
				card.style.left = 'auto';
				caption.style.width = 'auto';
				caption.style.minWidth = 'none';
				item.removeEventListener('mouseenter', this.onOver.bind(this))
			})
			this.items = null;
		}
		if (this.wrapper) {
			this.wrapper.style.transform = 'none';
		}
		if(this.settings.nav && this.nav && this.nav !== null) {
			this.nav.off('carouselNavClick');
			this.nav.nav.innerHTML  = '';
			this.nav = null;
		}
	}

	getItems() {
		return Array.from(this.node.querySelectorAll('[data-carousel-item]'));
	}

	setView() {
		
		switch (this.items.length) {
			case 3:
				this.settings.nextPrevWidth = `calc(100% + 70px)`;
				this.settings.nextPrevLeft = "-35px";
				this.settings.cardWidth = `calc(100% + ${this.items[0].clientWidth / 2}px)`;
				this.settings.cardleft = -(this.items[0].clientWidth / 2) / 2 + 'px';
				break;
			case 4:
				this.settings.nextPrevWidth = `calc(100% + 90px)`;
				this.settings.nextPrevLeft = "-45px";
				this.settings.cardWidth = `calc(100% + ${this.items[0].clientWidth / 2}px)`;
				this.settings.cardleft = -(this.items[0].clientWidth / 2) / 2 + 'px';
				break;
			case 5:
				this.settings.nextPrevWidth = `calc(100% + 100px)`;
				this.settings.nextPrevLeft = "-50px";
				this.settings.cardWidth = `calc(100% + ${this.items[0].clientWidth / 2}px)`;
				this.settings.cardleft = -(this.items[0].clientWidth / 2) / 2 + 'px';
				break;
			default:
				this.settings.nextPrevWidth = `calc(100% + 120px)`;
				this.settings.nextPrevLeft = "-60px";
				this.settings.cardWidth = `calc(100% + ${this.items[0].clientWidth}px)`;
				this.settings.cardleft = -(this.items[0].clientWidth / 2) + 'px';
		}

		this.items.forEach(item => {
			
			gsap.to(item, {
				scale: this.settings.scale,
				duration: this.settings.speed,
				ease: this.settings.easing
			});

			const card = item.querySelector('.carousel__card');
			const caption = item.querySelector('figcaption');
			
			this.setCardPos(card, item);
			this.setCaptionPos(caption, card);

			//init minwidth to prevent caption auto width on hover;
			caption.style.minWidth = `${card.clientWidth}px`;
		})

		if(this.settings.nav) {
			this.nav = new CarouselNav(this.node, this.items);
			this.nav.on('carouselNavClick', (index) => {
				this.onOver(this.items[index]);
			})
		}

		this.onOver(this.items[this.settings.defaultItem]);
	}

	addListeners() {
		this.items.forEach((item, i) => {
			item.addEventListener('mouseenter', this.onOver.bind(this))
		})
	}

	setCardPos(card, parent, pos) {
		if(!card || !parent) {
			return;
		}
		switch (pos) {
			case 'prev':
				card.style.width = this.settings.nextPrevWidth;
				card.style.left = this.settings.nextPrevLeft;
				break;
			case 'next':
				card.style.width = this.settings.nextPrevWidth;
				card.style.left = this.settings.nextPrevLeft;
				break;
			default:
				card.style.width = this.settings.cardWidth;
				card.style.left = this.settings.cardleft;
		}
	}

	setCaptionPos(caption, card, pos) {
		if(!caption || !card) {
			return;
		}
		switch (pos) {
			case 'prev':
				caption.style.left = "0px";
				caption.style.right = "auto";
				break;
			case 'next':
				caption.style.left = "auto";
				caption.style.right = "0px";
				break;
			default:
				caption.style.left = "0px";
				caption.style.right = "auto";
			
		}
	}

	//horizontal wrapper movement aligned to active element
	setWrapperPos(item) {

		const rect = item.getBoundingClientRect();
		gsap.to(this.wrapper, {
			x: (
				((this.wrapper.clientWidth / 2) - rect.left + item.clientWidth) * 0.08
			),
			duration: this.settings.speed,
			ease: this.settings.easing
		})
	}

	onOver(e) {
		if (!this.items) {
			return;
		}

		const el = !e.currentTarget ? e : e.currentTarget;
		const currentId = this.items.indexOf(el);
		const totalLenght = this.items.length;

		let nextvalue = totalLenght - currentId - 1;
		let nextDifference = (1 - this.settings.scale) / nextvalue;
		let prevDifference = (1 - this.settings.scale) / currentId;
		
		let counter = 1;

		if (currentId === 1) { //first one
			prevDifference = nextDifference;
		}

		if (currentId === totalLenght - 2) { //second last
			nextDifference = prevDifference;
		}

		this.items.forEach((item, i) => { 
			const card = item.querySelector('.carousel__card');
			const caption = item.querySelector('figcaption');

			if(i < currentId) { //previous elements

				const percent = currentId === 1 ? nextvalue - 1 : i;
				gsap.to(item, {
					scale: this.settings.scale + (prevDifference * percent),
					duration: this.settings.speed,
					ease: this.settings.easing
				});
				
				this.setCardPos(card, item, 'prev');
				this.setCaptionPos(caption, card, 'prev');

				item.classList.remove('active');
				item.style.zIndex = i;

			} else if (i === currentId) { //active element
				
				gsap.to(item, {
					scale: 1.0,
					duration: this.settings.speed,
					ease: this.settings.easing
				});

				this.setWrapperPos(item);
				this.setCardPos(card, item);
				this.setCaptionPos(caption, card);

				item.classList.add('active');
				item.style.zIndex = totalLenght;

				if(this.settings.nav) {
					this.nav.buttons.forEach((button) => {
						button.classList.remove('active');
					})
					this.nav.buttons[i].classList.add('active');
				}

			} else if (i > currentId) { //next elements

				gsap.to(item, {
					scale: 1 - (nextDifference * counter),
					duration: this.settings.speed,
					ease: this.settings.easing
				});

				this.setCardPos(card, item, 'next');
				this.setCaptionPos(caption, card, 'next');

				item.classList.remove('active');
				item.style.zIndex = totalLenght - counter;
				counter++
			}
		})

	}

	static init() {	
		Carousel.item = Array.from(document.querySelectorAll('[data-carousel]')).map((node, index) => new Carousel(node, index));
	}
}
