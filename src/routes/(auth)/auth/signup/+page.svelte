<script lang="ts">
	import image from '$lib/assets/vulpi-friends.png';
	import SignupForm from './SignupForm.svelte';

	export let data;
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Sign up</h1>
				<p class="text-balance text-muted-foreground">
					Enter your information below to sign up to Vulpilist
				</p>
			</div>
			<div class="grid gap-4">
				<SignupForm data={data.signupForm} />
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/auth/login" class="underline"> Log in </a>
			</div>
		</div>
	</div>
	<div class="hidden bg-muted lg:block">
		<img
			src={image}
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>