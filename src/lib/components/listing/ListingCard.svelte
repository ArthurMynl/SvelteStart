<script lang="ts">
	import { Heart, HeartOff } from 'lucide-svelte';

	export let title: string | undefined = undefined;
	export let brand: string | undefined = undefined;
	export let image: string | undefined = undefined;
	export let price: number | undefined = undefined;
	export let size: number | undefined = undefined;
	export let id: string | undefined = undefined;
	export let isInWishlist: boolean = false;

	const toggleWishlistAction = async (event: MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		const result = await fetch(`/api/wishlist/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: actionType, listingId: id}),
		});
		const data = await result.json();
		if (data.success) {
			isInWishlist = !isInWishlist;
		}
	};

	$: actionType = isInWishlist ? 'remove' : 'add';
</script>


<a class="flex flex-col gap-3 w-72" href={`./listings/${id}`}>
	<div class="relative">
		<img class="aspect-square object-cover rounded-sm" src={image} alt="Listing" />
	</div>
	<div class="flex flex-row justify-between gap-2 items-start">
		<h3 class="h-[3rem] line-clamp-2">{title}</h3>
		<button on:click={toggleWishlistAction}>
			{#if isInWishlist}
				<HeartOff color="red" />
			{:else}
				<Heart color="red" />
			{/if}
		</button>
	</div>
	<div class="flex flex-row justify-between items-center">
		<div class="flex flex-row gap-2">
			<div class="px-2 py-1 bg-[#FFE0BA] rounded-lg">{size} UK</div>
			<div class="px-2 py-1 bg-[#FFE0BA] rounded-lg">{brand}</div>
		</div>
		<div class="font-semibold">{price}€</div>
	</div>
</a>
