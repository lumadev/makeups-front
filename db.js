import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('db.json')
const db = new Low(adapter, { alunos: [] })

async function initDB() {
  await db.read()

  // ✅ Inicializa a estrutura se ainda não houver nada
  if (!db.data) {
    db.data = { alunos: [] }
    await db.write() // escreve os dados iniciais
  }
}

export async function adicionaAluno() {
  await initDB()

  db.data.alunos.push({ id: Date.now(), name: 'Luma' })
  await db.write()

  console.log('alunos:', db.data.alunos)
}

adicionaAluno()