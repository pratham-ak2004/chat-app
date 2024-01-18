import React from 'react'
import {useState} from 'react';

export default function Login() {
    const [select , setSelect] = useState('login');

    const handleLoginClick = (e) => {
        e.preventDefault();
        if(select === 'login'){
            setSelect('signup');
        }else{ 
            setSelect('login');
        }
    }

  return (
    <>
    <div className="flex w-full h-full justify-center items-center">
        <div className='w-full h-max max-w-sm m-10 p-6 rounded-md bg-slate-300'>
            {select === 'login' ?(
                <>
                    <div className='text-3xl text-center text-slate-600'>Login</div>
                    <div className='flex flex-col gap-4 mt-5'>
                        <input className='rounded-md h-10 p-2 bg-slate-200' type='text' placeholder='Username' />
                        <input className='rounded-md h-10 p-2 bg-slate-200' type='password' placeholder='Password' />
                        <div className='text-center'>dont have an account? <br /> <a onClick={handleLoginClick} className='text-sky-600'>create one</a></div>
                        <button className='rounded-md h-10 p-2 bg-slate-200 text-slate-600'>Login</button>
                    </div>
                </>
            ):(
                <>
                    <div className='text-3xl text-center text-slate-600'>Sign Up</div>
                    <div className='flex flex-col gap-4 mt-5'>
                        <input className='rounded-md h-10 p-2 bg-slate-200' type='text' placeholder='Username' />
                        <input className='rounded-md h-10 p-2 bg-slate-200' type='password' placeholder='Password' />
                        <div className='text-center'>have an account? <br /> <a onClick={handleLoginClick} className='text-sky-600'> login now</a></div>
                        <button className='rounded-md h-10 p-2 bg-slate-200 text-slate-600'>Sign Up</button>
                    </div>
            </>)}
        </div>
    </div>
    <footer className='w-full h-20 flex items-center justify-center bg-slate-100'>
        Made by @pratham-ak2004
    </footer>
    </>
  )
}
