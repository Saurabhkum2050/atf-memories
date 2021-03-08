window.addEventListener('DOMContentLoaded', () => {
	initApplication();
});

// Init Application
initApplication = () => {
	// Hide Pre-Loader
	const main = document.getElementById('main');
	const preloader = document.getElementById('preloader');
	preloader.classList.remove('d-flex');
	preloader.classList.add('d-none');
	main.classList.remove('d-none');

	// Trigger Dark Mode
	toggleDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

// Fetch Memories
fetch('./assets/json/memories.json')
	.then(response => response.json())
	.then(data => {
		setLogo(data);
		generateMenus(data);
		generateFooter(data);
		generateSitemaps(data);
		generateAlbums(data);
	});

// Set Logo
setLogo = (data) => {
	const logoPath = './assets/img/';
	const fileName = data.companyLogo;
	const link = data.menus.find(m => m.label.toLowerCase() == 'home').link;
	document.getElementById('headerLogo').innerHTML = `<img src='${logoPath + fileName}' alt="Logo">`;
	document.getElementById('headerLogo').href = link;
	document.getElementById('footerLogo').src = logoPath + fileName;

}

// Generate Menus
generateMenus = (data) => {
	const menus = data.menus;
	const menusCount = menus.length;

	if (menusCount > 0) {
		let html = '';
		for (i = 0; i < menusCount; i++) {
			html += `<a class="nav-item nav-link ${menus[i].isActive ? 'active' : ''}" href="${menus[i].link}">
								${menus[i].label}
							</a>`;
		}
		document.getElementById('navbarMenus').innerHTML = html;
	}
}

generateSitemaps = (data) => {
	const menus = data.menus;
	const menusCount = menus.length;

	if (menusCount > 0) {
		let html = '';
		for (i = 0; i < menusCount; i++) {
			html += `<li><a href="${menus[i].link}" class='${menus[i].isActive ? 'active' : ''}'>
								${menus[i].label}
							</a></li>`;
		}
		document.getElementById('sitemaps').innerHTML = html;
	}
}

// Generate Contact
generateFooter = (data) => {
	const copyrightText = data.copyright;
	const contactDetails = data.contactDetails;
	const html = `<li><a href="tel:${contactDetails.contact}">${contactDetails.contact}</a></li>
								<li><a href="mailto:${contactDetails.email}">${contactDetails.email}</a></li>
								<li><a href="#!">${contactDetails.address}</a></li>`;
	document.getElementById('contactDetails').innerHTML = html;
	document.getElementById('companyDescription').innerHTML = contactDetails.description;
	document.getElementById('copyright').innerHTML = copyrightText;
}

// Generate Album Timeline
generateAlbums = (data) => {
	const memories = data.memories;
	const albumsCount = memories.length;
	const albumCoverPath = './assets/img/album-covers/';

	if (albumsCount > 0) {
		let html = '';
		for (i = 0; i < albumsCount; i++) {
			html += `<div class='timeline-item'>
								<div class='timeline-img'></div>
								<div class='timeline-content timeline-card ${(i % 2 == 0) ? 'js--fadeInLeft' : 'js--fadeInRight'}'>
									<div class='timeline-img-header'>
										<img src='${albumCoverPath + memories[i].coverImage}' alt='${memories[i].coverImage}'>
									</div>
									<h2 >${memories[i].title}</h2>
									<div class='date'>${formatDate(memories[i].date)}</div>
									<p>${formatDescription(memories[i].description)}</p>
									<a class='bnt-more' href='#'>More</a>
								</div>
							</div>`;
		}
		document.getElementById('memories-album').innerHTML = html;
		initScrollReveal()
	}
}

// Format Date
formatDate = (albumDate) => {
	const date = new Date(albumDate);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// Format Description
formatDescription = (description) => {
	const maxLength = 140;
	const contentLength = description.length;
	return contentLength > maxLength ? description.substr(0, maxLength).concat('...') : description;
}

// Scroll Animation
initScrollReveal = () => {

	window.sr = ScrollReveal();

	if (window.visualViewport.width < 768) {

		document.querySelectorAll('.timeline-content').forEach(element => {
			if (element.classList.contains('js--fadeInLeft')) {
				element.classList.remove('js--fadeInLeft');
				element.classList.add('js--fadeInRight');
			}
		})

		sr.reveal('.js--fadeInRight', {
			origin: 'right',
			distance: '300px',
			easing: 'ease-in-out',
			duration: 800,
		});

	} else {

		sr.reveal('.js--fadeInLeft', {
			origin: 'left',
			distance: '300px',
			easing: 'ease-in-out',
			duration: 800,
		});

		sr.reveal('.js--fadeInRight', {
			origin: 'right',
			distance: '300px',
			easing: 'ease-in-out',
			duration: 800,
		});

	}

	sr.reveal('.js--fadeInLeft', {
		origin: 'left',
		distance: '300px',
		easing: 'ease-in-out',
		duration: 800,
	});

	sr.reveal('.js--fadeInRight', {
		origin: 'right',
		distance: '300px',
		easing: 'ease-in-out',
		duration: 800,
	});

}

// Dark Mode Detection
const BODY = document.getElementsByTagName('body')[0];
const navbar = document.getElementsByClassName('navbar')[0];
toggleDarkMode = (isDarkModeEnabled) => {
	if (isDarkModeEnabled) {
		BODY.classList.remove('light-theme');
		BODY.classList.add('dark-theme');

		navbar.classList.remove('navbar-light');
		navbar.classList.add('navbar-dark');
	} else {
		BODY.classList.remove('dark-theme');
		BODY.classList.add('light-theme');

		navbar.classList.remove('navbar-dark');
		navbar.classList.add('navbar-light');
	}
}

window.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', event => toggleDarkMode(event.matches));

// Prevent copy paste
// document.onkeydown = (e) => {
// 	return !(e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117));
// };