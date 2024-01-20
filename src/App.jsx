import "./App.css";
import Friends from "./components/friends/Friends";
import Message from "./components/message/Message";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter, Routes, Route , useLocation } from "react-router-dom";

function MainContent() {
  const location = useLocation();

  return (
    <>
        <NavBar />
        <div className={`pt-20 w-full h-full ${location.pathname === '/chat' ? 'flex flex-grow' : ''}`}>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/chat" element={<><Friends /> <Message /></>}></Route>
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
