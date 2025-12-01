export const observe = (el) => {
    const io = new IntersectionObserver(
        (entries) => {
            for (const e of entries) {
                if (e.isIntersecting && e.intersectionRatio > 0.6) {
                    onVisible();
                }
            }
        },
        {
            root: el,
            threshold: 0.6
        }
    );

    io.observe(el);

    return {
        destroy() {
            io.disconnect();
        }
    };
}