import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    authUser: async (dados) => {
        const urlServer = '/userauth'
        return await http.post(urlServer, dados)
    },
    authVerification: async () => {
        const urlServer = '/authvuser'

        if(TOKEN_USER){
        
            return await http.get(urlServer, { headers: {
                authorization: authUser
            }})

        }else{
            
            return status(400)
        }
        
    }
}