import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Collection from '../components/Collection.vue'
import Upload from '../components/Upload.vue'
import Auth from '../components/Auth.vue'
import Search from '../components/Search.vue'


export default new VueRouter({
  routes:[
    {path: '/', component: Home},
    {path: '/collection', component: Collection},
    {path: '/upload', component: Upload},
    {path: '/auth', component: Auth},
    {path: '/search', component: Search},
  ],
  mode: 'history'
})

