
export default class BreakPoints {

	constructor() {
		this.mediaQuerySm = '(min-width: 768px)';
		this.mediaQueryMd = '(min-width: 1025px)';
		this.setBreakpoints();
	}

	setBreakpoints() {
		this.mediaQueryListSm = window.matchMedia(this.mediaQuerySm);
		this.mediaQueryListMd = window.matchMedia(this.mediaQueryMd);

		this.isMobile = this.mediaQueryListSm.matches === true ? false : true;
		this.isMediaQueryMd = this.mediaQueryListMd.matches === true ? false : true;

		this.mediaQueryListSm.addEventListener('change', () => {
			this.breakpointChecker();
		});

		this.mediaQueryListMd.addEventListener('change', () => {
			this.breakpointCheckerMd();
		});

	}

	breakpointChecker() {
		if (this.mediaQueryListSm.matches === true) {
			this.isMobile = false;
			this.onDesktop();
		} else if (this.mediaQueryListSm.matches === false) {
			this.isMobile = true;
			this.onMobile();
		}
	};

	breakpointCheckerMd() {
		if (this.mediaQueryListMd.matches === true) {
			this.isMediaQueryMd = false;
			this.onDesktop();
		} else if (this.mediaQueryListMd.matches === false) {
			this.isMediaQueryMd = true;
			this.onMediaQueryMd();
		}
	}

	onMobile() {
		//do something on mobile
	}

	onMediaQueryMd() {
		//do something on mobile
	}

	onDesktop() {
		//do something on desktop
	}
}
