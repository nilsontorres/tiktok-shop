<script>
    let { show=false } = $props();
</script>

<div class={`fixed w-full h-full top-0 left-0 bg-black ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
