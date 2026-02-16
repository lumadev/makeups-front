import {
  IconSchool,
  IconUser,
  IconCheck,
  IconCalendarEvent,
  IconJoker,
  IconMusic,
} from '@tabler/icons-react'

/**
 * allowedRoles: null = visível para todos; array = apenas esses tipos (ex: ['admin', 'full'])
 * highlight: destaque visual nos dois primeiros itens (estilo evenodd)
 */
export const menuItems = [
  { title: 'Reposições', path: '/reposicoes', icon: IconSchool, allowedRoles: ['admin', 'full'], highlight: true },
  { title: 'Concluídas', path: '/reposicoes-concluidas', icon: IconCheck, allowedRoles: ['admin', 'full'], highlight: true },
  { title: 'Alunos', path: '/alunos', icon: IconUser, allowedRoles: ['admin', 'full'] },
  { title: 'Músicas de Alunos', path: '/musicas-alunos', icon: IconMusic, allowedRoles: ['admin', 'full'] },
  { title: 'Datas de Evento', path: '/datas-de-evento', icon: IconCalendarEvent, allowedRoles: ['admin', 'full'] },
  { title: 'Piadas', path: '/piadas', icon: IconJoker, allowedRoles: null }, // null = todos
]
