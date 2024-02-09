import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {Client} from "@stomp/stompjs";

const cookies = new Cookies();

export default function Message(props) {
  const navigate = useNavigate();
  const [messages , setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const messageContainerRef = React.useRef(null);

  const stompClient = new Client({
    brokerURL: `${import.meta.env.VITE_WEB_SOCKET_HOST_URL}/api/socket`
  });

  const handleBackButton = (e) => {
    e.preventDefault();

    stompClient.deactivate();
    navigate("/chat");
  }

  const fetchPreviousMessages = async(id) => {
    await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/getChatMessages/${id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res)=>{
        if(res.status === 200){
          const dataPromise = res.json();
          dataPromise.then((data)=>{
            setMessages(data)
          })
        }
      })
    .catch((err)=>{
      console.log(err)
    });
  }

  const handleConnectionWebSocket = () => {

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      stompClient.subscribe(`/chat/${props.target.socket._id}`, (response) => {
        // function which runs on sending message
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
        const sentTime = Math.round(Date.now()/100)

        stompClient.publish({
          destination: `/chatApp/addChat/${props.target.socket._id}`,
          body: JSON.stringify({
            content: newMessage,
            sender: cookies.get("user-id"),
            socketId : props.target.socket._id,
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


  React.useEffect(() => {
    setMessages([])
    if(props.target.socket._id){
      fetchPreviousMessages(props.target.socket._id);
      handleConnectionWebSocket();
    }else{
      navigate("/chat");
    }
  },[props.target.user.userName])

  React.useEffect(() => {
    // Scroll to the bottom when messages change
    if (messageContainerRef !== null && messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);


  
  return (
    <>
      <div className="w-full md:basis-2/3 flex flex-col flex-nowrap justify-between content-center" >

        <div className="w-full h-20 bg-slate-400 shadow-2xl md:h-16">
          <div className="h-full w-full flex flex-row items-center">
          <svg className="mx-3 h-full" onClick={handleBackButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            <img className="w-12 h-12 rounded-full m-1" src={props.target.user.userImg || "https://via.placeholder.com/150"} alt="Profile" />
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">{props.target.user.userName || "Loading..."}</h2>
          </div>
        </div>

        <div ref={messageContainerRef} className="w-full h-full bg-white overflow-y-auto overscroll-contain scroll-smooth">
          {messages.map((message)=>{

            let time = new Date(message.timeStamp*100);// Milliseconds to time
            time = time.toTimeString().split(" ")[0].substring(0,5)

            return (
              <div key={message._id} className={`w-full h-auto my-2 flex flex-col`}>
                <div className={`w-fit rounded-lg p-2 ${message.sender === cookies.get("user-id") ? "ml-auto mr-2 bg-slate-500" : "mr-auto ml-2 bg-slate-300"}`}>
                  {message.content}
                  <div className={`text-xs w-fit mt-1 ${message.sender === cookies.get("user-id") ? "ml-auto right-0 text-slate-300" : "left-0 mr-auto text-slate-600" }`}>
                    {time}
                  </div>
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
