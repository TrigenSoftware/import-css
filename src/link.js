/**
 * Load CSS asynchronously without render blocking.
 * This variant uses <link> tag.
 *
 * If you want to import multiple styles for "progressive loading"
 * recommended to move all function calls before </body>.
 */

import { document, root } from './lib/globals';
import onBodyReady from './lib/on-body-ready';
import onStyleLoad from './lib/on-style-load';

let queue = [];

window.importCSS = (href, media) => {

	const link = document.createElement('link');

	let loaded = false;

	link.rel = 'stylesheet';
	link.href = href;
	link.media = 'only x'; // temporarily set media to something inapplicable to ensure it'll fetch without blocking render

	queue.push(() => {

		if (loaded) {
			link.media = media || 'all';
		}

		return loaded;
	});

	// `insertBefore` is used instead of `appendChild`,
	// for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
	onBodyReady(() => {
		root.insertBefore(link, null);
	});

	function onLoad() {

		if (link.addEventListener) {
			link.removeEventListener('load', onLoad);
		}

		loaded = true;

		let prev = true;

		queue = queue.filter(_ =>
			!(prev = prev && _())
		);
	}

	// once loaded, set link's media back to `all`
	// so that the stylesheet applies once it loads
	if (link.addEventListener) {
		link.addEventListener('load', onLoad);
	}

	onStyleLoad(link.href, onLoad);
};
