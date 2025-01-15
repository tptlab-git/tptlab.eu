<script lang="ts">
      import { onMount } from 'svelte';
      import { t } from "$lib/translations";
    
      export let data;
      export let vms: number = data.vms;
      export let uptime: number = data.uptime;
      export let memoryUsed: number = data.memUsed;
      export let memoryMax: number = data.memMax;
    
      let vmsDisplay = 0;
      let uptimeDisplay = 0;
      let memoryUsedDisplay = 0;
      let memoryMaxDisplay = 0;

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
        countUp(memoryUsed, (val) => (memoryUsedDisplay = val));
        countUp(memoryMax, (val) => (memoryMaxDisplay = val));
      });
    </script>
    
    <div class="min-h-screen from-[#0a2c46] to-[#0e9758] from-60% bg-gradient-to-b flex items-center justify-center">
      <main class="flex-grow flex flex-col items-center justify-start px-4 py-12">
        <p class="text-xl text-white max-w-2xl text-center my-4">
          <span class="text-[#00adef]">{$t("common.main_question")}</span>
          {$t("common.main_answer")}
        </p>
    
        <div class="flex space-x-8">
          <div class="bg-[#1c3a55] text-white p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold mb-4">{$t("common.online_vmid")}</h3>
            <p class="text-3xl text-white">{vmsDisplay}</p>
          </div>
    
          <div class="bg-[#1c3a55] text-white p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold mb-4">{$t("common.serveri_tooaeg")}</h3>
            <p class="text-3xl">{uptimeDisplay}h</p>
          </div>
    
          <div class="bg-[#1c3a55] text-white p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold mb-4">{$t("common.memory")}</h3>
            <p class="text-3xl text-white">{memoryUsedDisplay}/{memoryMaxDisplay} GB</p>
          </div>
        </div>
      </main>
    </div>
    