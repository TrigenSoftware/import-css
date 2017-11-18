import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import eslint from 'rollup-plugin-eslint';
import pkg from './package.json';

const plugins = [
	eslint({
		exclude:      ['**/*.json', 'node_modules/**'],
		throwOnError: process.env.ROLLUP_WATCH != 'true'
	}),
	babel(Object.assign({
		runtimeHelpers: true,
		babelrc:        false,
		exclude:        'node_modules/**'
	}, pkg.babel, {
		presets: pkg.babel.presets.map((preset) => {

			if (Array.isArray(preset) && preset[0] == 'env') {
				preset[1].modules = false;
			}

			return preset
		})
	})),
	resolve({
		browser:        true,
		preferBuiltins: false
	}),
	commonjs(),
	minify()
];

const entries = [
	'link-async',
	'link-in-body-async',
	'link-in-body',
	'link'
];

export default entries.map(entry => ({
	input:  `src/${entry}.js`,
	plugins,
	output: {
		file:      `lib/${entry}.js`,
		format:    'iife',
		sourcemap: true
	}
}));
