import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Menu/Login";
import NavMenu from "./components/Menu/NavMenu";
import Register from "./components/Menu/Register";

function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
