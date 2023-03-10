/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { join } = require('node:path')
const { fileURLToPath, pathToFileURL } = require('node:url')
const { readFileSync, writeFileSync, copyFileSync } = require('node:fs')

// Get the URL of the excuting file
const baseURL = pathToFileURL(__filename)

// Read the root package.json
const packagePath = join('..', 'package.json')
const packageURL = fileURLToPath(new URL(packagePath, baseURL))
const packageJson = JSON.parse(readFileSync(packageURL).toString())

// Create truncated package.json for distribution
const distPackagePath = join('..', 'dist', 'package.json')
const distPackageURL = fileURLToPath(new URL(distPackagePath, baseURL))

const distPackageJson = { ...packageJson }
delete distPackageJson.devDependencies
delete distPackageJson.files
delete distPackageJson.scripts
distPackageJson.main = 'index.js'
distPackageJson.types = 'types/index.d.ts'
const distPackageContents = JSON.stringify(distPackageJson, null, '  ')
writeFileSync(distPackageURL, distPackageContents.concat('\n'))

// Copy docs for distribution
const docFiles = [
  'CODE_OF_CONDUCT.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'README.md',
  'SUMMARY.md',
]
docFiles.forEach((docFile) => {
  const docPath = join('..', docFile)
  const docURL = fileURLToPath(new URL(docPath, baseURL))
  const docPackagePath = join('..', 'dist', docFile)
  const docPackageURL = fileURLToPath(new URL(docPackagePath, baseURL))
  copyFileSync(docURL, docPackageURL)
})
