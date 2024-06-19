<script lang="ts">
	import { onMount } from 'svelte';
    
    export let parcelShopCode = '';

	// Function to load a script dynamically
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	onMount(async () => {
		try {
			// Load jQuery first
			await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js');

			// Load Mondial Relay widget script
			await loadScript(
				'https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js'
			);

			// Initialize the widget
			const interval = setInterval(() => {
				if (window.jQuery && window.jQuery.fn.MR_ParcelShopPicker) {
					clearInterval(interval);
					window.jQuery('#Zone_Widget').MR_ParcelShopPicker({
						Target: '#Target_Widget',
						Brand: 'BDTEST  ',
						Country: 'FR',
						PostCode: '',
						NbResults: '15',
						Responsive: true,
						ShowResultsOnMap: true
					});

                    window.jQuery('#Target_Widget').on('change', (event) => {
                        parcelShopCode = event.target.value;
                    });
				}
			}, 100);
		} catch (error) {
			console.error('Error loading scripts:', error);
		}
	});
</script>

<svelte:head>
	<title>Mondial Relay Parcelshop Picker with Map</title>
	<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
</svelte:head>

<div id="Zone_Widget"></div>
<input type="hidden" id="Target_Widget" bind:value={parcelShopCode} name="ParcelShopCode" />

<style>
	#Zone_Widget {
		width: 100%;
		height: 500px; 
	}
</style>
