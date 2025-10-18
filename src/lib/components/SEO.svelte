<script>
	let {
		title,
		keywords = 'cpu scheduling, page replacement, algorithms, operating systems, visualization',
		description = '',
		image = 'https://github.com/dianbrown/QuantumQueue/blob/main/Assets/icons/QuantumQueue2.png?raw=true',
		langs = ['en-ZA', 'en-US']
	} = $props();
</script>

<svelte:head>
	<title>{title} | QuantumQueue</title>
	<meta
		name="description"
		content="{description} Learn about {keywords} with QuantumQueue, an interactive tool for visualizing CPU scheduling and page replacement algorithms."
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={title} />

	<meta name="keywords" content="{keywords}, township, kasi" />
	<meta name="language" content={langs.join(',')} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
	<meta name="robots" content="index, follow" />
</svelte:head>
