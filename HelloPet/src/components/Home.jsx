import { Link } from "react-router-dom";

function Home() {
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
      <main className="pt-20">
        <section className="relative self-stretch h-[70vh] lg:h-[600px] w-full overflow-hidden flex flex-col justify-center items-center text-center px-4">
          <div className="absolute inset-0 bg-gray-700 lg:bg-[url('https://revistaamazonia.com.br/wp-content/uploads/2025/09/Pug-defeitos-de-temperamento-que-ninguem-comenta.webp')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60 flex flex-col items-start justify-center gap-6 lg:pl-[10rem]">
              <h2 className="w-[90%] mx-auto lg:mx-0 lg:pl-[2rem] lg:w-[40rem] justify-start text-white text-4xl lg:text-6xl font-bold font-['Inter'] lg:leading-[60px] leading-8 text-start">
                Cuidamos do Seu Pet com Amor e Carinho
              </h2>
              <p className="w-[90%] mx-auto lg:mx-0 lg:pl-[2rem] lg:w-[672px] justify-start text-white text-xl font-normal font-['Inter'] leading-7 text-start">
                Serviços completos para o bem-estar do seu melhor amigo. Banho, tosa, veterinário e muito mais!
              </p>
              <div className="flex lg:pl-[2rem] flex-col items-start w-full lg:flex-row gap-3 ">
                <Link
                  to="/servicos"
                  className="w-[90%] mx-auto lg:mx-0 lg:justify-start lg:w-44 h-12 relative bg-orange-500 rounded-[10px] text-center text-white text-base font-semibold font-['Inter'] leading-6 flex items-center justify-center"
                >
                  Nossos Serviços
                </Link>
                <button className="w-[90%] mx-auto lg:mx-0 lg:w-44 h-12 relative rounded-[10px] outline-2 outline-offset-[-2px] outline-white">
                  <Link
                    className="text-center justify-start text-white text-base font-semibold font-['Inter'] leading-6"
                    to="/cadastro"
                  >
                    Criar conta grátis
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center my-[1.5rem]">
          <div className="flex flex-col align-middle items-center py-[2.5rem]">
            <h2 className="text-center justify-start text-slate-800 text-4xl font-bold font-['Inter'] leading-10">
              Nossos Serviços
            </h2>
            <p className="text-center justify-start text-gray-600 text-lg font-normal font-['Inter'] leading-7">
              Tudo que seu pet precisa em um só lugar
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:px-[5rem] gap-4 justify-center items-center">
            <div className="flex flex-col gap-2 items-center align-middle w-72 lg:w-68 h-60 bg-white rounded-2xl justify-center shadow-lg">
              <img src="/img/Icon.png" alt="" />
              <h4 className="text-center justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                Banho e Tosa
              </h4>
              <p className="w-56 text-center justify-start text-gray-600 text-sm font-normal font-['Inter'] leading-5">
                Cuidados completos de higiene e beleza para seu pet
              </p>
              <Link
                className="text-center justify-start text-orange-500 text-sm font-medium font-['Inter'] leading-5"
                to="/login"
              >
                Entrar para agendar →
              </Link>
            </div>
            <div className="flex flex-col gap-2 items-center align-middle w-72 lg:w-68 h-60 bg-white rounded-2xl justify-center shadow-lg">
              <img src="/img/Icon (1).png" alt="" />
              <h4 className="text-center justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                Veterinário
              </h4>
              <p className="w-56 text-center justify-start text-gray-600 text-sm font-normal font-['Inter'] leading-5">
                Atendimento veterinário com profissionais qualificados
              </p>
              <Link
                className="text-center justify-start text-orange-500 text-sm font-medium font-['Inter'] leading-5"
                to="/login"
              >
                Entrar para agendar →
              </Link>
            </div>
            <div className="flex flex-col gap-2 items-center align-middle w-72 lg:w-68 h-60 bg-white rounded-2xl justify-center shadow-lg">
              <img src="/img/Icon (2).png" alt="" />
              <h4 className="text-center justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                Hotel Pet
              </h4>
              <p className="w-56 text-center justify-start text-gray-600 text-sm font-normal font-['Inter'] leading-5">
                Hospedagem confortável e segura para seu melhor amigo
              </p>
              <Link
                className="text-center justify-start text-orange-500 text-sm font-medium font-['Inter'] leading-5"
                to="/login"
              >
                Entrar para agendar →
              </Link>
            </div>
            <div className="flex flex-col gap-2 items-center align-middle w-72 lg:w-68 h-60 bg-white rounded-2xl justify-center shadow-lg">
              <img src="/img/Icon (3).png" alt="" />
              <h4 className="text-center justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                Pet Shop
              </h4>
              <p className="w-56 text-center justify-start text-gray-600 text-sm font-normal font-['Inter'] leading-5">
                Produtos de qualidade para alimentação e diversão
              </p>
              <Link
                className="text-center justify-start text-orange-500 text-sm font-medium font-['Inter'] leading-5"
                to="/login"
              >
                Entrar para agendar →
              </Link>
            </div>
          </div>
        </section>
        <section className="py-[2.5rem] flex flex-col justify-items-center ">
          <div className="flex flex-col align-middle items-center pb-[2.5rem]">
            <h2 className="text-center justify-start text-slate-800 text-4xl font-bold font-['Inter'] leading-10">
              Produtos em Destaque
            </h2>
            <p className="text-center justify-start text-gray-600 text-lg font-normal font-['Inter'] leading-7">
              Os melhores produtos para seu pet
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:px-[5rem] gap-4 justify-items-center items-center ">
            <div className="gap-[1rem] w-72 lg:w-68 self-stretch relative flex flex-col items-center align-middle shadow-lg bg-white rounded-2xl p-[1.5rem]">
              <img className="h-48 relative" src="/img/racao.webp" alt="" />
              <div>
                <h4 className="justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                  Ração Premium
                </h4>
                <p className="pb-[1rem] pt-[0.5rem] w-48 justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">
                  Fórmula balanceada para cães e gatos adultos, rica em proteínas...
                </p>
                <div className="flex justify-between">
                  <h5 className="justify-start text-orange-500 text-xl font-bold font-['Inter'] leading-7">R$ 89,90</h5>
                  <button className="text-center text-orange-700 text-xs font-semibold font-['Inter'] leading-4 w-14 h-7 px-3 py-1.5 bg-orange-100 rounded-[10px] inline-flex justify-start items-start">
                    <Link to="/login">Entrar</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="gap-[1rem] w-72 lg:w-68 self-stretch relative flex flex-col items-center align-middle shadow-lg bg-white rounded-2xl p-[1.5rem]">
              <img className="h-48 relative" src="/img/brinquedo.jpg" alt="" />
              <div>
                <h4 className="justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                  Brinquedo Interativo
                </h4>
                <p className="pb-[1rem] pt-[0.5rem] w-48 justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">
                  Estimula a inteligência e alivia o tédio do seu pet com horas de diversão...
                </p>
                <div className="flex justify-between">
                  <h5 className="justify-start text-orange-500 text-xl font-bold font-['Inter'] leading-7">R$ 34,90</h5>
                  <button className="text-center text-orange-700 text-xs font-semibold font-['Inter'] leading-4 w-14 h-7 px-3 py-1.5 bg-orange-100 rounded-[10px] inline-flex justify-start items-start">
                    <Link to="/login">Entrar</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-72 lg:w-68 self-stretch relative flex flex-col items-center align-middle shadow-lg bg-white rounded-2xl p-[1.5rem]">
              <img className="h-48 relative" src="/img/caminha.jpg" alt="" />
              <div>
                <h4 className="justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                  Cama Confortável
                </h4>
                <p className="pb-[1rem] pt-[0.5rem] w-48 justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">
                  Espuma de alta densidade com tecido macio e lavável, ideal para descanso...
                </p>
                <div className="flex justify-between">
                  <h5 className="justify-start text-orange-500 text-xl font-bold font-['Inter'] leading-7">
                    R$ 129,90
                  </h5>
                  <button className="text-center text-orange-700 text-xs font-semibold font-['Inter'] leading-4 w-14 h-7 px-3 py-1.5 bg-orange-100 rounded-[10px] inline-flex justify-start items-start">
                    <Link to="/login">Entrar</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-72 lg:w-68 self-stretch relative flex flex-col items-center align-middle shadow-lg bg-white rounded-2xl p-[1.5rem]">
              <img className="h-48 relative" src="/img/coleira.jpg" alt="" />
              <div>
                <h4 className="justify-start text-slate-800 text-lg font-bold font-['Inter'] leading-7">
                  Coleira Estilosa
                </h4>
                <p className="pb-[1rem] pt-[0.5rem] w-48 justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">
                  Coleira ajustável em nylon resistente com fivela de segurança e design moderno...
                </p>
                <div className="flex justify-between">
                  <h5 className="justify-start text-orange-500 text-xl font-bold font-['Inter'] leading-7">R$ 45,90</h5>
                  <button className="text-center text-orange-700 text-xs font-semibold font-['Inter'] leading-4 w-14 h-7 px-3 py-1.5 bg-orange-100 rounded-[10px] inline-flex justify-start items-start">
                    <Link to="/login">Entrar</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="lg:w-[18%] w-[90%] mx-auto my-[2rem] text-center justify-start text-white text-base font-semibold font-['Inter'] leading-6 self-stretch h-12 relative bg-orange-500 rounded-[10px] ">
            <a href="">Ir para Loja →</a>
          </button>
        </section>
        <section className="flex flex-col lg:mx-[5rem] lg:my-[4rem] lg:flex-row-reverse lg:gap-12 items-center">
          <div className="flex flex-col mx-[0.5rem] gap-[1rem]">
            <h4 className="justify-start text-slate-800 text-4xl font-bold font-['Inter'] leading-10">
              Sobre o HelloPet
            </h4>
            <p className="w-[95%] justify-start text-gray-700 text-base font-normal font-['Inter'] leading-6">
              Há mais de 10 anos cuidando do seu pet com muito amor e dedicação. Nossa equipe é formada por
              profissionais qualificados e apaixonados por animais.
            </p>
            <p className="w-[95%] justify-start text-gray-700 text-base font-normal font-['Inter'] leading-6">
              Oferecemos serviços completos de banho e tosa, atendimento veterinário, hotel para pets e uma loja com os
              melhores produtos do mercado.
            </p>
            <div className="flex">
              <img src="/img/coracao.png" alt="" />
              <p>Amor e cuidado em cada atendimento</p>
            </div>
            <div className="flex">
              <img src="/img/estrela.png" alt="" />
              <p>Profissionais qualificados</p>
            </div>
            <div className="flex ">
              <img src="/img/patinha.png" alt="" />
              <p>Mais de 5.000 pets atendidos</p>
            </div>
          </div>
          <img
            className="my-[1rem] w-[95%] lg:w-[50%] lg:h-[60vh] h-[30vh] relative rounded-2xl shadow-xl"
            src="/img/yorke.jpg"
            alt=""
          />
        </section>
      </main>
      <footer className="bg-slate-800 px-[0.5rem] lg:px-[5rem] py-[3rem] mt-[1rem]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2rem]">
          <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/img/patinha.png" alt="" />
              <h1 className="align-center text-white text-2xl font-bold font-['Inter'] leading-8 ">HelloPet</h1>
            </div>
            <p className="w-96 lg:w-[18rem] justify-start text-gray-300 text-base font-normal font-['Inter'] leading-6">
              Cuidando do seu pet com amor e dedicação desde 2014.
            </p>
            <button className="w-40 h-9 px-4 py-2 bg-orange-500 rounded-[10px] inline-flex justify-start items-start text-center text-white text-sm font-semibold font-['Inter'] leading-5">
              <Link to="/cadastro">Criar conta grátis</Link>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="align-center text-white text-2xl font-bold font-['Inter'] leading-8 ">Contato</h4>
            <div className="flex gap-2">
              <img src="/img/Telefone.png" alt="" />
              <p className="justify-start text-white text-base font-normal font-['Inter'] leading-6">(11) 98765-4321</p>
            </div>
            <div className="flex gap-2">
              <img src="/img/email.png" alt="" />
              <p className="justify-start text-white text-base font-normal font-['Inter'] leading-6">
                contato@hellopet.com.br
              </p>
            </div>
            <div className="flex gap-2">
              <img src="/img/local.png" alt="" />
              <p className="justify-start text-white text-base font-normal font-['Inter'] leading-6">
                Rua das Flores, 123 - São Paulo, SP
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="align-center text-white text-2xl font-bold font-['Inter'] leading-8 ">
              Horário de Funcionamento
            </h4>
            <p className="justify-start text-white text-base font-normal font-['Inter'] leading-6">
              Segunda a Sexta: 8h às 19h
            </p>
            <p className="justify-start text-white text-base font-normal font-['Inter'] leading-6">Sábado: 8h às 17h</p>
            <p className="justify-start text-white text-base font-normal font-['Inter'] leading-6">
              Domingo: 9h às 13h
            </p>
          </div>
        </div>
        <hr className="border-gray-400 my-[2rem]" />
        <p className="self-stretch text-center justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-5">
          &copy; 2026 HelloPet. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}

export default Home;
