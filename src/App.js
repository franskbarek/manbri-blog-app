import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import { Routes, Route } from "react-router-dom";
import { Context } from "../src/context/Context";
import { useContext } from "react";

const tesEnv = process.env.REACT_APP_TES;
console.log(tesEnv);

export default function App() {
  const { user } = useContext(Context);
  return (
    <div className="app">
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="register" element={user ? <Homepage /> : <Register />} />
        <Route path="login" element={user ? <Homepage /> : <Login />} />
        <Route path="write" element={user ? <Write /> : <Register />} />
        <Route path="settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </div>
  );
}
