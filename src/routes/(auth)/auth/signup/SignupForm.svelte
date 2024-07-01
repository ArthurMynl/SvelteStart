<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import { type SignupSchema, signupSchema } from './schema';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { zodClient } from 'sveltekit-superforms/adapters';


    export let data: SuperValidated<Infer<SignupSchema>>;

    const form = superForm(data, {
        validators: zodClient(signupSchema),
        taintedMessage: null,
        onUpdated: ({ form: f }) => {
            if (f.valid) {
                toast.success(`Informations updated`);
            } else {
                toast.error('Please fix the errors in the form.');
            }
        }
    });

    const { form: formData, enhance } = form;

</script>


<form method="POST" use:enhance class="flex flex-col w-full" action="?/signupUser">
    <Form.Field {form} name="pseudo">
		<Form.Control let:attrs>
			<Form.Label>Pseudo</Form.Label>
			<Input {...attrs} bind:value={$formData.pseudo} />
		</Form.Control>
		<Form.Description>The pseudo associated with your account.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
    <Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>First name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} />
		</Form.Control>
		<Form.Description>Your first name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Last name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} />
		</Form.Control>
		<Form.Description>Your last name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
    <Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} autocomplete="username" bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>The email address associated with your account.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input type="password" autocomplete="current-password" {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.Description>Your password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
    <Form.Field {form} name="passwordConfirmation">
		<Form.Control let:attrs>
			<Form.Label>Password confirmation</Form.Label>
			<Input type="password" autocomplete="current-password" {...attrs} bind:value={$formData.passwordConfirmation} />
		</Form.Control>
		<Form.Description>Confirm your password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
    <Form.Button class="flex-1">Login</Form.Button>
</form>