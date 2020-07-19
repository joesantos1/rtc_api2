import Rtbook from '@/components/Rtbook'
import ComunitBookTopic from '@/components/BookCommunityTopic'
import vlogin from '../services/auth'
import DashBoard from '@/components/dashboard/dash'
import LogoutUser from '@/components/LogoutUser'
import CreateRt from '@/components/CreateRt'

export default {
    rt: {
        path: '/rtbook/:id',
        name: 'RT',
        component: Rtbook,
        beforeEnter: async (to, from, next) => {
          try {
            const TOKEN_USER = await vlogin.authVerification()
                
            if(TOKEN_USER){
              next()
            }
          
          } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('_user');
            return next({name: 'Login'})
          }
        }
    },
    creatert: {
        path: '/creatert',
        name: 'creatert',
        component: CreateRt,
        beforeEnter: async (to, from, next) => {
          try {
            const TOKEN_USER = await vlogin.authVerification()
                
            if(TOKEN_USER){
              next()
            }
          
          } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('_user');
           
            return next({name: 'Login'})
          }
        }
    },
    bookcomunittopic: {
        path: '/community/topic/:id',
        name: 'bookcomunittopic',
        component: ComunitBookTopic,
        beforeEnter: async (to, from, next) => {
          try {
            const TOKEN_USER = await vlogin.authVerification()
                
            if(TOKEN_USER){
              next()
            }
          
          } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('_user');
           
            return next({name: 'Login'})
          }
        }
    },
    dash: {
        path: '/dashboard/:link',
        name: 'dash',
        component: DashBoard,
        beforeEnter: async (to, from, next) => {
          try {
            const TOKEN_USER = await vlogin.authVerification()
                
            if(TOKEN_USER){
              next()
            }
          
          } catch (error) {
            localStorage.removeItem('access_token');
            return location.replace('/')
            //next({name: 'Login'})
          }
        }
      },
      logout: {
        path: '/logout',
        name: 'Logout User',
        component: LogoutUser,
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('access_token')){
            localStorage.removeItem('access_token')
            localStorage.removeItem('_user')
            location.replace('/')
          }else{
            next({name: 'Home'})
          }
        }
      },
}