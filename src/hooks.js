export const reroute = ({ url }) => {
    const { pathname } = url;

    if(pathname.startsWith("/api/")){
        return pathname;
    }
    else if(/\/([A-z0-9-]+)/.test(pathname)){
        const slug = pathname.match(/\/([A-z0-9-]+)/)[1];
        console.log(slug);
        return `/product/${slug}`;
    }
    else{
        return pathname;
    }
}