export const reroute = ({ url }) => {
    const { pathname } = url;

    if(pathname.startsWith("/api/")){
        return pathname;
    }
    else if(pathname == "/cart"){
        return pathname;
    }
    else if(pathname == "/test"){
        return pathname;
    }
    else if(/\/([A-z0-9-]+)/.test(pathname)){
        const slug = pathname.match(/\/([A-z0-9-]+)/)[1];
        return `/product/${slug}`;
    }

    return pathname;
}