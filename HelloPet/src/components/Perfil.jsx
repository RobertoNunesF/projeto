import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SERVICOS = [
  { id: "banho", nome: "Banho e Tosa", descricao: "Higiene e beleza completa", preco: "A partir de R$ 60", icon: "scissors" },
  { id: "vet", nome: "Veterinário", descricao: "Consulta e exames clínicos", preco: "A partir de R$ 120", icon: "stethoscope" },
  { id: "hotel", nome: "Hotel Pet", descricao: "Hospedagem confortável", preco: "A partir de R$ 80/dia", icon: "home" },
  { id: "loja", nome: "Retirar na Loja", descricao: "Produtos reservados online", preco: "Gratuito", icon: "bag" },
];

const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function IconeServico({ tipo, className }) {
  if (tipo === "scissors")
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  if (tipo === "stethoscope")
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    );
  if (tipo === "home")
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

const STEP_LABELS = ["Serviço", "Pet", "Data e Hora", "Confirmar"];

function StepIndicator({ step }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {STEP_LABELS.map((label, i) => {
        const num = i + 1;
        const ativo = num === step;
        const feito = num < step;
        return (
          <div key={num} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div className={`h-0.5 flex-1 ${feito ? "bg-orange-500" : "bg-gray-200"}`} />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-['Inter'] flex-shrink-0 ${
                  ativo
                    ? "bg-orange-500 text-white"
                    : feito
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {feito ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`h-0.5 flex-1 ${num < step ? "bg-orange-500" : "bg-gray-200"}`} />
              )}
            </div>
            <span className={`mt-1 text-xs font-['Inter'] ${ativo ? "text-orange-500 font-semibold" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("pets");

  // Pets
  const [pets, setPets] = useState([]);
  const [mostrarFormPet, setMostrarFormPet] = useState(false);
  const [novoPet, setNovoPet] = useState({ nome: "", especie: "", raca: "", idade: "", peso: "", observacoes: "" });

  // Agendamentos
  const [agendamentos, setAgendamentos] = useState([]);
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);
  const [step, setStep] = useState(1);
  const [agendamento, setAgendamento] = useState({ servicoId: "", petId: "", data: "", hora: "" });
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  // Câmera
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const [agendamentoCamera, setAgendamentoCamera] = useState(null);
  const [codigoCamera, setCodigoCamera] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (!dados) { navigate('/login'); return; }
    const u = JSON.parse(dados);
    setUsuario(u);
    fetch(`http://localhost:3000/pets?usuarioId=${u.id}`)
      .then(res => res.json())
      .then(data => setPets(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  function handleSair() {
    localStorage.removeItem('usuario');
    navigate('/');
  }

  /* ---- Pets ---- */
  function adicionarPet(e) {
    e.preventDefault();
    if (!novoPet.nome.trim()) return;
    fetch('http://localhost:3000/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...novoPet, usuarioId: usuario.id }),
    })
      .then(res => res.json())
      .then(petCriado => {
        setPets([...pets, petCriado]);
        setNovoPet({ nome: "", especie: "", raca: "", idade: "", peso: "", observacoes: "" });
        setMostrarFormPet(false);
      });
  }

  function removerPet(id) {
    fetch(`http://localhost:3000/pets/${id}`, { method: 'DELETE' })
      .then(() => setPets(pets.filter((p) => p.id !== id)));
  }

  /* ---- Agendamento ---- */
  function abrirAgendamento() {
    setAgendamento({ servicoId: "", petId: "", data: "", hora: "" });
    setStep(1);
    setMostrarAgendamento(true);
  }

  function fecharAgendamento() {
    setMostrarAgendamento(false);
  }

  function avancar() {
    if (step < 4) setStep(step + 1);
  }

  function voltar() {
    if (step > 1) setStep(step - 1);
  }

  function confirmarAgendamento() {
    const servico = SERVICOS.find((s) => s.id === agendamento.servicoId);
    const pet = pets.find((p) => p.id === Number(agendamento.petId));
    setAgendamentos([
      ...agendamentos,
      {
        id: Date.now(),
        servico: servico.nome,
        servicoId: servico.id,
        servicoIcon: servico.icon,
        pet: pet.nome,
        data: agendamento.data,
        hora: agendamento.hora,
        status: "Agendado",
      },
    ]);
    setMostrarAgendamento(false);
  }

  function cancelarAgendamento(id) {
    setAgendamentos(agendamentos.map((a) => a.id === id ? { ...a, status: "Cancelado" } : a));
  }

  function removerAgendamento(id) {
    setAgendamentos(agendamentos.filter((a) => a.id !== id));
  }

  function abrirCamera(ag) {
    setAgendamentoCamera(ag);
    setCodigoCamera("");
    setMostrarCamera(true);
  }

  const podeContinuar =
    (step === 1 && agendamento.servicoId) ||
    (step === 2 && agendamento.petId) ||
    (step === 3 && agendamento.data && agendamento.hora) ||
    step === 4;

  const servicoSelecionado = SERVICOS.find((s) => s.id === agendamento.servicoId);
  const petSelecionado = pets.find((p) => p.id === Number(agendamento.petId));

  // Data mínima: hoje
  const hoje = new Date().toISOString().split("T")[0];

  if (!usuario) return null;

  const tipoLabel = usuario.tipo === 'funcionario' ? 'Funcionário HelloPet' : 'Cliente HelloPet';

  return (
    <>
      {/* Navbar */}
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/img/patinha.png" alt="" />
            <h1 className="align-center text-slate-800 text-2xl font-bold font-['Inter'] leading-8">HelloPet</h1>
          </Link>
          <button
            type="button"
            data-collapse-toggle="navbar-perfil"
            aria-controls="navbar-perfil"
            aria-expanded="false"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base lg:hidden hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
          <div className="hidden w-full lg:block md:w-auto" id="navbar-perfil">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li><Link to="/" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">Início</Link></li>
              <li><a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">Serviços</a></li>
              <li><Link to="/loja" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">Produtos</Link></li>
              <li><a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">Sobre</a></li>
              <li><a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">Contato</a></li>
              <li className="lg:hidden pt-2 border-t border-default mt-2">
                <button onClick={handleSair} className="text-gray-700 text-sm font-medium font-['Inter'] leading-5 hover:text-orange-500 transition-colors">Sair</button>
              </li>
            </ul>
          </div>
          <div className="lg:flex gap-3 items-center hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-[10px]">
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <span className="text-sm font-medium font-['Inter'] text-slate-800">{usuario.nome.split(" ").slice(0, 2).join(" ")}</span>
            </div>
            <button onClick={handleSair} className="text-sm font-medium font-['Inter'] text-gray-600 hover:text-orange-500 transition-colors">Sair</button>
          </div>
        </div>
      </nav>

      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Card perfil */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-9 h-9 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-slate-800 text-lg font-bold font-['Inter'] leading-7">{usuario.nome}</h2>
                  <p className="text-gray-500 text-sm font-normal font-['Inter']">{usuario.email}</p>
                  <span className="self-start px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold font-['Inter'] rounded-full">{tipoLabel}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-slate-800 text-xl font-bold font-['Inter'] leading-7">{pets.length}</p>
                    <p className="text-gray-500 text-xs font-normal font-['Inter']">pet{pets.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-800 text-xl font-bold font-['Inter'] leading-7">{agendamentos.length}</p>
                    <p className="text-gray-500 text-xs font-normal font-['Inter']">agendamentos</p>
                  </div>
                </div>
                <button onClick={handleSair} className="text-orange-500 text-sm font-medium font-['Inter'] hover:underline">Sair</button>
              </div>
            </div>
          </div>

          {/* Abas */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setAbaAtiva("pets")}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold font-['Inter'] border-b-2 transition-colors ${abaAtiva === "pets" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
              Meus Pets
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">{pets.length}</span>
            </button>
            <button
              onClick={() => setAbaAtiva("agendamentos")}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold font-['Inter'] border-b-2 transition-colors ${abaAtiva === "agendamentos" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agendamentos
              {agendamentos.length > 0 && (
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">{agendamentos.length}</span>
              )}
            </button>
          </div>

          {/* Aba Meus Pets */}
          {abaAtiva === "pets" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-800 text-lg font-bold font-['Inter']">Meus Pets</h3>
                <button
                  onClick={() => setMostrarFormPet(true)}
                  className="flex items-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Novo pet
                </button>
              </div>

              {pets.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-3">
                  <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                  <p className="text-gray-500 text-sm font-['Inter']">Nenhum pet cadastrado ainda.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {pets.map((pet) => (
                    <div key={pet.id} className="bg-white rounded-2xl shadow-lg p-5 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.5 11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5S4.5 11.83 4.5 11zm9 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-4.5 5c-2.33 0-7 1.17-7 3.5V21h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-slate-800 text-base font-bold font-['Inter']">{pet.nome}</h4>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold font-['Inter'] rounded-full">{pet.especie || "Pet"}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                          {pet.raca && <p className="text-gray-600 text-sm font-['Inter']"><span className="font-medium">Raça:</span> {pet.raca}</p>}
                          {pet.idade && <p className="text-gray-600 text-sm font-['Inter']"><span className="font-medium">Idade:</span> {pet.idade}</p>}
                          {pet.peso && <p className="text-gray-600 text-sm font-['Inter']"><span className="font-medium">Peso:</span> {pet.peso}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-orange-500 text-sm font-medium font-['Inter'] hover:underline">Editar</button>
                        <button onClick={() => removerPet(pet.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remover pet">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Aba Agendamentos */}
          {abaAtiva === "agendamentos" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-800 text-lg font-bold font-['Inter']">Agendamentos</h3>
                <button
                  onClick={abrirAgendamento}
                  className="flex items-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Novo agendamento
                </button>
              </div>

              {/* Filtros de status */}
              {agendamentos.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["Todos", "Agendado", "Cancelado"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFiltroStatus(f)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold font-['Inter'] transition-colors ${
                        filtroStatus === f
                          ? f === "Cancelado"
                            ? "bg-red-100 text-red-600"
                            : "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}

              {agendamentos.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-3">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <p className="text-gray-500 text-sm font-['Inter']">Nenhum agendamento encontrado.</p>
                  <button
                    onClick={abrirAgendamento}
                    className="mt-1 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors"
                  >
                    Agendar serviço
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {agendamentos
                    .filter((ag) => filtroStatus === "Todos" || ag.status === filtroStatus)
                    .map((ag) => (
                      <div
                        key={ag.id}
                        className={`bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-3 ${ag.status === "Cancelado" ? "opacity-60" : ""}`}
                      >
                        {/* Linha principal */}
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${ag.status === "Cancelado" ? "bg-gray-100" : "bg-orange-100"}`}>
                            <IconeServico tipo={ag.servicoIcon} className={`w-6 h-6 ${ag.status === "Cancelado" ? "text-gray-400" : "text-orange-500"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-slate-800 text-base font-bold font-['Inter']">{ag.servico}</h4>
                              <span className={`px-2 py-0.5 text-xs font-semibold font-['Inter'] rounded-full ${
                                ag.status === "Agendado" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                              }`}>
                                {ag.status}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm font-['Inter']">
                              <span className="font-medium">Pet:</span> {ag.pet}
                            </p>
                            <p className="text-gray-600 text-sm font-['Inter']">
                              <span className="font-medium">Data:</span>{" "}
                              {new Date(ag.data + "T00:00:00").toLocaleDateString("pt-BR")} às {ag.hora}
                            </p>
                          </div>
                        </div>

                        {/* Ações */}
                        {ag.status === "Agendado" && (
                          <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                            {/* Acompanhar câmera — só para serviços presenciais */}
                            {ag.servicoId !== "loja" && (
                              <button
                                onClick={() => abrirCamera(ag)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold font-['Inter'] rounded-lg transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M23 7l-7 5 7 5V7z" />
                                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                                Acompanhar procedimento
                              </button>
                            )}
                            <button
                              onClick={() => cancelarAgendamento(ag.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 text-xs font-semibold font-['Inter'] rounded-lg transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                              </svg>
                              Cancelar
                            </button>
                          </div>
                        )}
                        {ag.status === "Cancelado" && (
                          <div className="flex pt-1 border-t border-gray-100">
                            <button
                              onClick={() => removerAgendamento(ag.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 text-xs font-semibold font-['Inter'] rounded-lg transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                              </svg>
                              Remover
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal novo pet */}
      {mostrarFormPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setMostrarFormPet(false)}>
          <form
            onSubmit={adicionarPet}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-slate-800 text-lg font-bold font-['Inter']">Novo Pet</h4>
              <button type="button" onClick={() => setMostrarFormPet(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Nome do pet <span className="text-orange-500">*</span></label>
              <input type="text" required value={novoPet.nome} onChange={(e) => setNovoPet({ ...novoPet, nome: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']" placeholder="Ex: Rex" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Espécie</label>
                <input type="text" value={novoPet.especie} onChange={(e) => setNovoPet({ ...novoPet, especie: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']" placeholder="Ex: Cachorro" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Raça</label>
                <input type="text" value={novoPet.raca} onChange={(e) => setNovoPet({ ...novoPet, raca: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']" placeholder="Ex: Golden Retriever" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Idade</label>
                <input type="text" value={novoPet.idade} onChange={(e) => setNovoPet({ ...novoPet, idade: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']" placeholder="Ex: 2 anos" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Peso</label>
                <input type="text" value={novoPet.peso} onChange={(e) => setNovoPet({ ...novoPet, peso: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']" placeholder="Ex: 5 kg" />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Observações</label>
              <textarea rows={3} value={novoPet.observacoes} onChange={(e) => setNovoPet({ ...novoPet, observacoes: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter'] resize-none"
                placeholder="Alergias, condições especiais, preferências..." />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={() => setMostrarFormPet(false)}
                className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold font-['Inter'] rounded-[10px] hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors">
                Cadastrar pet
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Acompanhar Procedimento */}
      {mostrarCamera && agendamentoCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setMostrarCamera(false)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-slate-800 text-lg font-bold font-['Inter']">Acompanhar Procedimentos</h4>
              <button type="button" onClick={() => setMostrarCamera(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Info do agendamento */}
            <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <IconeServico tipo={agendamentoCamera.servicoIcon} className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-slate-800 text-sm font-bold font-['Inter']">{agendamentoCamera.servico}</p>
                <p className="text-gray-500 text-xs font-['Inter']">
                  {agendamentoCamera.pet} · {new Date(agendamentoCamera.data + "T00:00:00").toLocaleDateString("pt-BR")} às {agendamentoCamera.hora}
                </p>
              </div>
            </div>

            {/* Como funciona */}
            <div>
              <p className="text-slate-800 text-sm font-bold font-['Inter'] mb-1">Como funciona?</p>
              <p className="text-gray-600 text-sm font-['Inter'] leading-5">
                Insira o código da câmera para acompanhar o seu pet durante o atendimento em tempo real. Você pode pegar o código na recepção do estabelecimento.
              </p>
            </div>

            {/* Campo código */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">Código da câmera</label>
              <input
                type="text"
                value={codigoCamera}
                onChange={(e) => setCodigoCamera(e.target.value.toUpperCase())}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter'] tracking-widest"
                placeholder="Ex.: CAM-1234"
                maxLength={10}
              />
              <p className="mt-1.5 text-gray-400 text-xs font-['Inter']">
                Aguarde o início do atendimento para conectar.
              </p>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setMostrarCamera(false)}
                className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold font-['Inter'] rounded-[10px] hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!codigoCamera.trim()}
                onClick={() => {
                  alert(`Conectando à câmera ${codigoCamera}...`);
                  setMostrarCamera(false);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors ${
                  codigoCamera.trim() ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                Acessar câmera
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agendar Serviço */}
      {mostrarAgendamento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={fecharAgendamento}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-slate-800 text-lg font-bold font-['Inter']">Agendar Serviço</h4>
                <p className="text-gray-500 text-sm font-['Inter']">Olá, {usuario.nome?.split(" ")[0]}! Escolha o serviço e horário desejados.</p>
              </div>
              <button type="button" onClick={fecharAgendamento} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Step indicator */}
            <StepIndicator step={step} />

            {/* Step 1 — Serviço */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-800 text-sm font-semibold font-['Inter']">Qual serviço você precisa?</p>
                {SERVICOS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setAgendamento({ ...agendamento, servicoId: s.id })}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
                      agendamento.servicoId === s.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${agendamento.servicoId === s.id ? "bg-orange-100" : "bg-gray-100"}`}>
                      <IconeServico tipo={s.icon} className={`w-5 h-5 ${agendamento.servicoId === s.id ? "text-orange-500" : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-800 text-sm font-bold font-['Inter']">{s.nome}</p>
                      <p className="text-gray-500 text-xs font-['Inter']">{s.descricao}</p>
                    </div>
                    <span className={`text-sm font-semibold font-['Inter'] ${agendamento.servicoId === s.id ? "text-orange-500" : "text-orange-400"}`}>{s.preco}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 — Pet */}
            {step === 2 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-800 text-sm font-semibold font-['Inter']">Para qual pet é o serviço?</p>
                {pets.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm font-['Inter'] mb-3">Nenhum pet cadastrado.</p>
                    <button
                      type="button"
                      onClick={() => { fecharAgendamento(); setMostrarFormPet(true); }}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors"
                    >
                      Cadastrar pet
                    </button>
                  </div>
                ) : (
                  pets.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setAgendamento({ ...agendamento, petId: String(p.id) })}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
                        agendamento.petId === String(p.id)
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${agendamento.petId === String(p.id) ? "bg-orange-100" : "bg-purple-100"}`}>
                        <svg className={`w-5 h-5 ${agendamento.petId === String(p.id) ? "text-orange-500" : "text-purple-500"}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.5 11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5S4.5 11.83 4.5 11zm9 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-4.5 5c-2.33 0-7 1.17-7 3.5V21h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-800 text-sm font-bold font-['Inter']">{p.nome}</p>
                        <p className="text-gray-500 text-xs font-['Inter']">{p.especie}{p.raca ? ` · ${p.raca}` : ""}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Step 3 — Data e Hora */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-slate-800 font-['Inter']">Escolha a data</label>
                  <input
                    type="date"
                    min={hoje}
                    value={agendamento.data}
                    onChange={(e) => setAgendamento({ ...agendamento, data: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-800 font-['Inter']">Escolha o horário</label>
                  <div className="grid grid-cols-3 gap-2">
                    {HORARIOS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setAgendamento({ ...agendamento, hora: h })}
                        className={`py-2 rounded-lg text-sm font-semibold font-['Inter'] border-2 transition-colors ${
                          agendamento.hora === h
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-200 text-gray-700 hover:border-orange-300"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Confirmar */}
            {step === 4 && (
              <div className="flex flex-col gap-4">
                <p className="text-slate-800 text-sm font-semibold font-['Inter']">Revise as informações do agendamento:</p>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-['Inter']">Serviço</span>
                    <span className="text-slate-800 text-sm font-bold font-['Inter']">{servicoSelecionado?.nome}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-['Inter']">Valor</span>
                    <span className="text-orange-500 text-sm font-bold font-['Inter']">{servicoSelecionado?.preco}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-['Inter']">Pet</span>
                    <span className="text-slate-800 text-sm font-bold font-['Inter']">{petSelecionado?.nome}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-['Inter']">Data</span>
                    <span className="text-slate-800 text-sm font-bold font-['Inter']">
                      {agendamento.data ? new Date(agendamento.data + "T00:00:00").toLocaleDateString("pt-BR") : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-['Inter']">Horário</span>
                    <span className="text-slate-800 text-sm font-bold font-['Inter']">{agendamento.hora}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-green-700 text-sm font-['Inter']">Ao confirmar, você receberá um lembrete por e-mail.</p>
                </div>
              </div>
            )}

            {/* Botões de navegação */}
            <div className="flex justify-between pt-1">
              {step > 1 ? (
                <button type="button" onClick={voltar}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold font-['Inter'] rounded-[10px] hover:bg-gray-50 transition-colors">
                  ← Voltar
                </button>
              ) : (
                <button type="button" onClick={fecharAgendamento}
                  className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold font-['Inter'] rounded-[10px] hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={avancar}
                  disabled={!podeContinuar}
                  className={`px-5 py-2.5 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors ${
                    podeContinuar ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Continuar →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={confirmarAgendamento}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors"
                >
                  Confirmar agendamento
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Perfil;
