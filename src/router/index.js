import {createRouter, createWebHistory} from 'vue-router'
import Notes from '../components/Notes.vue'
import ToDos from '../components/ToDos.vue'

const routes = [
	{path: '/', name: Notes, component: Notes},
	{path: '/note/:content/:createdAt', name: ToDos, component: ToDos},
]

const router = createRouter ({
	history: createWebHistory(),
	routes
})

export default router
