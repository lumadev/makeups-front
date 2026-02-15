import {
  IconSchool,
  IconUser,
  IconCheck,
  IconCalendarEvent,
  IconJoker,
  IconMusic,
} from '@tabler/icons-react'

export const menuItems = [
  { title: "Reposições", path: "/reposicoes", icon: <IconSchool size={20} />, evenodd: "true" },
  { title: "Concluídas", path: "/reposicoes-concluidas", icon: <IconCheck size={20} />, evenodd: "true" },
  { title: "Alunos", path: "/alunos", icon: <IconUser size={20} /> },
  { title: "Músicas de Alunos", path: "/musicas-alunos", icon: <IconMusic size={20} /> },
  { title: "Datas de Evento", path: "/datas-de-evento", icon: <IconCalendarEvent size={20} /> },
  { title: "Piadas", path: "/piadas", icon: <IconJoker size={20} /> },
]
