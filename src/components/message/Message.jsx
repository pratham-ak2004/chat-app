import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Message() {
  const [target , setTarget] = React.useState(useParams().target);
  const [user , setUser] = React.useState({});
  const navigate = useNavigate();

  const handleBackButton = (e) => {
    e.preventDefault();

    navigate("/chat");
  }

  const fetchUserDetails = async (e,uid) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_BACKEND_HOST_API_KEY}/api/getUserDetails/${uid}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res)=>{
        if(res.status === 200){
          res.json().then((data)=>{
            setUser(data);
          })
        }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  React.useEffect(() => {
    fetchUserDetails(target);
  },[]);

  
  return (
    <>
      <div className="w-full md:basis-2/3 flex flex-col flex-wrap justify-between content-center" >

        <div className="w-full h-14 bg-slate-400 shadow-2xl">
          <div className="h-full w-full flex flex-row items-center">
          <svg className="mx-3 h-full" onClick={handleBackButton} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            <img className="w-12 h-12 rounded-full m-1" src={user.userImg || "https://via.placeholder.com/150"} alt="Profile" />
            <h2 className="text-2xl font-medium text-left tracking-wide text-nowrap my-1">{user.userName || "Loading..."}</h2>
          </div>
        </div>

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
