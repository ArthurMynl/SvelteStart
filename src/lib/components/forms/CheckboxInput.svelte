<script lang="ts">
	export let value: [] | undefined;;
	export let label: string | undefined = undefined;
    export let errors: string[] | Record<string, unknown> | undefined = undefined;	export let name: string | undefined = undefined;
	export let options: string[] = [];
	export let mandatory = true;
</script>

<div>
	<div class="label">
		<span class="label-text font-semibold">{label} {#if mandatory}*{/if}</span>
	</div>
	<div class="flex flex-row gap-4 flex-wrap w-full">
		{#each options as option, i}
			<label class="flex flex-row items-center justify-center gap-3">
				<input type="checkbox" bind:group={value} {name} class="checkbox" />
				<span>{option}</span>
			</label>
		{/each}
	</div>
	{#if errors}<span class="text-error">{errors}</span>{/if}
</div>


