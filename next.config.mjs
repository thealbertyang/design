/** @type {import('next').NextConfig} */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const nextConfig = {
	sassOptions: {
		compiler: 'modern',
		silenceDeprecations: ['legacy-js-api'],
	},
	outputFileTracingRoot: path.join(__dirname, '../../'),
}

export default nextConfig
