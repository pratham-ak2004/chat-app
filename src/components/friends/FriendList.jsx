import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate , useLocation } from "react-router-dom";

export default function FriendList() {

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChatSelect = (e) => {
    e.preventDefault();

    navigate("/chat/1");
  }

  React.useEffect(()=>{
    console.log(location.pathname.startsWith("/chat/"),(!location.pathname.endsWith("/chat/")))
  },[])

  return (
    <>
      <div className={`h-auto min-h-screen p-2 md:max-w-lg bg-slate-300 w-full md:basis-1/3 ${location.pathname.startsWith("/chat/")&&(!location.pathname.endsWith("/chat/"))&&isMobile ? "hidden" : ""}`}>
        <div className="gap-3 grid items-start overflow-y-auto pb-20 overflow-x-hidden">
        <div className="flex flex-row items-center bg-slate-100 shadow-xl rounded-lg p-4">
          <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="Profile" />
          <div className="ml-3" onClick={handleChatSelect}>
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">Lorem ipsum</h2>
            <p className="font-thin tracking-tight text-nowrap text-left">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
