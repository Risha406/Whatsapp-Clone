import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from './SidebarChat';
import db from "./firebase";
import {useStateValue} from "./StateProvider";

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const[{user}, dispatch] = useStateValue();

    useEffect(()=> {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot =>(setRooms(snapshot.docs.map(doc=> ({id:doc.id /*unique id in firebase db */, data: doc.data()}) ))))     //take pictures of the database and   alsoall the changes that are being made
        return ()=> {
            unsubscribe(); //detach it after the user finishes it using
        }       
    }, [])                                               //Run this once when the sidebar loads

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src= {user?.photoURL}/> 
                
                <div className="sidebar__hRight">
                    <IconButton>
                        <DonutLargeIcon/> 
                    </IconButton>

                    <IconButton>
                        <ChatIcon/>
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton> 
                    
                    
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>     {/*Search icon on the left side*/}
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
                
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>  //passed in props
                ))}
                
            </div>
        </div>
    )
}

export default Sidebar


//donutlargeIcon for whatsapp stories
//Chat for chat messages
//orverticon for three dots