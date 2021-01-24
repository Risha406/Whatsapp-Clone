import React, {createContext, useContext, useReducer} from "react";

export const StateContext = createContext();    //Preparing the data layer

export const StateProvider = ({ reducer,initialState, children}) => (   //Data layer= StateProvider takes 3 components, Children is ((App))
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}                          
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);   //Pull info from data layer