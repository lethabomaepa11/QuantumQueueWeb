<script>
	import { goto } from '$app/navigation';
	import { cpuState } from '$lib/features/cpu/cpu.state.svelte';

	const algorithms = [
		{ name: 'First-Come, First-Served (FCFS)', value: 'fcfs' },
		{ name: 'First-Come, First-Served with Priority', value: 'fcfs-priority' },
		{ name: 'Shortest Job First (SJF)', value: 'sjf' },
		{ name: 'SJF with Priority', value: 'sjf-priority' },
		{ name: 'SRT (Shortest Remaining Time)', value: 'srt' },
		{ name: 'Round Robin (RR)', value: 'rr' },
		{ name: 'Round Robin with Priority', value: 'rr-priority' }
	];
</script>

<p>Algorithm:</p>
<select
	bind:value={cpuState.algorithm}
	class="sidebar-border bg-background w-full rounded border p-2 focus:outline-none lg:w-fit"
>
	<option value="" disabled selected>Select a CPU Scheduling Algorithm</option>
	{#each algorithms as algo}
		<option value={algo.value}>{algo.name}</option>
	{/each}
</select>
