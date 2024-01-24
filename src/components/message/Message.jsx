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

  const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/api/socket'
  });

  const handleBackButton = (e) => {
    e.preventDefault();

    stompClient.deactivate();
    navigate("/chat");
  }

  
  const fetchUserDetails = async (uid) => {
    
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
          .then(()=>{
            stompClient.activate();
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
      stompClient.subscribe(`/chat/${socket}`, (response) => {
          console.log(response);
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

  React.useEffect(() => {
    let delay = 0;
    const timeoutId = setTimeout(() => {
      fetchUserDetails(target);
      delay = 2000
    }, delay);

    return () => clearTimeout(timeoutId);
    },[]);

  
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

        <div className="w-full h-full bg-lime-300">
          {messages.map((message)=>{
            return (
              <div className="w-full h-14 bg-slate-400 shadow-2xl">
                message
              </div>
            )
          }
          )}
        </div>


        <div className="w-full h-14 py-2 px-1 flex items-center">
          <textarea type="text" className="rounded-2xl bg-slate-300 h-full w-full px-2 pt-1 overflow-hidden text-lg text-wrap resize-none focus:outline-none" placeholder="Enter you message"/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 p-1 m-2 fill-slate-700">
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
          </svg>
        </div>

      </div>
    </>
  );
}
