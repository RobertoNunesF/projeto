import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/produtos')
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 inset-s-0 border-b border-gray-200">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/img/patinha.png" alt="" className="w-8" />
            <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">HelloPet</h1>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>

          <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li><a href="#" className="text-gray-700 text-sm font-medium font-['Inter']">Início</a></li>
              <li><a href="#" className="text-gray-700 text-sm font-medium font-['Inter']">Serviços</a></li>
              <li><a href="#" className="text-gray-700 text-sm font-medium font-['Inter']">Produtos</a></li>
              <li><a href="#" className="text-gray-700 text-sm font-medium font-['Inter']">Sobre</a></li>
              <li><a href="#" className="text-gray-700 text-sm font-medium font-['Inter']">Contatos</a></li>
            </ul>
          </div>

          <div className="lg:flex gap-3.5 hidden">
            <Link to="/login" className="text-gray-700 text-sm font-bold font-['Inter']">Entrar</Link>
            <Link to="/cadastro" className="h-8 px-4 py-1.5 bg-orange-500 rounded-[10px] text-white text-sm font-bold font-['Inter']">
              Cadastrar
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex flex-col min-h-screen bg-gray-100 pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="text-sm h-10 w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Palavra chave do título ou categoria"
          />
          <button className="shrink-0 h-10 px-4 bg-orange-500 rounded-2xl flex items-center gap-2 text-white text-sm font-semibold font-['Inter']">
            <img src="/img/carrinho.png" alt="" className="w-5 h-5" />
            <span>Carrinho</span>
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Carregando produtos...</p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {produtosFiltrados.map((produto) => (
                <div key={produto.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    onError={(e) => (e.target.src = '/img/patinha.png')}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 leading-tight mb-1">{produto.nome}</h3>
                    <p className="text-xs text-gray-500 leading-snug flex-1">{produto.descricao}</p>
                    <p className="text-orange-500 font-bold text-sm mt-2">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>
                    <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg py-2 transition-colors">
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Loja;