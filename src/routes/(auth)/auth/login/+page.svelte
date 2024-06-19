<script lang="ts">
	export let data;

	import { superForm } from 'sveltekit-superforms';
	import google from '$lib/assets/google.png';
	import logo from '$lib/assets/logo.png';
	import ukFlag from '$lib/assets/uk-flag.png';
	import vulpiFriends from '$lib/assets/vulpi-friends.png';
	import { ArrowRight } from 'lucide-svelte';
	import { createToast } from '$lib/components/Toast.svelte';

	const { form, errors, enhance } = superForm(data.form);
	let passwordVisible = false;

	function togglePasswordVisibility() {
		passwordVisible = !passwordVisible;
	}

	if ($errors._errors && $errors._errors.length > 0) {
		createToast({
			type: 'error',
			title: 'Login failed',
			description: $errors._errors[0]
		});
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div
	class="px-3 md:px-0 bg-white lg:bg-inherit flex flex-col items-center w-full max-h-screen md:overflow-hidden"
>
	<div id="navbar" class="flex w-full">
		<div class="text-lg px-3 py-5 flex w-[50%] items-center bg-white md:px-32 py-8">
			<a href="/" class="flex items-center gap-2 md:text-2xl font-serif font-bold">
				<img src={logo} alt="Logo" class="h-12" />
				Vulpilist
			</a>
		</div>
		<div class="px-3 flex flex-grow justify-end items-center md:px-32 py-8">
			<div class="flex flex-row items-center gap-6">
				<button><img src={ukFlag} alt="Language" class="rounded w-[26px]" /></button>
			</div>
		</div>
	</div>
	<div id="body" class="w-full lg:flex flex-row">
		<div
			class="px-3 w-full flex flex-col items-center gap-8 bg-white lg:w-[50%] self-start md:px-[100px] lg:pt-24 h-[calc(100vh-112px)]"
		>
			<div class="flex flex-col items-center self-start gap-0.5">
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
							class="absolute inset-y-0 right-0 flex items-center px-4 h-full text-md font-semibold"
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
				<a href="/api/oauth/google" class="btn btn-outline rounded-full">
					<img src={google} alt="Google logo" class="w-4 h-4" />
					Google
				</a>
			</div>
			<p class="text-center">
				I don’t have an account yet. <a href="/" class="text-[#076BE1]">Make me one!</a>
			</p>
		</div>
		<div
			class="hidden lg:flex flex-col items-center justify-center gap-8 w-[50%] self-start px-[100px] h-[calc(100vh-112px)]"
		>
			<img src={vulpiFriends} alt="Hero" />
		</div>
	</div>
</div>
