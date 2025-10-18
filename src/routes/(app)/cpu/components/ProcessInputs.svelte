<script lang="ts">
	import type { Process } from '$lib/features/cpu/core';
	import { cpuState } from '$lib/features/cpu/cpu.state.svelte';
	import {
		Button,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		Helper,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (cpuState.processes.length === 0) {
			cpuState.randomizeProcesses(Math.floor(Math.random() * 10) + 1);
		}
	});

	let editingField = $state({
		process: {} as Process,
		field: null as 'arrivalTime' | 'burstTime' | 'priority' | null
	});
</script>

<!-- Process input -->
<section class="sidebar-border mt-5 h-full w-full overflow-auto border p-2">
	<h2 class="text-xl font-bold">Process Input</h2>
	<Table hoverable={true} class="sidebar-border border">
		<TableHead>
			<TableHeadCell class="border p-2">Process ID</TableHeadCell>
			<TableHeadCell class="border p-2">Arrival Time</TableHeadCell>
			<TableHeadCell class="border p-2">Burst Time</TableHeadCell>
			<TableHeadCell class="border p-2">Priority</TableHeadCell>
		</TableHead>
		<TableBody>
			<!-- Process rows will go here -->
			{#each cpuState.processes as process}
				<TableBodyRow>
					<TableBodyCell class="border p-2">{process.id}</TableBodyCell>
					<TableBodyCell
						class="border p-1"
						onclick={() => (editingField = { process, field: 'arrivalTime' })}
						ondblclick={() => (editingField = { process, field: 'arrivalTime' })}
					>
						{#if editingField.process === process && editingField.field === 'arrivalTime'}
							<input
								type="number"
								class="m-0 h-full w-full border-none p-0"
								bind:value={process.arrivalTime}
								max={10}
								maxlength={2}
							/>
						{:else}
							{process.arrivalTime}
						{/if}
					</TableBodyCell>
					<TableBodyCell
						onclick={() => (editingField = { process, field: 'burstTime' })}
						ondblclick={() => (editingField = { process, field: 'burstTime' })}
						class="border p-1"
					>
						{#if editingField.process === process && editingField.field === 'burstTime'}
							<input
								type="number"
								class="m-0 h-full w-full border-none p-1"
								bind:value={process.burstTime}
								max="10"
							/>
						{:else}
							{process.burstTime}
						{/if}
					</TableBodyCell>
					<TableBodyCell
						onclick={() => (editingField = { process, field: 'priority' })}
						ondblclick={() => (editingField = { process, field: 'priority' })}
						class=" border p-1"
					>
						{#if editingField.process === process && editingField.field === 'priority'}
							<input
								type="number"
								class="m-0 h-full w-full border-none p-1"
								bind:value={process.priority}
								max="10"
							/>
						{:else}
							{process.priority}
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<div class="grid grid-cols-2 items-start gap-2 text-sm lg:grid-cols-3">
		<Button class="mt-4" onclick={() => cpuState.addProcess()}>Add</Button>
		<Button class="mt-4 ml-2">Remove</Button>
		<Dropdown simple>
			{#each cpuState.processes as process}
				<DropdownItem color="red" onclick={() => cpuState.removeProcess(process.id)}
					>Remove Process {process.id}
				</DropdownItem>
			{/each}
		</Dropdown>
		<Button class="mt-4 ml-2" onclick={() => cpuState.randomizeProcesses()}>Randomize</Button>
		<Button class="mt-4 ml-2">Check Solution</Button>
		<Button class="mt-4 ml-2">Show Solution</Button>
		<Button class="mt-4 ml-2" onclick={() => cpuState.resetSchedulingSteps()}>Reset</Button>
	</div>
</section>
