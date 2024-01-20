import React from "react";

export default function Friends() {
  return (
    <>
      <div className="h-auto min-h-screen p-2 md:max-w-lg bg-slate-300 w-full md:basis-1/3">
        <div className="gap-3 grid items-start overflow-y-auto pb-20 overflow-x-hidden">

        <div className="flex flex-row items-center bg-slate-100 shadow-xl rounded-lg p-4">
          <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="Profile" />
          <div className="ml-3">
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">Lorem ipsum</h2>
            <p className="font-thin tracking-tight text-nowrap text-left">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
        
        </div>
      </div>
    </>
  );
}
