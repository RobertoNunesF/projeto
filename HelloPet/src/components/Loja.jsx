import { Link } from "react-router-dom";

function Loja() {
  return (
    <>
          <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/img/patinha.png" alt="" />
            <h1 className="align-center text-slate-800 text-2xl font-bold font-['Inter'] leading-8 ">HelloPet</h1>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base lg:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>

          <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <a
                  href="#"
                  className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5"
                  aria-current="page"
                >
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="justify-start text-gray-700 text-sm font-medium font-['Inter'] leading-5">
                  Contatos
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:flex gap-3.5 hidden">
            <button className="text-center justify-start text-gray-700 text-sm font-bold font-['Inter'] leading-5">
              <Link to="/login">Entrar</Link>
            </button>
            <button className="self-stretch h-8 px-4 py-1.5 bg-orange-500 rounded-[10px] inline-flex justify-start items-start text-center text-white text-sm font-bold font-['Inter'] leading-5">
              <Link to="/cadastro">Cadastrar</Link>
            </button>
          </div>
        </div>
      </nav>
      <main className="flex flex-col min-h-screen bg-gray-100 pt-20">
        <form action="" className="flex gap-3 mx-[2rem]">
            <input
            type="text"
            className="text-sm h-10 w-[75%] rounded-lg p-3 border border-gray-300 focus:outline-none "
            required
            placeholder="Palavra chave do título ou gênero"
          />
        <button className="w-[25%] h-10 px-4 py-2.5 bg-orange-500 rounded-2xl inline-flex items-center gap-2 text-center justify-start text-white text-sm font-semibold font-['Inter'] leading-5">
            <img src="/img/carrinho.png" alt=""/>
            <p>Carrinho</p>
        </button>
        </form>
      </main>
      </>
      
  );
}

export default Loja;