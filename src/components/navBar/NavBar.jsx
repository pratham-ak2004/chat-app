import React from "react";
import Cookies from "universal-cookie";
import Profile from "./Profile";

const cookies = new Cookies();

export default function NavBar() {

  return (
    <>
      <nav className="w-full h-20 fixed tracking-wider shadow-md text-left m-auto bg-slate-200 text-slate-800 items-center flex justify-start pl-5 md:pl-0 md:justify-center">
        <label className="text-4xl">Chatify</label>
        {
          cookies.get("user-name") ? (<><Profile /></>) : (<></>)
        }
      </nav>
    </>
  );
}
