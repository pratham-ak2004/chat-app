import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Friend(props) {

  const [userDetails , setUserDetails] = React.useState({
    user : "",
    socket : ""
  });

  const fetchUserDetails = async (uid) => {
    await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/getFriend/${uid}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId : cookies.get("user-id")
      }),
      })
      .then((res)=>{
        if(res.status === 200){
          res.json().then((data)=>{
            console.log(data)
            setUserDetails({
              user : data.User,
              socket : data.socket
            });
          })
        }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  React.useEffect(() => {
    fetchUserDetails(props.Uid);
  },[props.Uid]);

  return (
    <>
        <div className="flex flex-row items-center bg-slate-100 shadow-xl rounded-lg p-4" onClick={(e)=>{props.handleChatSelect(e,userDetails.user.userId,userDetails.user,userDetails.socket)}} key={props.uid}>
          <img className="w-16 h-16 rounded-full" src={userDetails.user.userImg || "https://via.placeholder.com/150"} alt="Profile" />
          <div className="ml-3">
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">{userDetails.user.userName || "Loading..."}</h2>
            <p className="font-thin tracking-tight text-nowrap text-left"></p>
          </div>
        </div>
    </>
  )
}
