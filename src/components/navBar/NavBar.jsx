import React from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleProfile = (e) => {
    e.preventDefault();

    if (currentUser) {
      auth.signOut().then(() => {
        navigate("/");
      });
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <nav className="w-full h-20 fixed tracking-wider shadow-md text-left m-auto bg-slate-200 text-slate-800 items-center flex justify-start pl-5 md:pl-0 md:justify-center">
        <label className="text-4xl">Chatify</label>
        <button className="fixed right-0 mr-5 bg-slate-400 h-9 w-24 text-base shadow-xl rounded-md shadow-slate-300 focus:outline-none" onClick={handleProfile}>
          {currentUser ? <>Sign Out</> : <>Sign In</>}
        </button>
      </nav>
    </>
  );
}
