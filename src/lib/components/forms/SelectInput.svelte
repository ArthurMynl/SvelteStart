<script lang="ts">
	export let value: string | undefined;
	export let label: string | undefined = undefined;
    export let errors: string[] | Record<string, unknown> | undefined = undefined;	export let placeholder: string | undefined = undefined; // Placeholder is typically not used in select elements
	export let name: string | undefined = undefined;
	export let dropdownOptions: string[] = [];
	export let mandatory = true;
</script>

<div>
	<div class="label">
		<span class="label-text font-semibold">{label} {#if mandatory}*{/if}</span>
	</div>
	<div class="relative w-full">
		<select
			bind:value
			{name}
			class="appearance-none h-12 min-w-72 w-full pl-4 rounded-full border"
			aria-label="Select an option"
		>
			<!-- Dynamically populate options -->
			<option value="" disabled selected>{placeholder}</option>
			{#each dropdownOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
		>
			<!-- Custom Arrow SVG or Unicode Character -->
			<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
				<path
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				/>
			</svg>
		</div>
		{#if errors}<span class="text-error">{errors}</span>{/if}
	</div>
</div>
