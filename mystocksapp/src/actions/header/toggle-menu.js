export const TOGGLE_MENU = 'header:toggleMenu';

export default function toggleMenu(header){
    return {
        type:TOGGLE_MENU,
        payload: {...header}
    }
}