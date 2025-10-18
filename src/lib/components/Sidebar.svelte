<script>
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { Cog, Cpu, File, HelpCircle, Home, Menu } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	const pages = [
		{ name: 'Home', icon: Home, href: '/' },
		{ name: 'CPU Scheduling', icon: Cpu, href: '/cpu' },
		{ name: 'Page Replacement', icon: File, href: '/pra' },
		{ name: 'Help', icon: HelpCircle, href: '/help' },
		{ name: 'Settings', icon: Cog, href: '/settings' }
	];

	let isOpenOnMobile = $state(false);
	let isMobile = $state(false);

	onMount(() => {
		isMobile = window.innerWidth < 1024;
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth < 1024;
		});
	});

	const handleMenuClick = () => {
		if (isMobile) {
			isOpenOnMobile = !isOpenOnMobile;
		}
	};

	afterNavigate(() => {
		isOpenOnMobile = false;
	});
</script>

<aside class="relative h-full space-y-2">
	<div class="sidebar-header-bg sidebar-border flex items-center gap-2 border-b p-3">
		<button class="bg-transparent p-2" onclick={handleMenuClick}><Menu /></button>
	</div>

	{#if (isMobile && isOpenOnMobile) || !isMobile}
		<nav transition:scale class="sidebar-bg sidebar text-primary h-full border-r">
			<ul>
				{#each pages.slice(0, 4) as pg}
					<li class="mb-2 p-3 {pg.href === page.url.pathname ? 'sidebar-active' : ''}">
						<a href={pg.href} class="flex items-center gap-2 text-sm font-light"
							><pg.icon /> {pg.name}</a
						>
					</li>
				{/each}
			</ul>
			<ul class="{isMobile ? 'block' : 'absolute'}  bottom-0">
				<li class="mb-2 p-3 {page.url.pathname == '/settings' ? 'sidebar-active' : ''}">
					<a href="/settings" class="flex items-center gap-2"><Cog /> Settings</a>
				</li>
			</ul>
		</nav>
	{/if}
</aside>
