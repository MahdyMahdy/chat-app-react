import { io } from "socket.io-client";
import './App.css';
import Client from "./Client";

const path = window.location.pathname
const sender = path.substring(1);

const socket = io("http://localhost:8080");
socket.emit("connection",sender);

socket.on("messageTo" + sender, function (data) {
  document.getElementById("chat").innerHTML += "<label id='" + "rec" + data.id + "'>" + data.from + ": " + data.message + "</label><br>";
  socket.emit("ACK", { id: data.id, from: sender, to: data.from });
});

socket.on("ACKTo" + sender, function (data) {
  document.getElementById("sent" + data.id).innerHTML += " (delivered) ";
});

socket.on("typingTo"+sender,(from)=>{
  document.getElementById("whoistyping").innerHTML = from+" is typing";
});

socket.on("stoptyping" + sender, (from) => {
  document.getElementById("whoistyping").innerHTML = "";
});

function App() {
  return (
    <div id="main">
      <Client name={sender} socket={socket}/>
    </div>
  );
}

export default App;
