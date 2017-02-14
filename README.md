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

3. `xhr.js` obviously uses XMLHttpRequest to load styles. For earlier loading start recommended to call this function only in `<head>`. `xhr.js` variant loads styles fully async and more faster (if started at `<head>`). But with `<link>` variant you have possibilities to include styles from other hosts without CORS. In IE and Edge `xhr.js` loads styles in parallel unlike `<link>` variants. 
