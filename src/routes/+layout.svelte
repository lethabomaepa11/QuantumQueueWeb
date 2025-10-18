<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import { onMount } from 'svelte';
	import { getAllThemes, setTheme } from '$lib/theme_manager';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();

	onMount(() => {
		const theme = localStorage.getItem('selectedTheme') || 'Dracula';
		setTheme(theme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="grid h-screen w-screen overflow-hidden lg:grid-cols-[auto_1fr]">
	<Sidebar />
	<div class="overflow-auto p-4">
		{@render children?.()}
	</div>
</main>
