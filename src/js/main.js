import Page from './shared/page.js';
import SwiperSlider from './swiper/swiper-slider.js';
import Carousel from './components/carousel.js'

export default class Main extends Page {

	constructor(el) {
		super(el);
		this.init();

		SwiperSlider.init();
		Carousel.init();
	}
}

window.onload = () => {
	const main = new Main();
};