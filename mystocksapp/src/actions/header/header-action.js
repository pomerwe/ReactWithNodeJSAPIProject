export const HEADER_ACTION = 'header:action';

export default function headerAction(header){
    return {
        type:HEADER_ACTION,
        payload: {...header}
    }
}