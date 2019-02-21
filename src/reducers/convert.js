


export const convertReducer = (state = {}, action) => {

    switch (action.type) {

        case 'DO_CONVERT_ASYNC':{
            console.log(action);
           return {result: action.payload};
        }

        default: return state;

    }
}