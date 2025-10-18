<script lang="ts">
	import { cpuState } from '$lib/features/cpu/cpu.state.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { Table2 } from 'lucide-svelte';

	const handleCellClick = (processId: string | undefined, cellNum: number) => {
		cpuState.addSchedulingStep(processId, cellNum);
	};
</script>

<!-- Visualization area -->
<section class="sidebar-border mt-6 w-full overflow-auto border p-4">
	<h2 class="flex items-center gap-2 text-xl font-bold">
		<Table2 size={20} /> Visualization
	</h2>
	<section class="mt-6">
		<h2 class="text-xl font-bold">Timeline Grid</h2>
		<Table hoverable={true} class="sidebar-border border">
			<TableHead>
				<TableHeadCell class="border p-2">Process ID</TableHeadCell>
				{#each Array(32) as _, i}
					<TableHeadCell class="border p-2">{i + 1}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each cpuState.processes as process}
					<TableBodyRow>
						<TableBodyCell class="border p-2">{process.id}</TableBodyCell>
						{#each Array(32) as _, i}
							<TableBodyCell
								onclick={() => handleCellClick(process.id, i + 1)}
								ondblclick={() => handleCellClick(process.id, i + 1)}
								id={`${process.id}${i + 1}`}
								class="cursor-pointer border p-0 text-center {cpuState.visualizerGrid.get(i + 1) ===
								process.id
									? 'bg-secondary-500'
									: ''}"
							>
								{cpuState.visualizerGrid.get(i + 1) === process.id ? process.id : ''}
							</TableBodyCell>
						{/each}
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</section>
</section>
