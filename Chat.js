import React,  { useEffect,useState } from 'react';
import './Chat.css';
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom";
import db from "./firebase";
import { useStateValue } from './StateProvider';
import firebase from "./firebase";



function Chat() {
    const [input, setInput]=useState("");
    const[seed, setSeed] = useState('');
    const {roomId}=useParams();
    const[roomName, setRoomName] = useState("");
    const[messages, setMessages] = useState([]);
    const[{user}, dispatch] = useStateValue();
    

    useEffect(() =>{
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name)     // Pull the data and get the room name
            })

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot =>{
                setMessages(snapshot.docs.map((doc)=> doc.data()))
                
            });
        }
    }, [roomId]) //every time room id changes we will get new messages

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));  //when sidebarchat load it will gen random avatar
    },[roomId])   //roomId will also chnage the avatars when you click it

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >>>',input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,   //comes from google authentication
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),   //if anyone messages from other country we wont incur problems
        });
        setInput(""); // when hit enter it will clear the message
    }

    return (
        <div className="chat">
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg?background=%230000ff`}/>
                
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{""} {new Date(
                        messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/> 
                    </IconButton>

                    <IconButton>
                        <AttachFile/>
                    </IconButton>

                    <IconButton>
                        <MoreVert/>
                    </IconButton> 
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) =>(
                    <p className={`chat__message  ${
                        message.name == user.displayName && 'chat__rec'   //if msg name= users display name then its classify as you 
                       }`}
                    >
                       <span className="chat__name">{message.name}</span> 
                       {message.message}
                       <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}    
            </div>

            <div className='chat__footer'>
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" type="text"/> <button onClick={sendMessage} type="submit">Send a message</button>
                </form>

                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
