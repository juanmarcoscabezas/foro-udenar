import { router } from "./router/router.js";



const App = new Vue({
    el: '#app',
    router
}).$mount('#app');

//router.start(App, 'body');