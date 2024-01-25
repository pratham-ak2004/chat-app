import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {Client} from "@stomp/stompjs";

const cookies = new Cookies();

export default function Message() {
  const [target , setTarget] = React.useState(useParams().target);
  const [user , setUser] = React.useState({});
  const navigate = useNavigate();
  const [socket , setSocket] = React.useState(undefined);
  const [messages , setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");

  const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/api/socket'
  });

  const handleBackButton = (e) => {
    e.preventDefault();

    stompClient.deactivate();
    navigate("/chat");
  }

  
  const fetchUserDetails = async (uid) => {
    63
    const valueToSend = [cookies.get("user-id"),target].sort();

    await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/getUserDetailsWithSocket/${uid}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "participants" : valueToSend
      })
      })
      .then((res)=>{
        if(res.status === 200){
          res.json().then((data)=>{
            setUser(data.user)
            setSocket(data.socket._id)
          })
        }
      })
    .catch((err)=>{
      console.log(err)
    });
  }

  const fetchPreviousMessages =  () => {
    // to do
    console.log("fetching messages")
  }

  const handleConnectionWebSocket = () => {

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe(`/chat/${socket}`, (response) => {
        // function which runs on sending message
          console.log(response);
          const newMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };

    stompClient.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    //function to send message
    const sendMessage = () => {
      if (newMessage.trim() !== "") {
        console.log("sending message")
        const sentTime = Math.round(Date.now()/100)
        stompClient.publish({
          destination: `/chatApp/addChat/${socket}`,
          body: JSON.stringify({
            content: newMessage,
            sender: cookies.get("user-id"),
            socketId : socket,
            timeStamp : sentTime
          })
        });
        setNewMessage("")
      }
    };
  
    if (!stompClient.connected) {
      stompClient.onConnect = () => {
        sendMessage();
      };
      stompClient.activate();
    } else {
      sendMessage();
    }
  };

  // UseEffects for initial fetchs
 React.useEffect(() => {
    fetchUserDetails(target);
 },[])

 React.useEffect(() => {
  if (socket) {
    handleConnectionWebSocket();
  }
}, [socket]);

  
  return (
    <>
      <div className="w-full md:basis-2/3 flex flex-col flex-nowrap justify-between content-center" >

        <div className="w-full h-14 bg-slate-400 shadow-2xl">
          <div className="h-full w-full flex flex-row items-center">
          <svg className="mx-3 h-full" onClick={handleBackButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            <img className="w-12 h-12 rounded-full m-1" src={user.userImg || "https://via.placeholder.com/150"} alt="Profile" />
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">{user.userName || "Loading..."}</h2>
          </div>
        </div>

        <div className="w-full h-full bg-white">
          {messages.map((message)=>{

            let time = new Date(message.timeStamp);// Milliseconds to time
            time = time.toTimeString().split(" ")[0].substring(0,5)

            return (
              <div key={message._id} className={`w-fit flex flex-col my-2 h-auto bg-slate-300 shadow-
              xl rounded-3xl p-3 text-wrap ${message.sender === cookies.get("user-id") ? "ml-auto mr-2" : "ml-2 mr-auto" }`}>
                <div className={`text-slate-400 text-xs w-fit ${message.sender === cookies.get("user-id") ? "ml-auto right-0" : "left-0 mr-auto" }`}>
                  {message.sender === cookies.get("user-id") ? "You" : user.userName}
                </div>
                {message.content}
                <div className={`text-slate-400 text-xs w-fit ${message.sender === cookies.get("user-id") ? "ml-auto right-0" : "left-0 mr-auto" }`}>
                  {time}
                </div>
              </div>
            )
          }
          )}
        </div>

        <div className="w-full h-14 py-2 px-1 flex items-center">
          <textarea type="text" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="rounded-2xl bg-slate-300 h-full w-full px-2 pt-1 overflow-hidden text-lg text-wrap resize-none focus:outline-none" placeholder="Enter you message"
          onKeyDown={
            (e) => {
              if(e.key === 'Enter'){
                handleSendMessage(e);
              }
            }
          }
          />
          <svg onClick={handleSendMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 p-1 m-2 fill-slate-700">
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
          </svg>
        </div>

      </div>
    </>
  );
}
