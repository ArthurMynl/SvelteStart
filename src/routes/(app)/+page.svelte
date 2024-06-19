<script lang="ts">
	import { createToast } from '$lib/components/Toast.svelte';
	import { ArrowRight, Hash, Search, Heart, ChevronDown } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import logo from '$lib/assets/logo.png';
	import hero from '$lib/assets/hero.png';
	import google from '$lib/assets/google.png';
	import ukFlag from '$lib/assets/uk-flag.png';

	export let data;

	const { form, errors, message, enhance } = superForm(data.form);
	const { message: logoutMessage, enhance: logoutEnhance } = superForm(data.logoutForm);
	let passwordVisible = false;
	let userProfilePic = data.profile?.picture ?? undefined;
	let languageDropdownIsOpen = false;
	let loginModal: HTMLDialogElement;

	function toggleLanguageDropdown() {
		languageDropdownIsOpen = !languageDropdownIsOpen;
	}

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'fr', name: 'French' }
	];

	function selectLanguage(languageCode: 'en' | 'fr') {
		// Handle the i18n
		languageDropdownIsOpen = false;
		console.log(languageDropdownIsOpen);
	}

	function togglePasswordVisibility() {
		passwordVisible = !passwordVisible;
	}

	$: {
		if ($message) {
			createToast({
				type: $message.type,
				title: $message.title,
				description: $message.description
			});

			loginModal.close();
		}

		if ($errors._errors && $errors._errors.length > 0) {
			createToast({
				type: 'error',
				title: 'Login failed',
				description: $errors._errors[0]
			});
		}

		if ($logoutMessage) {
			createToast({
				type: $logoutMessage.type,
				title: $logoutMessage.title,
				description: $logoutMessage.description
			});
		}
	}
</script>

<svelte:head>
	<title>Vulpilist - Home</title>
</svelte:head>

<div class="flex flex-col items-center w-full">
	<div id="navbar" class="flex flex-row justify-between items-center w-full px-32 py-8">
		<a href="/" class="flex items-center gap-2 text-2xl font-serif font-bold">
			<img src={logo} alt="Logo" class="h-12" />
			Vulpilist
		</a>
		<div class="flex flex-row gap-4 items-center">
			<select class="select select-ghost w-full max-w-xs font-medium bg-transparent">
				<option disabled selected>Categories</option>
				<option>Shirts</option>
				<option>Suits</option>
				<option>Shoes</option>
			</select>
			<div class="relative">
				<input
					type="text"
					class="h-12 min-w-72 pl-4 rounded-full border"
					placeholder="Search for any garment..."
				/>
				<div class="absolute top-1 right-1">
					<button
						class="btn btn-ghost rounded-full aspect-square p-0 min-h-0 w-10 h-10 hover:bg-[#FCE1B0]"
						><Search /></button
					>
				</div>
			</div>
		</div>
		<div class="flex flex-row items-center gap-6">
			<div class="flex flex-row items-center gap-4">
				{#if !data.profile}
					<button
						class="btn btn-ghost rounded-xl py-4 px-6 font-medium hover:bg-[#FCE1B0]"
						on:click={() => loginModal.showModal()}>Login</button
					>
					<button class="btn btn-primary rounded-xl py-4 px-6 font-medium">Sign Up</button>
				{:else}
					<a
						href="app/wishlist"
						class="btn bg-transparent border-0 hover:bg-[#FCE1B0] shadow-none font-medium rounded-xl px-6"
					>
						Likes <Heart />
					</a>
					<button class="btn btn-primary rounded-xl py-4 px-6 font-medium" type="submit">
						Sell garment
					</button>
					<a
						href="/app/profile"
						class="btn btn-circle p-0 hover:bg-[#FCE1B0] border-0 overflow-hidden"
					>
						<img
							src={userProfilePic
								? `../${userProfilePic}`
								: '/src/lib/assets/profiles/default.png'}
							alt="Profile"
							class="w-full h-full object-cover"
						/>
					</a>
					{data.profile.firstName}
					{data.profile.lastName[0].toUpperCase()}. <ChevronDown size={20} />
				{/if}
			</div>
			<button on:click={toggleLanguageDropdown} class="relative">
				<img src={ukFlag} alt="Language" class="rounded w-[26px]" />
				{#if languageDropdownIsOpen}
					<div class="absolute top-8 left-0 text-left bg-white shadow-lg w-24 rounded-lg">
						{#each languages as { code, name }}
							<button class="btn-ghost w-full rounded-lg" on:click={() => selectLanguage(code)}>
								{name}
							</button>
						{/each}
					</div>
				{/if}
			</button>
		</div>
	</div>
	<div id="content" class="flex flex-col gap-8 w-full px-48">
		<div
			class="badge bg-[#FFE0BA] h-[48px] text-base font-medium flex flex-row gap-[10px] pl-3 py-3 pr-4 border-0"
		>
			<Hash class="bg-[#FEC887] rounded-lg p-1" color="#9E5922" /> Premium quality menswear
		</div>
		<div class="flex flex-col gap-6">
			<h1 class="text-8xl font-serif font-medium text-[#2F170F] leading-[88px]">
				Elevate your wardrobe,<br /> — not your budget.
			</h1>
			<p class="text-2xl text-[#565656] font-light">
				Buy & sell classical menswear and accessories, new or pre-owned.
			</p>
		</div>
		<div class="flex flex-col justify-center">
			<img src={hero} alt="Hero" class="p-0 m-0 w-96 self-center" />
			<div class="relative">
				<input
					type="text"
					placeholder="Start searching for garments..."
					class="w-full rounded-full border-[0.5px] h-[88px] pl-[45px] text-2xl shadow-custom"
				/>
				<div class="absolute top-3 right-3">
					<button
						class="btn btn-primary rounded-full w-16 h-16 flex items-center justify-center p-0"
						><Search size={32} /></button
					>
				</div>
			</div>
		</div>
	</div>
	<dialog id="login_modal" bind:this={loginModal} class="modal">
		<div class="modal-box p-8">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
			</form>
			<div class="flex flex-col items-center justify-center gap-8">
				<div class="flex flex-col items-center gap-0.5">
					<h2 class="text-[40px] font-serif leading-[53px]">Welcome back</h2>
					<p class="text-xl text-[#565656]">Elegance first, second hand.</p>
				</div>
				<form
					id="login-form"
					method="post"
					action="?/loginUser"
					use:enhance
					class="flex flex-col gap-6 w-full"
				>
					<div class="form-control w-full">
						<div class="label">
							<span class="label-text font-semibold">Email</span>
						</div>
						<input
							type="mail"
							bind:value={$form.email}
							name="email"
							placeholder="oscar.wilde@mail.com"
							class="input input-bordered w-full rounded-full"
						/>
					</div>
					<div class="form-control w-full">
						<div class="label">
							<span class="label-text font-semibold">Password</span>
						</div>
						<div class="relative">
							{#if passwordVisible}
								<input
									type="text"
									placeholder="••••••••••"
									name="password"
									bind:value={$form.password}
									class="input input-bordered w-full rounded-full pr-16"
								/>
							{:else}
								<input
									type="password"
									placeholder="••••••••••"
									name="password"
									bind:value={$form.password}
									class="input input-bordered w-full rounded-full pr-16"
								/>
							{/if}
							<button
								type="button"
								on:click={togglePasswordVisibility}
								class="absolute inset-y-0 right-0 flex items-center px-4 h-full text-sm font-semibold"
							>
								{passwordVisible ? 'Hide' : 'Show'}
							</button>
						</div>
						<div class="label mt-1">
							<span class="label-text-alt">
								<a href="/password-reset" class="font-semibold underline">Forgot password?</a>
							</span>
						</div>
					</div>
				</form>
				<button class="btn btn-primary w-full rounded-xl" type="submit" form="login-form"
					>Log in <ArrowRight /></button
				>
				<div class="flex flex-col w-full border-opacity-50">
					<div class="divider font-sans">Or sign in with</div>
					<a href="/api/oauth/google" class="btn btn-outline rounded-full"
						><img src={google} alt="Google logo" class="w-4 h-4" />Google</a
					>
				</div>
				<p>I don’t have an account yet. <a href="/" class="text-[#076BE1]">Make me one!</a></p>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</div>
