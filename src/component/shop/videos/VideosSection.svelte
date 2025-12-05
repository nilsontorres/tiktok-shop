<script>
    import VideoItem from "$component/shop/videos/VideoItem.svelte";

    let { videos=[] } = $props();
</script>

<button type="button" class="flex flex-col py-[1.1rem] bg-white">
    <div class="flex justify-between items-center px-4">
        <span class="text-black text-[0.93rem] font-semibold leading-none">Vídeos de criadores ({videos?.length})</span>
    </div>
    <div class="flex w-full overflow-hidden items-center mt-[1rem]">
        <div class="flex w-full items-center relative">
            <div class="flex overflow-x-auto relative no-selectable no-scrollbar">
                <ul class="flex items-center gap-[0.5rem]">
                    <li class="flex w-[0.5rem]"></li>
                    {#each videos as video, index}
                        <VideoItem {video}/>
                    {/each}
                    <li class="flex w-[0.5rem]"></li>
                </ul>
            </div>
        </div>
    </div>
</button>