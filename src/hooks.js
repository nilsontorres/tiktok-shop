export const reroute = ({ url }) => {
    const { pathname } = url;

    if(pathname.startsWith("/api/")){
        return url.pathname;
    }
    
    return `/resolve`;
}

