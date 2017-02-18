/**
 * Load CSS asynchronously without render blocking.
 * This variant uses XMLHttpRequest.
 *
 * For earlier loading start recommended
 * to call this function only in <head>.
 *
 * XHR variant loads styles fully async and more faster,
 * becouse loading starts at <head>. But with <link> variant
 * you have possibilities to include styles from other hosts
 * without CORS.
 */

const $  = document,
	root = $.body || $.getElementsByTagName('head')[0];

let queue = [];

// wait until body is defined before injecting link.
// This ensures a non-blocking load in IE11.
function ready(cb) {

	if ($.body) {
		cb();
		return;
	}

	setTimeout(() => {
		ready(cb);
	});
}

export default function importCSS(href) {

	const style = $.createElement('style');

	let loaded = false;

	queue.push(() => {

		if (loaded) {
			// `insertBefore` is used instead of `appendChild`,
			// for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
			ready(() => {
				root.insertBefore(style, null);
			});
		}

		return loaded;
	});

	const xhr = new XMLHttpRequest();

	xhr.onload = () => {

		style.insertBefore($.createTextNode(xhr.responseText), null);

		loaded = true;

		let prev = true;

		queue = queue.filter(_ =>
			!(prev = prev && _())
		);
	};

	xhr.open('GET', href, true);
	xhr.send(null);
}
