import Vue from 'vue'
import App from './App.vue'
// import './registerSW'
import VueMaterial from 'vue-material'
import {
    MdButton,
    MdIcon,
    MdContent,
    MdToolbar,
    MdBottomBar,
    MdDialog,
    MdSwitch
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import './styles/theme.scss'

Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdBottomBar)
Vue.use(MdDialog)
Vue.use(MdSwitch)

Vue.config.productionTip = false

new Vue({
    render: function(h) {
        return h(App)
    }
}).$mount('#app')
