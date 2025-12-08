import { setContext, getContext } from 'svelte';

class PageState {
    name = $state();
    data = $state();

    changePage(name, data){
        this.name = name;
        this.data = data;
    }
}

export const initPageState = () => {
    const state = new PageState();
    setContext("page", state);
    return state;
}

export const usePageState = () => {
    const state = getContext("page");
    return state;
}