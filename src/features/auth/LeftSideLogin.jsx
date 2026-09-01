import { IconMusic } from '@tabler/icons-react'
import { backgroundStyle } from '@/common/utils/classes'

function LeftSideLogin() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center 
            bg-slate-950 
            text-white px-16 h-full">      
      <div 
        style={backgroundStyle}
        className="p-5 rounded-2xl mb-8 shadow-lg"
      >
        <IconMusic size={36} />
      </div>

      <div className="text-slate-100 text-center max-w-md mb-6 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 space-y-2">
        <p className="text-lg">❤</p>
        <p className="font-mono text-sm leading-5">
          /\
          <br />
          (  )  ← joelho em modo guerreiro
          <br />
          \/
        </p>
        <p>
          Relatório oficial: o joelho está em manutenção premium e a recuperação está indo muito bem.
          Em breve, voltará mais forte, estiloso e 100% pronto para brilhar. Estou torcendo por você todos os dias.
        </p>
      </div>

      <h1 className="text-4xl font-serif font-semibold text-center mb-6">
        Sistema de <br /> Reposições
      </h1>

      <p className="text-slate-300 text-center max-w-md">
        Gerencie reposições de aula, alunos e músicas de forma simples e organizada.
      </p>
      
    </div>
  )
}

export default LeftSideLogin
