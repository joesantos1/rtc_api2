import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    cadUser: async (dados) => {
        const urlServer = '/cadastrouser'
        return await http.post(urlServer, dados)
    },
    updUser: async (dados) => {
        const urlServer = '/updateuser'

        if(TOKEN_USER){
            return await http.put(urlServer, dados, { headers: {
                authorization: authUser
            }})
        }else{
            return status(401)
        }
        
    },
    updUserPass: async (dados) => {
        const urlServer = '/updateuserpass'

        if(TOKEN_USER){
            return await http.put(urlServer, dados, { headers: {
                authorization: authUser
            }})
        }else{
            return status(401)
        }
        
    },
    dataUser: async () => {
        const urlServer = '/datauser'

        if(TOKEN_USER){
            return await http.get(urlServer, { headers: {
                authorization: authUser
            }})
        }else{
            return status(404)
        }
        
    }
}