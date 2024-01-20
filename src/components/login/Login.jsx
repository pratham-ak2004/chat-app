import React from 'react'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {useNavigate} from 'react-router-dom';

export default function Login() {

    const authProvider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();

        signInWithPopup(auth, authProvider)
        .then((result) => {
            if(result.user){
                navigate("/chat")
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error Logging in")
        })
    }


  return (
    <>
    <div className="flex w-full h-full justify-center items-center">
        <div className='w-full h-max max-w-sm m-10 p-6 rounded-md bg-slate-300'>
            <div className='text-3xl text-center text-slate-600 mb-4'>Login</div>
            <button className='flex items-center justify-center gap-5 w-full rounded-md h-10 p-2 bg-slate-200 text-slate-600' onClick={(e) => {handleSignIn(e)}}>
                <img className="h-7 w-7 mr-2" src="/google-icon.png" alt="Google Icon" />
                    Google
            </button>
        </div>
    </div>
    <footer className='w-full h-20 flex items-center justify-center bg-slate-100'>
        Made by @pratham-ak2004
    </footer>
    </>
  )
}
