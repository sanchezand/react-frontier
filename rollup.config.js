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
					{ src: 'src/style/icons', dest: 'dist/style' },
				]
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
				},
			}),
			resolve(),
			commonjs(),
			sourceMaps(),
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
