import { http } from './config'

export default {
    listaRTS:(id) => {
        return http.get('/rts/' + id)
    }
}