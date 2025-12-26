<script>
    import { onMount } from "svelte";

    let { pages=[] } = $props();

    let locked = $state(false);
    let current = $state(0);
    let prevent = $state(0);

    const changePage = (name) => {
        const index = pages.findIndex(page => page.name == name);
        if(pages[index]?.color) document.body.style.backgroundColor = pages[index].color;

        if(index !== -1){
            prevent = current;
            current = index;
        }
    }

    onMount(() => {
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 100);

        const handleResize = () => {
            if (!locked && window.visualViewport.height > window.innerHeight * 0.95) {
                locked = true;
                document.body.style.overflow = "hidden";
            }
        };

        const handleWindowScroll = () => {
            if (window.scrollY > 5 && !locked) {
                locked = true;
                document.body.style.overflow = "hidden";
            }
        };

        window.visualViewport.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleWindowScroll);

        return () => {
            window.visualViewport.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleWindowScroll);
            document.body.style.overflow = "";
        };
    });
</script>

<style>
    :global(.is-unlocking *) {
		flex-shrink: 0;
        overflow: hidden !important;
        touch-action: pan-y !important;
    }
</style>

<div class="w-full h-[120vh] absolute top-0 left-0 -z-10 bg-transparent pointer-events-none"></div>
<div class="fixed top-0 left-0 w-full h-[100dvh] text-black overflow-hidden">
    <div class="grid grid-cols-1 grid-rows-1 w-full h-full">
        {#each pages as page, index}
            <div class={`
                    col-start-1 row-start-1 
                    flex flex-col w-full h-full
                    will-change-transform transition-transform ease-in-out
                    ${index === current || index === prevent ? "duration-300" : "duration-0"} 
                    ${index === current ? "translate-x-0" : index == prevent ? (current > prevent ? "-translate-x-full" : "translate-x-full") : (index < current ? "-translate-x-full" : "translate-x-full")} 
                    ${index === current || index === prevent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}
                    ${index === current && locked ? "overflow-y-auto overscroll-y-contain" : "overflow-hidden"}
                    ${!locked ? "is-unlocking" : ""}
					`}>
                <page.component {...page.props} {changePage}/>
            </div>
        {/each}
    </div>
</div>