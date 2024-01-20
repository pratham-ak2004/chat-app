import "./App.css";
import React from "react";
import FriendList from "./components/friends/FriendList";
import Message from "./components/message/Message";
import MessageBoilerPlate from "./components/message/MessageBoilerPlate";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter, Routes, Route , useLocation } from "react-router-dom";

function MainContent() {
  const location = useLocation();

  return (
    <>
        <NavBar />
        <div className={`pt-20 w-full h-full ${location.pathname === '/' ? '' : 'flex flex-grow'}`}>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/chat" element={<><FriendList /><MessageBoilerPlate /></>}></Route>
            <Route exact path="/chat/:target" element={<><FriendList /><Message /></>}></Route>
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
