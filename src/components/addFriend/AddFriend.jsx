import React from "react";
import { json } from "react-router-dom";

export default function AddFriend() {

    const [inviteCode, setInviteCode] = React.useState('');
    const handleInviteSubmit = (e) => {
        e.preventDefault();

        console.log(inviteCode);
        setInviteCode('');
    }

    const handleHome = (e) => {
      e.preventDefault();

      window.location.href = "/chat";
    }

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div className='w-full h-max max-w-sm m-10 p-6 rounded-md bg-slate-300'>
            <div className='text-3xl text-center text-slate-600 mb-4'>Add Friend</div>
            <input className='flex items-center justify-center gap-5 w-full rounded-md h-10 p-2 bg-slate-200 text-slate-600 outline-none' value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="Enter invite code" />
            <button className="w-full h-10 bg-slate-600 rounded-md mt-4 text-slate-200" onClick={handleInviteSubmit}>Submit</button>
            <button className="w-full h-10 bg-slate-400 rounded-md mt-4 text-slate-900" onClick={handleHome}>Home</button>
        </div>
    </div>
    <footer className='w-full h-20 flex items-center justify-center bg-slate-100'>
        Made by @pratham-ak2004
    </footer>
    </>
  );
}
