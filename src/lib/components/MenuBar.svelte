<script>
	export let items = [
		{ title: 'Account', active: true },
		{ title: 'Billing', active: false },
		{ title: 'Notification', active: false }
	];
</script>

<div class="flex flex-col lg:flex-row gap-8 lg:gap-[72px]">
	<div class="flex flex-col gap-2">
		<div class="flex flex-row lg:flex-col gap-2 lg:px-0 justify-between sm:justify-start">
			{#each items as { title, active }}
				<div class="flex items-center flex-col lg:flex-row">
					<span
						class={`hidden ${
							active ? 'lg:block' : ''
						} border-[#FAAE52] border-2 mr-2 h-3 rounded-full leading-6`}
					/>
					<div class="text-xl lg:text-base px-4 lg:px-0">{title}</div>
					<hr
						class={`${
							active ? '' : 'hidden'
						} lg:hidden w-full border-[1px] rounded-full border-[#FAAE52] translate-y-[10px]`}
					/>
				</div>
			{/each}
		</div>
		<div class="lg:hidden">
			<hr class="w-full border-[1px] rounded-full border-[#E3E3E3]" />
		</div>
	</div>
</div>
