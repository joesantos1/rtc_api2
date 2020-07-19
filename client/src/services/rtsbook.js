import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    listarInfor: (id) => {
        const urlServer = '/rtbook/' + id
        return http.get(urlServer, { headers: {
            authorization: authUser
        }})
    },
    salvaRt: (id) => {
        //console.log(authUser)
        return http.post('/addrt/', id, { headers: {
            authorization: authUser
        }})
    }
}