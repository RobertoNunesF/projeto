import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Loja from "./components/Loja";
import Perfil from "./components/Perfil";
import Agenda from "./components/Agenda";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/loja" element={<Loja />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/agenda" element={<Agenda />} />
    </Routes>
  );
}

export default App;
