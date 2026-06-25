import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [tipo, setTipo] = useState('cliente');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          setErro('E-mail não encontrado.');
          return;
        }
        const usuario = data[0];
        if (usuario.senha !== senha) {
          setErro('Senha incorreta.');
          return;
        }
        if (usuario.tipo !== tipo) {
          setErro(`Este e-mail está cadastrado como ${usuario.tipo === 'funcionario' ? 'funcionário' : 'cliente'}.`);
          return;
        }
        localStorage.setItem('usuario', JSON.stringify(usuario));
        navigate(usuario.tipo === 'funcionario' ? '/agenda' : '/perfil');
      })
      .catch(() => setErro('Erro ao conectar com o servidor.'))
      .finally(() => setCarregando(false));
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/img/patinha.png" alt="" className="w-12 mb-2" />
          <h1 className="text-2xl font-bold font-['Inter'] text-slate-800">HelloPet</h1>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-1 text-center">Entrar na sua conta</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Acesse para agendar serviços e acompanhar seus pets
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tipo de usuário</label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                type="button"
                onClick={() => setTipo('cliente')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  tipo === 'cliente'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => setTipo('funcionario')}
                className={`flex-1 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  tipo === 'funcionario'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Funcionário
              </button>
            </div>
          </div>

          {erro && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{erro}</p>
          )}

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Seu e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              placeholder="nome@exemplo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ms-2 text-sm text-gray-600">
                Lembrar de mim
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-orange-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className={`w-full text-white font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center transition-colors ${carregando ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-sm text-center text-gray-500">
            Ainda não tem uma conta?{' '}
            <a href="/cadastro" className="font-medium text-orange-500 hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;