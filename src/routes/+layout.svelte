<script>
	import AppSidebar from "$lib/components/AppSidebar.svelte";
	// import AppSidebar from "$lib/components/app-sidebar.svelte";

	import "../app.css";

	let { children } = $props();
</script>

<!-- <Sidebar.Provider> -->
<div class="grid grid-cols-[auto_1fr] overflow-hidden">
	<AppSidebar />

	<div class="h-screen w-full overflow-y-auto">
		{@render children()}
	</div>
</div>
<!-- </Sidebar.Provider> -->
