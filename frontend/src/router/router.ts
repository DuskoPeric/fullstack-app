import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/LoginView.vue'
import Confirm from '../views/ConfirmView.vue'
import ResetPassword from '../views/ResetPassword.vue'
import NewPassword from '../views/NewPassword.vue'

const router= createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/login', name:"Login", component:Login
        },
        {
            path:'/:token/confirm', name:"Confirm", component:Confirm, props: true,
        },
        {
            path:'/reset-password',
            children: [
                {
                    path: '',
                    component:ResetPassword,
                    props: true,
                },
                {
                  path: ':token/new-password',
                  component:NewPassword,
                  props: true,
                },
            ],
        },
]
})
export default router;