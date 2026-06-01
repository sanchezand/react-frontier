const fs = require('fs');
const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const sourceMaps = require('rollup-plugin-sourcemaps');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const pkg = require('./package.json');
const copy = require('rollup-plugin-copy');
const dts = require('rollup-plugin-dts').default;

const iconFonts = [
	['fa-regular-400', 'Font Awesome 6 Free'],
	['fa-brands-400', 'Font Awesome 6 Brands'],
	['fa-solid-900', 'Font Awesome 6 Free'],
].map(([basename])=>{
	const filepath = path.join(__dirname, 'src/style/icons', `${basename}.woff2`);
	const base64 = fs.readFileSync(filepath).toString('base64');
	return {
		basename,
		replacement: `url("data:font/woff2;base64,${base64}") format("woff2")`,
	};
});

function inlineIconFonts() {
	return {
		name: 'inline-icon-fonts',
		generateBundle(_, bundle) {
			for (const file of Object.values(bundle)) {
				if (file.type !== 'chunk') continue;
				for (const font of iconFonts) {
					const pattern = new RegExp(
						`url\\("\\./icons/${font.basename}\\.woff2"\\) format\\("woff2"\\), url\\("\\./icons/${font.basename}\\.ttf"\\) format\\("truetype"\\)`,
						'g'
					);
					file.code = file.code.replace(pattern, font.replacement);
				}
			}
		},
	}
}

module.exports = [
	{
		input: `src/components.ts`,
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
				plugins: [terser()],
				exports: 'auto',
			},
			{
				file: pkg.module,
				format: 'es',
				sourcemap: true,
				plugins: [terser()],
				exports: 'auto',
			},
		],
		watch: {
			include: 'src/**',
		},
		plugins: [
			copy({
				targets: [
					{ src: 'src/locale', dest: 'dist/' },
				],
			}),
			external(),
			postcss({
				modules: true,
			}),
			json(),
			typescript({
				clean: true,
				declaration: true,
				useTsconfigDeclarationDir: true,
				extensions: [".ts", ".tsx"],
				exclude: ['**/__tests__/**', '*.spec.*', '*.test.*'],
				clean: true,
				tsconfigOverride: {
					compilerOptions: {
						module: "ESNext",
						moduleResolution: "node",
						jsx: 'react-jsx',
					}
				}
			}),
			resolve(),
			commonjs(),
			sourceMaps(),
			inlineIconFonts(),
		],
	},
	{
		input: "src/components.ts",
		output: [{
			file: pkg.types, format: 'es'
		}],
		plugins: [
			external(),
			postcss({ modules: true }),
			dts(),
		]
	}
];
