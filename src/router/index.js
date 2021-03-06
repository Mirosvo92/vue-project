import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Collection from '../components/Collection.vue';
import Upload from '../components/Upload.vue';
import Auth from '../components/Auth.vue';
import Search from '../components/Search.vue';
import CreateAccount from '../components/CreateAccount.vue';
import PrivateRoom from '../components/PrivateRoom.vue';
import AuthGuard from './auth-guard';


export default new VueRouter({
  routes:[
    {path: '/', component: Home},
    {path: '/collection', component: Collection},
    {path: '/upload', component: Upload},
    {path: '/auth', component: Auth},
    {path: '/search', component: Search},
    {path: '/create-account', component: CreateAccount},
    {path: '/private-room', component: PrivateRoom,  beforeEnter: AuthGuard},
  ],
  mode: 'history'
})
