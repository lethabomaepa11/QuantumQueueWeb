<script>
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from 'flowbite-svelte';
	import { Download } from 'lucide-svelte';
</script>

<SEO title="Home" />
<div class="flex flex-col items-center justify-center space-y-5 p-4">
	<img src="/icons/QuantumQueue2.png" alt="QuantumQueue Logo" width="300" height="300" />

	<h1 class="text-5xl font-extrabold text-primary-500">QuantumQueue</h1>
	<h2 class="text-xl">CPU Scheduling and Page Replacement Algorithm Visualization</h2>
	<p class="">
		Includes customizable settings, such as different themes in the settings.<br />
		Tutorials for all algorithms are in the help section! <br /><br />
		The tutorials includes all the steps needed to complete the algorithms.<br />
		No more having to rely on confusing videos or tutors!
	</p>
	<Button class="space-x-3" href="https://github.com/dianbrown/QuantumQueue/releases"
		><Download /> Download Desktop Version</Button
	>
	<p>
		Based on the <a class="underline" href="https://github.com/dianbrown/QuantumQueue/"
			>QuantumQueue</a
		> project by Dian Brown.
	</p>
</div>
