<script lang="ts">
	export let form;
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
		type="file"
		multiple
		name="images"
		accept="image/png, image/jpeg"
		on:input={(e) => (form.images = Array.from(e.currentTarget.files ?? []))}
	/>
	{#if errors}<span>{errors}</span>{/if}
</div>
