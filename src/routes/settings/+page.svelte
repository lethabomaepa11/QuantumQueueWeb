<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { currentTheme, getAllThemes, setTheme } from '$lib/theme_manager';
	import { Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let themes = $state([]) as any;
	let selectedTheme = $state('');

	onMount(() => {
		themes = getAllThemes();
		selectedTheme = $currentTheme.name;
	});
</script>

<SEO title="Settings" description="Configure your QuantumQueue preferences" />

<h1 class="text-3xl font-extrabold">Settings</h1>
<fieldset class="sidebar-border mt-4 rounded-2xl border p-4">
	<legend class="px-2 text-lg font-semibold">Appearance</legend>
	<p class="mb-2 text-sm">Choose your preferred theme for the application:</p>
	<select
		onchange={(e) => setTheme(selectedTheme)}
		bind:value={selectedTheme}
		class="sidebar-border bg-background w-full rounded border p-2 focus:outline-none"
	>
		{#each themes as theme}
			<option value={theme.name}>{theme.name}</option>
		{/each}
	</select>
</fieldset>
<fieldset class="sidebar-border mt-4 rounded-2xl border p-4">
	<legend class="px-2 text-lg font-semibold">Application</legend>
	<p class="mb-2 text-sm italic">More Settings coming soon...</p>
</fieldset>
