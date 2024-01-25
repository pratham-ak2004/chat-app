import React from 'react';
import Cookies from 'universal-cookie';
import {auth} from '../../config/firebase';
import {useNavigate} from 'react-router-dom';

const cookies = new Cookies();

export default function Profile() {

  const [profileClicked, setProfileClicked] = React.useState(false);
  const userImg = cookies.get('user-img');
  const navigate = useNavigate();

  const handleImgClick = (e) => {
    e.preventDefault();
    setProfileClicked(!profileClicked);
  }

  const handleSignOut = (e) => {
    e.preventDefault();

      auth.signOut().then(() => {
        cookies.remove("user-name");
        cookies.remove("user-img");
        cookies.remove("user-id");
        cookies.remove("user-friends");
        navigate("/");
      });
  }


  return (
    <>
    <img src={userImg} className='fixed right-0 mr-6 h-12 w-12 text-base shadow-xl rounded-3xl shadow-slate-300 focus:outline-none object-contain' onClick={handleImgClick}>
    </img>
    {
      profileClicked && (
        <>
        <div className='fixed right-0 top-20 mr-6 h-60 w-72 text-base shadow-xl rounded-3xl bg-slate-400 focus:outline-none object-contain z-10 flex flex-col items-center justify-around'>
          <h1 className='w-auto text-black h-auto m-4 text-clip text-center bg-slate-200 rounded-2xl px-3 py-6'>Hi, {cookies.get("user-name")} !</h1>
          <button className='bg-slate-200 w-28 h-10 rounded-2xl' onClick={handleSignOut}>Sign out</button>
        </div>
        </>
      )
    }
    </>
  )
}
