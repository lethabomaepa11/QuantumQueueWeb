<script>
	import SEO from '$lib/components/SEO.svelte';
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import AlgoSelect from './components/AlgoSelect.svelte';
	import { Table2 } from 'lucide-svelte';
	import ProcessInputs from './components/ProcessInputs.svelte';
	import SchedulingVisualizer from './components/SchedulingVisualizer.svelte';

	// Algorithm Select component data
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
