<script>
    let isSubmitted = false;

    let { data, form } = $props();
</script>

<div class="min-h-screen from-[#0a2c46] to-[#0e9758] from-60% bg-gradient-to-b flex items-center justify-center">
    <form  class="max-w-2xl w-full mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-4" method="POST">
        <h2 class="text-2xl font-bold text-gray-700">Request Access</h2>

        <div>
            <label class="block text-sm font-medium text-gray-700">Teacher Name</label>
            <input
                name="fullName"
                type="text"
                class="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                required
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">School Email Address</label>
            <input
                name="email"
                type="email"
                class="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                required
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Why do you need access?</label>
            <textarea
                name="accessReason"
                rows="4"
                class="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                required
            ></textarea>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Submit
        </button>

        {#if form?.success}
         <p>Successfully sent the application. The review process takes a few days.</p>
        {/if}
    </form>
</div>
