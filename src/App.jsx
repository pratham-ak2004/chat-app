import "./App.css";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="pt-20 pb-20 w-full h-full">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
