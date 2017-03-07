[![NPM](https://nodei.co/npm/import-css.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/import-css/)

# import-css

Load CSS asynchronously without render blocking.

# Getting Started

Install with npm
```bash
npm i import-css
```
or
```bash
yarn add import-css
```

# About

`import-css` contains 3 variants of `importCSS` function

1. `link.js` variant uses `<link>` tag. If you want to import multiple styles for "progressive loading" recommended move all function calls before `</body>`.

2. `link-and-body.js` also uses`<link>` tag, but this variant a little lighter than `link.js` because of restricted to use only in `<body>`.

3. `xhr.js` obviously uses XMLHttpRequest to load styles. For earlier loading start recommended to call this function only in `<head>`. `xhr.js` variant loads styles fully async and more faster (if started at `<head>`). But with `<link>` variant you have possibilities to include styles from other hosts without CORS. 

# Examples

critical css
```css
section, footer {
	display: none;
}
```

`section.css`
```css
section {
	display: block;
	color: green;
}
```

`footer.css`
```css
footer {
	display: block;
	color: red;
}
```

`index.html` with `link.js`
```html
<!DOCTYPE html>
<html>
	<head>
		<script>(link.js)</script>
		<style>(critical css)</style>
	</head>
	<body>
		<header>
			<h1>Header</h1>
		</header>
		<section>
			<h1>Section</h1>
		</section>
		<footer>
			<h1>Footer</h1>
		</footer>
		<script>importCSS('section.css')</script>
		<script>importCSS('footer.css')</script>
	</body>
</html>
```

`index.html` with `xhr.js`
```html
<!DOCTYPE html>
<html>
	<head>
		<script>(xhr.js)</script>
		<style>(critical css)</style>
		<script>importCSS('section.css')</script>
		<script>importCSS('footer.css')</script>
	</head>
	<body>
		<header>
			<h1>Header</h1>
		</header>
		<section>
			<h1>Section</h1>
		</section>
		<footer>
			<h1>Footer</h1>
		</footer>
	</body>
</html>
```
