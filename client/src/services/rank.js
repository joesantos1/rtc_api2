import { http } from './config'

export default {
    listaRank:() => {
        return http.get('/rank')
    }
}