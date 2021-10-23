import App from './App.js'
import { Vue } from './modules.js'

const app = new Vue({
    render: h => h(App),
})

app.$mount("#app")