import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import { disableDevTools, clearConsoleOnOpen } from './utils/devtools';

if (import.meta.env.PROD) {
  disableDevTools();
  clearConsoleOnOpen();
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');