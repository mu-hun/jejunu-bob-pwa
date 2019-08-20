import Vue from 'vue'
import App from './App.vue'
import './registerSW'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)


Vue.config.productionTip = false

new Vue({
    render: function(h) {
        return h(App)
    }
}).$mount('#app')
