<script lang="ts">
	export let value: number | undefined;;
	export let label: string | undefined = undefined;
    export let errors: string[] | Record<string, unknown> | undefined = undefined;	export let name: string | undefined = undefined;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let mandatory = true;

	value = min;
</script>

<div class="flex flex-col gap-4">
	<div class="label">
		<span class="label-text font-semibold">{label} {#if mandatory}*{/if}</span>
	</div>
	<div class="flex flex-row justify-between">
		<div class="flex flex-row gap-2">
			<p>{value} UK</p>
		</div>
		<div class="flex flex-row gap-2">
			<input type="checkbox" class="toggle toggle-primary" /> Label size
		</div>
	</div>
	<!-- Optionally display the current value -->
	<input type="range" bind:value {min} {max} {step} {name} class="" />
	<div class="w-full flex justify-between text-xs px-2 text-[#E1E1E1]">
		{#each Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step) as tick}
			<span>|</span>
		{/each}
	</div>
	{#if errors}<span class="text-error">{errors}</span>{/if}
</div>

<style>
	input[type='range'] {
		/* Applies to WebKit/Blink browsers like Safari and Chrome */
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		background: transparent; /* Required to apply custom styles */
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: #f28d14;
		cursor: pointer; /* Makes the thumb cursor appear as pointer */
		border-radius: 50%; /* Optional: Makes the thumb circular */
		transform: translateY(-8.5px);
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 3px;
		background: #f28d14;
		cursor: pointer;
		border-radius: 1000px;
	}

	/* For Mozilla Firefox */
	input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: #f28d14;
		cursor: pointer;
		border-radius: 1000px;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 3px;
		background: #f28d14;
		cursor: pointer;
	}

	/* For Microsoft Edge */
	input[type='range']::-ms-thumb {
		width: 20px;
		height: 20px;
		background: #f28d14;
		cursor: pointer;
		border-radius: 1000px;
	}

	input[type='range']::-ms-track {
		width: 100%;
		height: 3px;
		background: #f28d14;
		cursor: pointer;
	}
</style>
