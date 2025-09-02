import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@renderer/views/HomeView.vue'
import AboutView from '@renderer/views/AboutView.vue'
import layout from '@renderer/layout';

const routes = [
    { 
        path: '',
        component: layout,
        redirect: '/index',
        children: [
           {
                path: '/index',
                component: () => import('@renderer/views/HomeView.vue'),
                name: 'Index',
           }

        ]
    },
    { 
        path: '/about', 
        component: AboutView 
    },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;