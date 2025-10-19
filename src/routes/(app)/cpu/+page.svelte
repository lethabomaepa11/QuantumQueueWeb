<script>
	import SEO from '$lib/components/SEO.svelte';
	import AlgoSelect from './components/AlgoSelect.svelte';
	import ProcessInputs from './components/ProcessInputs.svelte';
	import SchedulingVisualizer from './components/SchedulingVisualizer.svelte';
	import { parseCpuPageState } from '$lib/features/cpu';
	import { onMount } from 'svelte';

	// Algorithm Select component data

	onMount(() => {
		parseCpuPageState();
	});
</script>

<SEO
	title="CPU Scheduling Algorithms"
	description="Explore various CPU scheduling algorithms with interactive visualizations."
/>

<main class="flex h-screen w-full max-w-full flex-col items-start gap-4 lg:flex-row">
	<div>
		<AlgoSelect />
		<ProcessInputs />
	</div>
	<div>
		<SchedulingVisualizer />
	</div>
</main>
