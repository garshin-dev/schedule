import '@/shared/assets/styles/index.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/app/index.vue'
import router from '@/app/provides/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

export { app }
