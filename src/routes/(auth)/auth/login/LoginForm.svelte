<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import { type LoginSchema, loginSchema } from './schema';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { zodClient } from 'sveltekit-superforms/adapters';


    export let data: SuperValidated<Infer<LoginSchema>>;

    const form = superForm(data, {
        validators: zodClient(loginSchema),
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


<form method="POST" use:enhance class="flex flex-col w-full" action="?/loginUser">
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
    <Form.Button class="flex-1">Login</Form.Button>
</form>