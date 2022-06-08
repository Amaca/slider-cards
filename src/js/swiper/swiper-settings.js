export default class SwiperSettings {

	static params = {
		
		carousel: {
			effect: 'cards',
			grabCursor: true,
			cardsEffect: {
				slideShadows: false
			},
			a11y: {
				enabled: true
			},
			pagination: {
				el: '.swiper__counter',
				  type: 'custom',
				  renderCustom: function (swiper, current, total) {
					  return current + ' di ' + (total - 1); 
				  }
			  },
		},
		sliderCarousel: {
			slidesPerView: 3,
			spaceBetween: 40,
			centeredSlides: true,
			grabCursor: true,
			loop: true,
			loopAdditionalSlides: 2,
			a11y: {
				enabled: true
			},
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 40,
				}
			}
		}
	}

	static features = {
		sliderCarousel: {
			mobileVersion: 'carousel'
		}
	}

	static getParams(key) {
		return Object.assign({}, this.params[key]);
	}

	static getFeatures(key) {
		return this.features[key];
	}

	static get(key) {
		return {
			params: this.getParams(key),
			features: this.getFeatures(key),
		}
	}
}
