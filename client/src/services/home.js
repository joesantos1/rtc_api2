import { http } from './config'

export default {
    listarHome:() => {
        return http.get('/')
    }
}