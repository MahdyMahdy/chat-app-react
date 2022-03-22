import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"; 

function Client(props)
{
    const [socket,setSocket] = useState(props.socket);
    const [name, setName] = useState(props.name);
    const [message_id, setMessage_id] = useState(0);

    function sendMessage() {
        var receiver = document.getElementById("receiver").value;
        var msg = document.getElementById("message").value;
        if(receiver)
        {
            socket.emit("message", { id: message_id, from: name, to:receiver,message:msg});
            document.getElementById("chat").innerHTML += "<label id='sent"+message_id+"'>"+name+": "+msg+"</label><br>";
            setMessage_id(message_id + 1);
            document.getElementById("message").value = "";
            socket.emit("nottyping", { from: name, to: receiver });
        }
    }

    function onChange(){
        var msg = document.getElementById("message").value;
        var receiver = document.getElementById("receiver").value;
        if(msg=="")
        {
            socket.emit("nottyping", { from: name, to: receiver });
            return;
        }
        socket.emit("istyping",{from:name,to:receiver});
    }

    return<div className='d-flex justify-content-center'>
        <div className="d-flex justify-content-center" style={{ backgroundColor: 'gray', height: 500, width: 400,marginTop:100 }}>
            <div className='col'>
                <div className='row' style={{ marginTop: 10 ,marginRight:50,marginLeft:50}}>
                    <input type="text" id="receiver" placeholder='Enter the receiver'></input>
                </div>
                <div className='row' style={{ marginTop: 10, marginRight: 50, marginLeft: 50 }} >
                    <input type="text" id="message" placeholder='Enter your message' onChange={onChange}></input>
                </div>
                <div className='row' style={{ marginTop: 10, marginRight: 50, marginLeft: 50 }}>
                    <button onClick={sendMessage}>SEND</button>
                </div>
                <div className='row' style={{ marginTop: 10, marginRight: 50, marginLeft: 50 }}>
                    <label id='whoistyping'></label>
                </div>
                <div className='row' style={{ marginTop: 10, marginRight: 50, marginLeft: 50 }}>
                    <p id="chat">

                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default Client; 