import React from 'react';

export default function Friend(props) {

  const [userDetails , setUserDetails] = React.useState({});

  const fetchUserDetails = async (uid) => {
    await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/getUserDetails/${uid}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      })
      .then((res)=>{
        if(res.status === 200){
          res.json().then((data)=>{
            setUserDetails(data);
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
        <div className="flex flex-row items-center bg-slate-100 shadow-xl rounded-lg p-4" onClick={(e)=>{props.handleChatSelect(e,userDetails.userId)}} key={props.uid}>
          <img className="w-16 h-16 rounded-full" src={userDetails.userImg || "https://via.placeholder.com/150"} alt="Profile" />
          <div className="ml-3">
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">{userDetails.userName || "Loading..."}</h2>
            <p className="font-thin tracking-tight text-nowrap text-left"></p>
          </div>
        </div>
    </>
  )
}
