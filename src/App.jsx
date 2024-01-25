import "./App.css";
import React from "react";
import FriendList from "./components/friends/FriendList";
import Message from "./components/message/Message";
import MessageBoilerPlate from "./components/message/MessageBoilerPlate";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter, Routes, Route , useLocation } from "react-router-dom";
import AddFriend from "./components/addFriend/AddFriend";
import { useMediaQuery } from "react-responsive";


function MainContent() {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
        <NavBar />
        <div className={`pt-20 w-full h-full ${location.pathname.startsWith("/chat/") && isMobile ? "pt-0" : ""} ${location.pathname === '/' || location.pathname === '/invite' || location.pathname === '/addFriend' ? '' : 'flex flex-grow'}`}>
          <Routes>
            <Route exact path="/" element={<Login redirect={"/chat"} />}></Route>
            <Route exact path="/chat" element={<><FriendList /><MessageBoilerPlate /></>}></Route>
            <Route exact path="/chat/:target" element={<><FriendList /><Message /></>}></Route>
            <Route exact path="/invite" element={<Login redirect={"/addFriend"}/>}></Route>
            <Route exact path="/addFriend" element={<AddFriend/>}></Route>
          </Routes>
        </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </>
  );
}

export default App;
