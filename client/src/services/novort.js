import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    novoRt:(dados) => {
        return http.post('/newrt', dados, { headers: {
            authorization: authUser
        }})
    },
    ListaBooks:() => {
        return http.get('/listabooksnewrt', { headers: {
            authorization: authUser
        }})
    }
}