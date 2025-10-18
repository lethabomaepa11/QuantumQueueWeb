<script>
	import { cpuState } from '$lib/features/cpu/cpu.state.svelte';
	import { cpuSchedulingAlgorithms } from '$lib/features/cpu/models';
	import { Input } from 'flowbite-svelte';
	import { scale, slide } from 'svelte/transition';
</script>

<section>
	<div transition:slide>
		<p>Algorithm:</p>
		<select
			bind:value={cpuState.algorithm}
			class="sidebar-border bg-background w-full rounded border p-2 focus:outline-none lg:w-fit"
		>
			<option value="" disabled selected>Select a CPU Scheduling Algorithm</option>
			{#each cpuSchedulingAlgorithms as algo}
				<option value={algo.value}>{algo.name}</option>
			{/each}
		</select>
	</div>
</section>
