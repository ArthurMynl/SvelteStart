<script lang="ts">
	export let value: string | undefined;;
	export let label: string | undefined = undefined;
    export let errors: string[] | Record<string, unknown> | undefined = undefined;	export let name: string | undefined = undefined;
	export let options: string[] = [];
	export let mandatory = true;
</script>

<div>
	<div class="label">
		<span class="label-text font-semibold">{label} {#if mandatory}*{/if}</span>
	</div>
	<div class="flex flex-row gap-4 flex-wrap w-full">
		{#each options as option, i}
			<label
				class="flex flex-row h-[50px] items-center justify-center gap-3 border-[1px] border-[#E1E1E1] rounded-xl pr-6 py-3 pl-4"
			>
				<input
					type="radio"
					bind:group={value}
					value={option}
					{name}
					class="radio border-[#E1E1E1] text-[#E1E1E1]"
				/>
				<span>{option}</span>
			</label>
		{/each}
	</div>
	{#if errors}<span class="text-error">{errors}</span>{/if}
</div>
