import { http } from './config'

const TOKEN_USER = localStorage.getItem('access_token');
const authUser = 'Bearer '.concat(TOKEN_USER);

export default {
    listarComunidade:() => {
        return http.get('/comunity')
    },
    listarComuniTopics:(id) => {

        if(TOKEN_USER){
            return http.get('/ubookcommunity/' + id, { headers: {
                authorization: authUser
            }})
        }

        return http.get('/bookcommunity/' + id)
    },
    criaComuniTopics:(dados) => {
        return http.post('/createtopics',dados, { headers: {
            authorization: authUser
        }})
    },
    enviaNovaMsg:(dados) => {
        return http.post('/createtopicmsg',dados, { headers: {
            authorization: authUser
        }})
    },
    listarTopicMsgs:(id) => {
        return http.get('/bookcommunitytopic/' + id, { headers: {
            authorization: authUser
        }})
    },
}