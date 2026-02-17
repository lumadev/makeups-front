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
