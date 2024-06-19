<script lang="ts">
	export let data;

	import { superForm } from 'sveltekit-superforms';
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

<div id="body" class="w-full flex-col items-center justify-center p-32">
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
	<p class="text-center">
		I don’t have an account yet. <a href="/auth/signup" class="text-[#076BE1]">Make me one!</a>
	</p>
</div>
