<script lang="ts">
	import '../../app.css';
	import { t } from "$lib/translations";
	import { page } from '$app/state';
    import { goto } from '$app/navigation';
	let { children } = $props();	

	let selector = $state();
</script>
<svelte:head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat");
    </style>
    <title>{$t('common.title')}</title>
</svelte:head>

<style>
	:global(body) {
	    font-family: 'Montserrat', sans-serif;
	}
</style>

<header class="flex justify-between items-center bg-[#0a2c46] p-6 fixed w-full">
	<a href="/en" class="flex items-center space-x-2">
	  <span class="text-[#00adef] text-3xl font-bold tracking-wide">
	    <span class="text-[#0e9758] text-3xl font-mono">>_</span>TPTlab
	  </span>
	</a>
	<nav class="flex items-center space-x-4">
	  <a href="https://wiki.tptlab.eu" target="_blank" class="text-[#0e9758] font-semibold py-2 px-3 transition-colors hover:text-[#47da98]">
	    {$t('common.wiki')}
	  </a>
	  <a href="/en/opilasele" class="text-white font-semibold py-2 px-5 rounded-lg shadow-lg bg-[#0e9758] transition hover:bg-[#0c7c49] focus:ring-4 focus:ring-[#0e9758]/50">
	    {$t('common.opilasele')}
	  </a>
	  <a href="/en/opetajale" class="text-[#0d3758] font-semibold py-2 px-5 rounded-lg shadow-lg bg-white transition hover:bg-gray-200 focus:ring-4 focus:ring-gray-300">
	    {$t('common.opetajale')}
	  </a>
	  <select
	    class="text-white bg-[#0a2c46] border border-[#0e9758] rounded-lg pl-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e9758] transition"
	    onchange={() => goto(`/${selector}`)} bind:value={selector}
	  >
	    <option value="en" selected>Eng</option>
	    <option value="et">Est</option>
	  </select>
	</nav>
    </header>
    

{@render children()}
