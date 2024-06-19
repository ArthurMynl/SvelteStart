/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#FEC887',
					secondary: '#4ade80',
					accent: '#9a7900',
					neutral: '#2F170F',
					'base-100': '#ffffff',
					info: '#00b4ff',
					success: '#00faac',
					warning: '#cd4c00',
					error: '#ff427b'
				}
			}
		]
	}
};

module.exports = config;
