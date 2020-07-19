import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    regisLike:(dados) => {
        return http.post('/rl', dados, { headers: {
            authorization: authUser
        }})
    },
    regisComplaint:(dados) => {
        return http.post('/rc', dados, { headers: {
            authorization: authUser
        }})
    },
}