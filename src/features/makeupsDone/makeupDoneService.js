import { api } from "@/services/api"

const listMakeupsDone = () => {
  return api.get('/makeups-done')
}

export { 
  listMakeupsDone,
}