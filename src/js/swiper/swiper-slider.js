import Swiper, { Navigation, Pagination, Autoplay, EffectCards, A11y } from 'swiper';
import BreakPoints from '../shared/breakpoints';
import SwiperSettings from './swiper-settings';

export default class SwiperSlider extends BreakPoints {

	constructor(node) {
		super();
		this.node = node;
		this.id = this.node.dataset.swiperId;
		this.type = this.node.dataset.swiperSlider;
		this.params = SwiperSettings.getParams(this.type);
		this.features = SwiperSettings.getFeatures(this.type);
		
		this.init();
	}

	init() {
		const params = this.features.mobileVersion && this.isMobile === true 
					 ? this.features.mobileVersion
					 : this.type;

		if(this.type === 'sliderCarousel' && this.isMediaQueryMd === false) {
			return;	
		}

		this.params = SwiperSettings.getParams(params)

		Swiper.use([Navigation, Pagination, Autoplay, EffectCards, A11y]);
		this.swiper = new Swiper(this.node, this.params);
	}

	onMobile() {
		this.onDestroy();
		this.init();
	}

	onMediaQueryMd() {
		this.onDestroy();
		this.init();
	}

	onDesktop() {
		this.onDestroy();
		this.init();
	}

	onDestroy() {
		if (this.swiper !== undefined) {
			this.swiper.destroy(true, true);
		}
	}

	static init() {
		SwiperSlider.item = Array.from(document.querySelectorAll('[data-swiper-slider]')).map((node, index) => new SwiperSlider(node, index));
	}
}
