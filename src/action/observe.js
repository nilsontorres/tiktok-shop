export const observe = (el, callback) => {
    const io = new IntersectionObserver(
        (entries) => {
            for (const e of entries) {
                if (e.isIntersecting && e.intersectionRatio > 0.3) {
                    callback(e.target);
                }
            }
        },
        { threshold: 0.3 }
    );

    io.observe(el);

    return {
        destroy() { io.disconnect(); }
    };
}