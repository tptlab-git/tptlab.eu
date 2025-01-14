<script lang="ts">
      import { onMount } from 'svelte';
    
      export let vms: number = getRandomNumber(100, 300);
      export let uptime: number = getRandomNumber(200, 500);
      export let traffic: number = getRandomNumber(1, 100);
    
      let vmsDisplay = 0;
      let uptimeDisplay = 0;
      let trafficDisplay = 0;
    
      function getRandomNumber(start: number, end: number): number {
        return Math.floor(Math.random() * (end - start + 1)) + start;
      }
    
      function countUp(target: number, setter: (value: number) => void, duration = 1000) {
        const step = Math.ceil(target / (duration / 16.67)); // ~60fps
        let current = 0;
    
        function update() {
          current += step;
          if (current >= target) {
            setter(target);
          } else {
            setter(current);
            requestAnimationFrame(update);
          }
        }
    
        requestAnimationFrame(update);
      }
    
      onMount(() => {
        countUp(vms, (val) => (vmsDisplay = val));
        countUp(uptime, (val) => (uptimeDisplay = val));
        countUp(traffic, (val) => (trafficDisplay = val));
      });
    </script>
    
    <div class="min-h-screen from-[#0a2c46] to-[#0e9758] from-60% bg-gradient-to-b flex items-center justify-center">
      <main class="flex-grow flex flex-col items-center justify-start px-4 py-12">
        <p class="text-xl text-white max-w-2xl text-center my-4">
          <span class="text-[#00adef]">Mis on KutseLabor/TPTlab?</span>
          KutseLabor on TPT project, mis laseb õpilastel teha enda virtuaal masinaid TPT infrastruktuuri peal. Sealt ei saa keegi kolmas isik seda kustutada ja õpilased saavad ka kodust nendele ligi.
        </p>
    
        <div class="flex space-x-8">
          <div class="bg-[#1c3a55] text-white p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold mb-4">VMs Running</h3>
            <p class="text-3xl text-white">{vmsDisplay}</p>
          </div>
    
          <div class="bg-[#1c3a55] text-white p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold mb-4">Server Uptime</h3>
            <p class="text-3xl">{uptimeDisplay} days</p>
          </div>
    
          <div class="bg-[#1c3a55] text-white p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold mb-4">Network Traffic</h3>
            <p class="text-3xl text-white">{trafficDisplay} TB*</p>
          </div>
        </div>
      </main>
    </div>
    