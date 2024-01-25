import React from "react";
import Cookies from "universal-cookie";
import Profile from "./Profile";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const cookies = new Cookies();

export default function NavBar() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const location = useLocation();

  return (
    <>
      <nav className={`w-full h-20 fixed tracking-wider shadow-md text-left m-auto bg-slate-200 text-slate-800 items-center flex justify-start pl-5 md:pl-0 md:justify-center ${location.pathname.startsWith("/chat/") && isMobile ? "hidden" : ""}`}>
        <label className="text-3xl" style={{"fontFamily": 'Josefin Sans'}} >Chit Chat</label>
        {
          cookies.get("user-name") ? (<><Profile /></>) : (<></>)
        }
      </nav>
    </>
  );
}
