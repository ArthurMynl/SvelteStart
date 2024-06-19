<script lang="ts">
	export let value: string | undefined;;
	export let label: string | undefined = undefined;
    export let errors: string[] | Record<string, unknown> | undefined = undefined;	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let mandatory = true;
</script>

<div>
	<div class="label">
		<span class="label-text font-semibold">{label} {#if mandatory}*{/if}</span>
	</div>
	<input
		bind:value
		type="date"
		{name}
		class="h-12 min-w-72 w-full pl-4 pr-4 rounded-full border"
		{placeholder}
	/>
	{#if errors}<span class="text-error">{errors}</span>{/if}
</div>
