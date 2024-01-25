import React from 'react'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Login(props) {

    const authProvider = new GoogleAuthProvider();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(cookies.get("user-name")){
            navigate(props.redirect)
        }
    },[])

    const handleSignIn = (e) => {
        e.preventDefault();

        signInWithPopup(auth, authProvider)
        .then(async(result) => {
            if(result.user){
                cookies.set("user-name", result.user.displayName)
                cookies.set("user-img", result.user.photoURL)
                cookies.set("user-id", result.user.uid)

                await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/addUser`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "userId": result.user.uid,
                        "userName": result.user.displayName,
                        "userImg": result.user.photoURL,
                    })
                })
                .then((res) => {
                    const dataPromise = res.json();

                    dataPromise.then((data) => {
                        cookies.set("user-friends", data.friendsIds)
                    })
                })
                .then(() => {
                    navigate(props.redirect);
                })

            }
        })
        .catch((error) => {
            console.log(error);
            if(cookies.get("user-id") !== undefined)cookies.remove("user-id");
            if(cookies.get("user-img") !== undefined)cookies.remove("user-img");
            if(cookies.get("user-name") !== undefined)cookies.remove("user-name");
            if(cookies.get("user-friends") !== undefined)cookies.remove("user-friends");
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
