import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate , useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Friend from "./Friend";

const cookies = new Cookies();

export default function FriendList() {

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [userFriends , setUserFriends] = React.useState();

  const handleChatSelect = (e,target) => {
    e.preventDefault();

    navigate(`/chat/${target}`);
  }

  const handleAddFriend = (e) => {
    e.preventDefault();

    navigate("/addFriend");
  }

  React.useEffect(()=>{
    if(!cookies.get("user-name")){
      navigate("/")
    }
  },[cookies.get("user-name")])

  React.useEffect(()=>{
    setUserFriends(cookies.get("user-friends"));
  },[])

  return (
    <>
      <div className={`h-auto min-h-screen overflow-y-auto p-2 bg-slate-300 w-full md:basis-1/3 ${location.pathname.startsWith("/chat/")&&(!location.pathname.endsWith("/chat/"))&&isMobile ? "hidden" : ""}`}>
        <div className="gap-3 grid items-start overflow-y-auto pb-20 overflow-x-hidden">

        <div className="bg-slate-100 w-full h-24 rounded-lg shadow-xl flex flex-col items-center justify-center font-bold text-xl text-slate-700" onClick={handleAddFriend}> + Add Friend</div>
        
        {userFriends&&userFriends.map((index) => <Friend key={index} handleChatSelect={handleChatSelect} Uid={index}/>)}

        </div>
      </div>
    </>
  );
}
