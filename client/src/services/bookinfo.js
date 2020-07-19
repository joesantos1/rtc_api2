import { http } from './config'

export default {
    listarInfor: (id) => {
        return http.get('/bookinfor/' + id)
    }
}