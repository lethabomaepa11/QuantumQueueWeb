<script>
	import SEO from '$lib/components/SEO.svelte';

	let pageRefs = [7, 0, 1, 2, 0, 3, 0, 4];
	let frameCount = 3;

	let memory = Array(frameCount)
		.fill()
		.map(() => Array(pageRefs.length).fill(null));
	let pageFaults = Array(pageRefs.length).fill(false);

	function simulateFIFO() {
		let frames = [];
		let pointer = 0;

		for (let t = 0; t < pageRefs.length; t++) {
			let page = pageRefs[t];

			if (!frames.includes(page)) {
				// Page fault
				pageFaults[t] = true;

				if (frames.length < frameCount) {
					frames.push(page);
				} else {
					frames[pointer] = page;
					pointer = (pointer + 1) % frameCount;
				}
			}

			// Fill memory snapshot at time t
			for (let i = 0; i < frameCount; i++) {
				memory[i][t] = frames[i] ?? '';
			}
		}
	}

	simulateFIFO();
</script>

<SEO
	title="FIFO Page Replacement Simulation"
	description="Visualize the FIFO page replacement algorithm in action."
/>
<table>
	<thead>
		<tr>
			<th>Frame ↓ / Time →</th>
			{#each pageRefs as page, idx}
				<th>{page}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each memory as row, i}
			<tr>
				<td>Frame {i + 1}</td>
				{#each row as cell, j}
					<td class:page-fault={pageFaults[j]}>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
		text-align: center;
	}

	th,
	td {
		border: 1px solid #ccc;
		padding: 8px;
		min-width: 40px;
	}

	.page-fault {
		background-color: #ffdddd;
	}
</style>
