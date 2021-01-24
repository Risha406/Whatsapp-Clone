import React, { useEffect,useState } from 'react';
import './SidebarChat.css';
import {Avatar} from '@material-ui/core';
import db from "./firebase";
import {Link} from "react-router-dom";

function SidebarChat({id, name, addNewChat}) {
    const[seed, setSeed] = useState('');
    const[messages, setMessages] = useState("");

    useEffect(()=> {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
            );
        }
    },[id]);

    const createChat=() =>{
        const roomName= prompt ("Please enter name for chatroom")

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,         // when we click on add new chat we can add rooms
            })
        }
    };

    useEffect(() => {
        setSeed(Math.floor(Math.random() *5000));  //when sidebarchat load it will gen random avatar
    },[])

    return  !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg?background=%230000ff`}/>  
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}.</p>
                </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat


/*random string can generate diff faces*/
//react rooter will help in pagering the link when you click something it will it take you to that page