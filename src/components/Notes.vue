<script setup>
import {ref, onMounted, computed, watch } from 'vue'

const notes = ref([])

const note_input_content = ref('')


const notes_asc = computed(()=> notes.value.sort((a,b) => {
	return b.createdAt - a.createdAt
}))

const addNote = () => {
	if(note_input_content.value.trim() === '') {
		return
	} 
	notes.value.push({
		content:note_input_content.value,
		done: false,
		createdAt: new Date().getTime()
	})
	note_input_content.value = ''
}

const removeNote = (note) => {
	notes.value = notes.value.filter(t => t !== note)
}

watch(notes, newVal => {
	localStorage.setItem('notes', JSON.stringify(newVal))
}, {deep:true})

onMounted(() => {
	notes.value = JSON.parse(localStorage.getItem('notes')) || []
})
</script>

<template>
 <main class="app">

	<section class="greeting">
		<h2 class="title">
			Note list
		</h2>
	</section>

	<section class="create-todo">
		<h3>Create note</h3>
		<form  @submit.prevent="addNote">
			<h4>What's on your note?</h4>
			<input  type="text" 
					placeholder="e.g. home todos"
					v-model="note_input_content">
			<input type="submit" value="add note"/>
		</form>
	</section>

	<section class="todo-list">
		<h3>Notes</h3>
			<div class="list">
				<div :key="note.createdAt"
					v-for="note in notes_asc"
					:class="`todo-item ${note.done && 'done'}`">
						<label>
							<input type="checkbox" v-model="note.done"/>
						</label>
						<div class="todo-content">
							<input type="text" v-model="note.content">
						</div>
						<div class="actions">
							<button class="edit" @click="$router.push(`/note/${note.content}/${note.createdAt}`)">Edit</button>
							<button class="delete" @click="removeNote(note)">Delete</button>
						</div>
				</div>
			</div>
	</section>

 </main>
</template>

