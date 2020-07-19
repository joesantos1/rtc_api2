import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    listaRTS: async () => {
        const urlServer = '/userpainel'

        if(TOKEN_USER){
        
            return await http.get(urlServer, { headers: {
                authorization: authUser
            }})

        }else{
            
            return status(400)
        }
        
    },
    ListaQuestions: async () => {
        const urlServer = '/userpainelquestions'

        if(TOKEN_USER){
        
            return await http.get(urlServer, { headers: {
                authorization: authUser
            }})

        }else{
            
            return status(400)
        }
        
    }
}