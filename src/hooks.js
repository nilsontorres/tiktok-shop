export const reroute = ({ url }) => {
    const { pathname } = url;

    if(pathname.startsWith("/api/")){
        return pathname;
    }
    else if(pathname.startsWith("/captcha/")){
        return pathname;
    }
    else if(/\/([A-z0-9-]+)/.test(pathname)){
        const slug = pathname.match(/\/([A-z0-9-]+)/)[1];
        return `/product/${slug}`;
    }
    else{
        return pathname;
    }
}