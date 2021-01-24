export const initialState = {
    user: null,     // How the data ayer looks 
};

export const actionTypes= {
    SET_USER: "SET_USER",      // push info in data layer so when we sign in push the user 
};

const reducer = (state, action) =>{
    console.log(action);
    switch(action.type) {
        case actionTypes.SET_USER:            // if u dispatch setuser action
            return {
                ...state,                       // keep all things same just change the user that we have dispatched
                user: action.user,
            };

        default:
            return state;    
    }
};

export default reducer;