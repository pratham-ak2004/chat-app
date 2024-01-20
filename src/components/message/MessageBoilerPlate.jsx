import React from 'react'

export default function MessageBoilerPlate() {
  return (
    <>
    <div className='w-full h-full md:flex flex-col items-center basis-2/3 justify-center text-nowrap hidden'>
        <div className='font-black text-3xl tracking-wider m-5 text-slate-800'>Chatify</div>
        <div className='tracking-widest text-nowrap text-center leading-5 text-slate-500'>Chat with your friends online <br /> Click on Friends to start chatting</div>
    </div>
    </>
  )
}
