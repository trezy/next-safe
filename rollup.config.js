// Module imports
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import progress from 'rollup-plugin-progress'
import resolve from '@rollup/plugin-node-resolve'





// Local imports
import pkg from './package.json'





export default [
  {
    input: 'lib/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'default',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      progress(),
      resolve(),
      babel({ exclude: 'node_modules/**' }),
    ],
  },
]
