export const reducer = (state, action) => {
    console.log('reducer', {state, action});
    if(action.type === 'user') {
        return action.payload;
    }
    else if (action.type === 'logout') {
        return null;
    }
    return state;
}

export const initialState = null;


