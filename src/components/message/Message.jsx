import React from "react";

export default function Message() {

  return (
    <>
      <div className="basis-2/3  hidden selection:md:block md:flex flex-col flex-wrap justify-between content-center" >
        <div>message top</div>
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
