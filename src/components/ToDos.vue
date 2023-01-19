<script setup>
import {ref, onMounted, computed, watch } from 'vue'

const toDos = ref([])

const toDo_input_content = ref('')


const toDos_asc = computed(()=> toDos.value.sort((a,b) => {
	return b.createdAt - a.createdAt
}))

const addToDo = (createdAt, noteContent) => {
	if(toDo_input_content.value.trim() === '') {
		return
	} 
	const notes = JSON.parse(localStorage.getItem('notes'))
	const note = notes.find(n => n.createdAt == createdAt)

	toDos.value.push({
		noteCreatedAt: createdAt,
		noteContent:noteContent,
		content:toDo_input_content.value,
		done: false,
		createdAt: new Date().getTime()
	})
	toDo_input_content.value = ''

	localStorage.setItem('notes', JSON.stringify(notes))
}

const removeToDo = (toDo) => {
	toDos.value = toDos.value.filter(t => t !== toDo)
}

watch(toDos, newVal => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {deep:true})

onMounted(() => {
	toDos.value = JSON.parse(localStorage.getItem('todos')) || []
})


</script>

<template>
 <main class="app">

	<section class="greeting">
		<h2 class="title">
			toDo list from {{$route.params.content}}
		</h2>
	</section>

	<section class="create-todo">
		<h3>Create toDo</h3>
		<form  @submit.prevent="(() => addToDo($route.params.createdAt,$route.params.content))">
			<h4>What's on your toDo?</h4>
			<input  type="text" 
					placeholder="e.g. home todos"
					v-model="toDo_input_content">
			<input type="submit" value="add toDo"/>
		</form>
	</section>

	<section class="todo-list">
		<h3>toDos: </h3>
			<div class="list">
				<div :key="toDo.createdAt"
					v-for="toDo in toDos_asc"
					v-show="toDo.noteCreatedAt == $route.params.createdAt"
					:class="`todo-item ${toDo.done && 'done'}`">
						<label>
							<input type="checkbox" v-model="toDo.done"/>
						</label>
						<div class="todo-content">
							<input type="text" v-model="toDo.content">
						</div>
						<div class="actions">
							<button class="delete" @click="removeToDo(toDo)">Delete</button>
						</div>
				</div>
			</div>
	</section>

 </main>
</template>

