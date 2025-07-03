
function Login() {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen dark:bg-gray-900">
      <div className="w-full max-w-md px-6 flex flex-col justify-center min-h-screen">  
        <div className="mt-12 mx-auto w-full max-w-sm">
          <h1 className="text-3xl font-bold text-zinc-950 dark:text-white mb-2">
            Reposições
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Sistema de Reposições
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-950 dark:text-white mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-lg border border-zinc-200 bg-white dark:bg-transparent dark:border-zinc-800 px-4 py-3 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-zinc-950 dark:text-white mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-200 bg-white dark:bg-transparent dark:border-zinc-800 px-4 py-3 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 text-sm font-medium text-white bg-teal-400 hover:bg-teal-500 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      <p className="mt-16 text-sm text-zinc-950 dark:text-white text-center">
        Formulário de autenticação inspirado no&nbsp;
        <a
          href="https://horizon-ui.com/shadcn-ui?ref=twcomponents"
          target="_blank"
          className="text-teal-500 font-bold"
          rel="noreferrer"
        >
          Horizon UI Boilerplate
        </a>
      </p>
    </div>
  );
}

export default Login