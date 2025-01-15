<script lang="ts">
  import { t } from "$lib/translations";
</script>

<div class="min-h-screen from-[#0a2c46] to-[#0e9758] from-60% bg-gradient-to-b flex items-center justify-center">
      <main class="flex flex-col items-center justify-center px-4 py-12">
        <p class="text-xl text-white max-w-2xl text-center my-4">
          {$t("common.teacher_questions")}
          <span class="text-[#00adef]">{$t("common.teacher_span")}</span>
          {$t("common.teacher_main")}
        </p>
        <p class="text-2xl text-[#00adef] max-w-2xl text-center my-4">
          {$t("common.teacher_main_point")}
        </p>
        <div class="flex gap-4 my-4">
          <a href="https://bookstack.local.tptlab.eu" 
             class="font-bold text-xl py-4 px-6 rounded-md
                    bg-gradient-to-br from-[#00adef] to-[#0e9758] 
                    bg-clip-border text-white transition duration-300 ease-in-out 
                    transform hover:scale-105 shadow-2xl">
            {$t("common.juurdepaasu_taotlemine")}
          </a>
        </div>
      </main>
</div>
    