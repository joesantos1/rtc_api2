import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Bookinfor from '@/components/Bookinfor'
import LoginUser from '@/components/LoginUser'
import CadastroUser from '@/components/CadastroUser'
import Suporte from '@/components/Suporte'
import Rts from '@/components/Rts'
import Comunit from '@/components/Comunidade'
import ComunitBook from '@/components/BookCommunity'
import Premium from '@/components/Premium'

import vlogin from '../services/auth'
import routesUser from './users'

Vue.use(Router)
  
export default new Router({

  routes: [
    routesUser.rt,
    routesUser.bookcomunittopic,
    routesUser.dash,
    routesUser.logout,
    routesUser.creatert,
    {
      path: '/login',
      name: 'Login',
      component: LoginUser,
      beforeEnter: async (to, from, next) => {
        try {
          const TOKEN_USER = await vlogin.authVerification()
              
          if(TOKEN_USER){
            next({name: '/'})
          }
        
        } catch (error) {
          next()
        }
      }
    },
    {
      path: '/cadastro',
      name: 'Cadastro de Usuário',
      component: CadastroUser,
      beforeEnter: async (to, from, next) => {
        try {
          var TOKEN_USER = await vlogin.authVerification()
              
          if(TOKEN_USER){
            next({name: '/'})
          }
        
        } catch (error) {
          next()
        }
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    
    {
      path: '/bookinfor/:id',
      name: 'Informações do Book',
      component: Bookinfor
    },
    {
      path: '/ajuda',
      name: 'Página de Ajuda e Suporte',
      component: Suporte
    },
    {
      path: '/rts/:id',
      name: 'rts',
      component: Rts
    },
    {
      path: '/comunidade',
      name: 'comunit',
      component: Comunit
    },
    {
      path: '/bookcommunity/:id',
      name: 'bookcomunit',
      component: ComunitBook
    },
    {
      path: '/premium',
      name: 'premium',
      component: Premium
    }
    
  ]
})