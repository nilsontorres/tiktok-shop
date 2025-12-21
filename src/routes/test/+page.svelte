<script>
    const fullscreen = () => {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
</script>

<button class="flex items-center justify-center px-[1rem] h-[2.8rem] rounded-full bg-black" type="button" onclick={fullscreen}>
    <span class="text-white text-[0.875rem] font-bold">Tela inteira</span>
</button>