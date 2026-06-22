import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Loja from "./components/Loja";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/loja" element={<Loja />} />
    </Routes>
  );
}

export default App;
