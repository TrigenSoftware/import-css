/**
 * Load CSS asynchronously without render blocking.
 * This variant uses <link> tag.
 *
 * If you want to import multiple styles for "progressive loading"
 * recommended to move all function calls before </body>.
 *
 * XHR variant loads styles fully async and more faster,
 * becouse loading starts at <head>. But with <link> variant
 * you have possibilities to include styles from other hosts
 * without CORS.
 *
 * This variant a little lighter than `link.js`.
 * FOR USAGE IN <body> ONLY!
 */

const $    = document,
	root   = $.body || $.getElementsByTagName('head')[0],
	sheets = $.styleSheets;

let queue = [];

// A method (exposed on return object for external use) that mimics onload
// by polling $ument.styleSheets until it includes the new sheet.
function onLoadLinkDefined(resolvedHref, cb) {

	let i = sheets.length;

	while (i--) {
		if (sheets[i].href === resolvedHref) {
			cb();
			return;
		}
	}

	setTimeout(() => {
		onLoadLinkDefined(resolvedHref, cb);
	});
}

export default function importCSS(href, media, async) {

	const link = $.createElement('link');

	let loaded = false;

	link.rel = 'stylesheet';
	link.href = href;
	link.media = 'only x'; // temporarily set media to something inapplicable to ensure it'll fetch without blocking render

	function apply() {

		if (loaded) {
			link.media = media || 'all';
		}

		return loaded;
	}

	if (!async) {
		queue.push(apply);
	}

	// `insertBefore` is used instead of `appendChild`,
	// for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
	root.insertBefore(link, null);

	function onLoad() {

		if (link.addEventListener) {
			link.removeEventListener('load', onLoad);
		}

		loaded = true;

		let prev = true;

		if (async) {
			apply();
		} else {
			queue = queue.filter(_ =>
				!(prev = prev && _())
			);
		}
	}

	// once loaded, set link's media back to `all`
	// so that the stylesheet applies once it loads
	if (link.addEventListener) {
		link.addEventListener('load', onLoad);
	}

	onLoadLinkDefined(link.href, onLoad);
}
