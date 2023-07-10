import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')




// import Vue from 'vue';
// import App from './App.vue';
// import router from './router'; // Импортируйте созданный вами файл маршрутизации

// Vue.config.productionTip = false;

// new Vue({
//   router, // Подключите маршрутизацию к основному экземпляру Vue
//   render: h => h(App)
// }).$mount('#app');




// export default {
//     computed: {
//       username() {
//         // Мы скоро разберём что такое `params`
//         return this.$route.params.username
//       }
//     },
//     methods: {
//       goBack() {
//         window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
//       }
//     }
//   }