import { build } from 'esbuild'
import fg from 'fast-glob'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'

const __dirname = path.resolve()

/**
 * Check if dist dir is present.
 */
fs.existsSync(path.resolve(__dirname, 'dist')) || fs.mkdirSync(path.resolve(__dirname, 'dist'))

/**
 * Clean Output dir.
 */
rimraf.sync(`${path.resolve(__dirname, './dist/')}/*`)

/**
 * Build Custom Elements.
 */
;(async () => {
  let entryPoints = await fg('src/**/*.ts', { ignore: ['**/*.d.ts'] })
  await build({
    entryPoints,
    outdir: path.resolve(__dirname, 'dist'),
    format: 'esm',
    tsconfig: 'tsconfig.json',
  })
})()

/**
 * Copy CSS.
 */
;(async () => {
  let entryPoints = await fg('src/**/*.css')
  await build({
    entryPoints,
    outdir: path.resolve(__dirname, 'dist'),
  })
})()

/**
 * Copy Types.
 */
;(async () => {
  let entryPoints = await fg('src/@types/**/*.d.ts', {
    ignore: ['**/env.d.ts'],
  })
  fs.mkdirSync(path.resolve(__dirname, 'dist/@types'))
  entryPoints.forEach((file) => {
    fs.copyFileSync(
      path.resolve(__dirname, file),
      path.resolve(__dirname, `dist/@types/${path.basename(file)}`)
    )
  })
})()
