<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>
<svelte:head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat");
    </style>
</svelte:head>

<style>
	:global(body) {
	    font-family: 'Montserrat', sans-serif;
	}
</style>

<header class="flex justify-between items-center bg-[#0a2c46] p-6 fixed w-full">
      <a href="/" class="flex items-center space-x-2">
      <span class="text-[#00adef] text-3xl font-bold tracking-wide"><span class="text-[#0e9758] text-3xl font-mono">>_</span>TPTlab</span>
      </a>
      <nav class="flex space-x-4">
	<a href="/opilasele" class="bg-[#0e9758] text-white font-semibold py-2 px-5 rounded-lg shadow-lg transition hover:bg-[#0c7c49] focus:ring-4 focus:ring-[#0e9758]/50">
	Õpilasele
	</a>
	<a href="/opetajale" class="bg-white text-[#0d3758] font-semibold py-2 px-5 rounded-lg shadow-lg transition hover:bg-gray-200 focus:ring-4 focus:ring-gray-300">
	Õpetajale
	</a>
      </nav>
</header>


{@render children()}
