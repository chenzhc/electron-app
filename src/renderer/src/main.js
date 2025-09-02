import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@renderer/assets/styles/index.scss' // global css

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router);

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'small' , 
  zIndex: 3000 
});

app.mount('#app')
