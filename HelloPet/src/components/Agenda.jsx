import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const funcionario = {
  nome: "Funcionário HelloPet",
  cargo: "Atendente",
};

const STATUS_COLOR = {
  "Em andamento": "bg-blue-100 text-blue-700",
  "Confirmado":   "bg-green-100 text-green-700",
  "Aguardando":   "bg-yellow-100 text-yellow-700",
  "Concluído":    "bg-gray-100 text-gray-500",
};

const PRODUTO_VAZIO = { nome: '', categoria: '', descricao: '', imagem: '', preco: '' };

function Agenda() {
  const [abaAtiva, setAbaAtiva] = useState('agenda');

  // Agenda
  const [agendamentos, setAgendamentos] = useState([]);
  const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);

  // Produtos
  const [produtos, setProdutos] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [novoProduto, setNovoProduto] = useState(PRODUTO_VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0];
    fetch(`http://localhost:3000/agendamentos?data=${hoje}`)
      .then(res => res.json())
      .then(data => { setAgendamentos(Array.isArray(data) ? data : []); setLoadingAgendamentos(false); })
      .catch(() => setLoadingAgendamentos(false));
  }, []);

  useEffect(() => {
    if (abaAtiva !== 'produtos') return;
    setLoadingProdutos(true);
    fetch('http://localhost:3000/produtos')
      .then(res => res.json())
      .then(data => { setProdutos(data); setLoadingProdutos(false); })
      .catch(() => setLoadingProdutos(false));
  }, [abaAtiva]);

  function handleAdicionarProduto(e) {
    e.preventDefault();
    setSalvando(true);
    fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...novoProduto, preco: parseFloat(novoProduto.preco) }),
    })
      .then(res => res.json())
      .then(data => {
        setProdutos(prev => [...prev, data]);
        setNovoProduto(PRODUTO_VAZIO);
        mostrarFeedback('sucesso', 'Produto adicionado com sucesso!');
      })
      .catch(() => mostrarFeedback('erro', 'Erro ao adicionar produto. Tente novamente.'))
      .finally(() => setSalvando(false));
  }

  function mostrarFeedback(tipo, mensagem) {
    setFeedback({ tipo, mensagem });
    setTimeout(() => setFeedback(null), 3500);
  }

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/img/patinha.png" alt="" className="w-8" />
            <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">HelloPet</h1>
          </Link>
          <button
            type="button"
            data-collapse-toggle="navbar-agenda"
            aria-controls="navbar-agenda"
            aria-expanded="false"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
          <div className="hidden w-full lg:flex lg:items-center lg:gap-3 lg:w-auto" id="navbar-agenda">
            <div className="flex flex-col gap-2 p-4 lg:p-0 lg:flex-row lg:items-center lg:gap-3 mt-4 lg:mt-0 border border-gray-100 rounded-lg bg-gray-50 lg:border-0 lg:bg-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-600 font-['Inter']">{funcionario.nome}</span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-semibold font-['Inter'] rounded-full">
                  {funcionario.cargo}
                </span>
              </div>
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-orange-500 font-['Inter'] transition-colors">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Abas */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setAbaAtiva('agenda')}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold font-['Inter'] border-b-2 transition-colors ${
                abaAtiva === 'agenda'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agenda do Dia
              {!loadingAgendamentos && agendamentos.length > 0 && (
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {agendamentos.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setAbaAtiva('produtos')}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold font-['Inter'] border-b-2 transition-colors ${
                abaAtiva === 'produtos'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Produtos
            </button>
          </div>

          {/* ── Aba Agenda ── */}
          {abaAtiva === 'agenda' && (
            <div>
              <div className="mb-5">
                <h3 className="text-slate-800 text-lg font-bold font-['Inter']">Atendimentos de Hoje</h3>
                <p className="text-gray-500 text-xs font-['Inter'] capitalize mt-0.5">{hoje}</p>
              </div>

              {loadingAgendamentos ? (
                <p className="text-center text-gray-500 text-sm font-['Inter'] py-6">Carregando agendamentos...</p>
              ) : agendamentos.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center gap-3">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <p className="text-gray-500 text-sm font-['Inter']">Nenhum atendimento agendado para hoje.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {agendamentos.map(ag => (
                    <div key={ag.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
                      <span className="w-14 text-center text-slate-800 text-base font-bold font-['Inter'] shrink-0">
                        {ag.hora}
                      </span>
                      <div className="w-px h-10 bg-gray-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-slate-800 text-sm font-bold font-['Inter']">{ag.clienteNome}</span>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-gray-500 text-sm font-['Inter']">{ag.pet}</span>
                        </div>
                        <span className="text-gray-500 text-xs font-['Inter']">{ag.servico}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-['Inter'] shrink-0 ${STATUS_COLOR[ag.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {ag.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Aba Produtos ── */}
          {abaAtiva === 'produtos' && (
            <div className="flex flex-col gap-6">

              {feedback && (
                <div className={`rounded-xl px-4 py-3 text-sm font-semibold font-['Inter'] ${
                  feedback.tipo === 'sucesso'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {feedback.mensagem}
                </div>
              )}

              {/* Formulário de novo produto */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-slate-800 text-lg font-bold font-['Inter'] mb-4">Adicionar Produto</h3>
                <form onSubmit={handleAdicionarProduto} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">
                        Nome <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text" required
                        value={novoProduto.nome}
                        onChange={e => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']"
                        placeholder="Ex: Ração Premium"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">
                        Categoria <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text" required
                        value={novoProduto.categoria}
                        onChange={e => setNovoProduto({ ...novoProduto, categoria: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']"
                        placeholder="Ex: Alimentação"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">
                      Descrição <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      required rows={2}
                      value={novoProduto.descricao}
                      onChange={e => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter'] resize-none"
                      placeholder="Descreva o produto..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">URL da imagem</label>
                      <input
                        type="text"
                        value={novoProduto.imagem}
                        onChange={e => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 font-['Inter']">
                        Preço (R$) <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="number" required min="0" step="0.01"
                        value={novoProduto.preco}
                        onChange={e => setNovoProduto({ ...novoProduto, preco: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 font-['Inter']"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit" disabled={salvando}
                      className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold font-['Inter'] rounded-[10px] transition-colors ${
                        salvando ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      {salvando ? 'Salvando...' : 'Adicionar produto'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de produtos existentes */}
              <div>
                <h3 className="text-slate-800 text-base font-bold font-['Inter'] mb-3">
                  Produtos Cadastrados
                  {!loadingProdutos && (
                    <span className="ml-2 text-xs text-gray-400 font-normal">({produtos.length})</span>
                  )}
                </h3>

                {loadingProdutos ? (
                  <p className="text-center text-gray-500 text-sm font-['Inter'] py-6">Carregando produtos...</p>
                ) : produtos.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm font-['Inter'] py-6">Nenhum produto cadastrado ainda.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {produtos.map(p => (
                      <div key={p.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                        <img
                          src={p.imagem || '/img/patinha.png'} alt={p.nome}
                          onError={e => (e.target.src = '/img/patinha.png')}
                          className="w-14 h-14 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-sm font-bold font-['Inter'] truncate">{p.nome}</p>
                          <p className="text-gray-500 text-xs font-['Inter']">{p.categoria}</p>
                          <p className="text-gray-400 text-xs font-['Inter'] truncate mt-0.5">{p.descricao}</p>
                        </div>
                        <span className="text-orange-500 font-bold text-sm font-['Inter'] shrink-0">
                          R$ {Number(p.preco).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
}

export default Agenda;
