import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";
import pkg from './package.json'

export default {
  input: './src/exports/index.ts',
  output: [
    {
     file: 'dist/index.cjs.js',
     format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
     }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    terser()
  ],
}