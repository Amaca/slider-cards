import Dom from './dom';
export default class Page {

	constructor() {}

	init() {
		const body = document.querySelector('body');
		const page = document.querySelector('.page');
		const header = document.querySelector('.header');

		Dom.detect(body);

		this.body = body;
		this.page = page;
		this.header = header;

		this.addListeners();
	}

	addListeners() {
		window.addEventListener('orientationChange', (e) => {
			this.checkDevice(e);
		});
	}

	checkDevice(e) {
		if (!Dom.mobile) {
			return;
		}
		const html = document.querySelector('html');
		const orientation = window.orientation & 2;

		switch (orientation) {
			case 0:
				html.classList.remove('landscape');
				html.classList.add('portrait');
				break;
			case 2:
				html.classList.remove('portrait');
				html.classList.add('landscape');
				break;
		}
	}
}
