import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './main.css'

import { auth } from '../firebaseApp'
import { onAuthStateChanged } from 'firebase/auth'

let app;

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App);
        app.use(router).mount('#app');
    }
})
