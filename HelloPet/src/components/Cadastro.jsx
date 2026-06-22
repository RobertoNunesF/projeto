function Cadastro() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/img/patinha.png" alt="" className="w-12 mb-2" />
          <h1 className="text-2xl font-bold font-['Inter'] text-slate-800">HelloPet</h1>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-1 text-center">Criar conta grátis</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Cadastre-se para cuidar do seu pet com a gente
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Seu e-mail
            </label>
            <input
              type="email"
              id="email"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirm-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 mt-0.5 border border-gray-300 rounded text-orange-500 focus:ring-orange-500"
              required
            />
            <label htmlFor="terms" className="ms-2 text-sm text-gray-600">
              Eu aceito os{' '}
              <a href="#" className="font-medium text-orange-500 hover:underline">
                termos e condições
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-[10px] text-sm px-5 py-2.5 text-center transition-colors"
          >
            Criar conta
          </button>

          <p className="text-sm text-center text-gray-500">
            Já tem uma conta?{' '}
            <a href="/login" className="font-medium text-orange-500 hover:underline">
              Entrar
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Cadastro;