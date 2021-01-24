import React, { useEffect, useState } from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useStateValue} from "./StateProvider";

function App() {
  const [{user}, dispatch] = useStateValue();    //Pulling the user from data layer action got dispatched

  return(
    <div className="app"> 
      {!user ?(
        <Login/>
      ): (
          <div className="app__body">
            <Router> 
              
              <Sidebar/>      {/*Sidebar */}
              
              <Switch>
                <Route path="/rooms/:roomId">    
                  <Chat/>           {/*Chat*/}
                </Route>

              
                <Route path="/">
                  <Chat/>
                </Route>

              </Switch>
            </Router>   
          </div>
        )}
    </div>
  );
}

export default App;


/* ROUTER-- to look at the urls */