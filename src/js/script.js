const mastheadElem = document.getElementById('masthead');
const mainNavElem = document.getElementById('main-nav');
const mainNavOpenElem = document.getElementById('main-nav-open');
const mainNavCloseElem = document.getElementById('main-nav-close');
const toTopElem = document.getElementById('to-top');

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				toTopElem.style.visibility = 'hidden';
			} else {
				toTopElem.style.visibility = 'visible';
			}
		});
	},
	{ threshold: 0.9 }
);

observer.observe(mastheadElem);

for (const linkElem of mainNavElem.querySelectorAll('a')) {
	linkElem.onclick = function (e) {
		const linkHash = this.hash;

		if (linkHash !== '') {
			e.preventDefault();
			const sectionElem = document.getElementById(linkHash.slice(1));
			sectionElem.scrollIntoView();

			if (mainNavElem.classList.contains('active')) {
				mainNavElem.classList.remove('active');
				document.body.classList.remove('active');
			}
		}
	};
}

mainNavOpenElem.onclick = function () {
	mainNavElem.classList.add('active');
};

mainNavCloseElem.onclick = function () {
	mainNavElem.classList.remove('active');
};

toTopElem.onclick = function () {
	window.scrollTo(window.pageXOffset, 0);
};
