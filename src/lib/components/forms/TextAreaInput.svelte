<script lang="ts">
	export let value: string | undefined;
	export let label: string | undefined = undefined;
	export let errors: string[] | Record<string, unknown> | undefined = undefined;	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let subtitle: string | undefined = undefined;
	export let rows: number = 8;
	export let mandatory = true;
</script>

<div>
	<div class="label">
		<span class="label-text font-semibold"
			>{label}
			{#if mandatory}*{/if}</span
		>
	</div>
	<textarea bind:value {name} class="min-w-72 w-full p-4 rounded-lg border" {placeholder} {rows} />
	{#if subtitle}
		<div class="label">
			<span class="text-[#9C9C9C] text-sm">{subtitle}</span>
		</div>
	{/if}
	{#if errors}
		<span class="text-error">{errors}</span>
	{/if}
</div>
