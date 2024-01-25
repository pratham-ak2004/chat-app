import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function AddFriend() {

    const [inviteCode, setInviteCode] = React.useState('');
    const [showPopup, setShowPopup] = React.useState(false);
    const [sharePopUp , setSharePopUp] = React.useState(false);
    const navigate = useNavigate();


    const handleInviteSubmit = async(e) => {
        e.preventDefault();

        if(inviteCode === ''){
          return;
        }else if(inviteCode === cookies.get("user-id")){
          alert("You can't add yourself as a friend!");
          return;
        }

        await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/addFriend`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": cookies.get("user-id"),
                "friendsIds": [inviteCode]
            })
        })
        .then((res) => {
          if(res.status === 202){
            alert("Friend added successfully!");
          }
        })

        setInviteCode('');
    }

    const handleCopyButton = (e) => {
      e.preventDefault();

      navigator.clipboard.writeText(cookies.get("user-id"));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }

    const handleShareButton = (e) => {
      e.preventDefault();

      navigator.clipboard.writeText(`I’m inviting you to use Chatify, a simple and secure chat app. Here’s my code ${cookies.get("user-id")} - just enter it after signing in. ${import.meta.env.VITE_FRONTEND_HOST_URL}/invite`);
      setSharePopUp(true);
      setTimeout(() => setSharePopUp(false), 2000);
    }

    const handleHome = (e) => {
      e.preventDefault();

      navigate("/chat");
    }

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div className='w-full h-max max-w-sm m-10 p-6 rounded-md bg-slate-300'>

            <div className='text-3xl text-center text-slate-600 mb-4'>Add Friend</div>
            <input className='flex items-center justify-center gap-5 w-full rounded-md h-10 p-2 bg-slate-200 text-slate-600 outline-none' value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="Enter invite code" />
            <button className="w-full h-10 bg-slate-600 rounded-md mt-4 text-slate-200" onClick={handleInviteSubmit}>Submit</button>

            <div className="my-3">Your invite code</div>
            <div className="flex items-center justify-start gap-5 w-full rounded-md h-10 p-2 bg-slate-200 text-slate-600 outline-none relative">
              <div className="flex-initial truncate">
              {cookies.get("user-id")}
              </div>
            
              <svg className="r-0 ml-auto flex-none relative h-6 w-6 fill-current text-slate-900 hover:text-slate-600 cursor-pointer" onClick={handleCopyButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
              {showPopup && <div className="bg-white text-black p-2 rounded-md r-0 l-auto absolute animate-fade"  style={{"right" : "40px"}}>Copied!</div>}
              {sharePopUp && <div className="bg-white text-black p-2 rounded-md r-0 l-auto absolute animate-fade" style={{"right" : "40px"}}>Message Copied!</div>}
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <button className="w-full h-10 bg-slate-400 rounded-md mt-4 text-slate-900 hover:text-slate-600" onClick={handleHome}>Home</button>
              <button className="w-full h-10 bg-slate-400 rounded-md mt-4" onClick={handleShareButton}><svg className="r-0 mx-auto fill-current text-slate-900 hover:text-slate-600 cursor-pointer" onClick={handleShareButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"/></svg></button>
            </div>
        </div>
    </div>
    <footer className='w-full h-20 flex items-center justify-center bg-slate-100'>
        Made by @pratham-ak2004
    </footer>
    </>
  );
}
