<script setup>
import Modal from "./Modal.vue"
import {ref, onMounted, computed, watch  } from 'vue'

const notes = ref([])

const note_input_content = ref('')

const isOpen = ref(false);
// const note = ref({});

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

const openModel = (note) =>{
	isOpen = true
}

// export default {
	// name: 'Notes',
	// components: { Modal }

// 	setup() {
// 		const isOpen = ref(false);
// 		return { isOpen };
//   	}
// }
</script>

<template>
 <main class="app">
	<Modal :open="isOpen" @close="isOpen = !isOpen">
		<template v-slot:body>
			<p style="text-align: center; margin-bottom: 10px">
				Are you sure?
			</p>
		</template>

		<template v-slot:buttons>
			<button class="outline white-green" @click="removeNote(note)" :note="note">Yes</button>
			<button class="outline white-green" @click="isOpen = !isOpen">No</button>
		</template>
		
	</Modal>
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
							<!-- <button class="delete" @click="removeNote(note)">Delete</button> -->
							<button class="delete" @click="isOpen=!isOpen">Delete</button>
						</div>
				</div>
			</div>
	</section>

 </main>
</template>
<style  >
button {
	appearance: none;
	/* border: 1px solid black; */
	outline: none;
	background: green;
	cursor: pointer;
}
button.outline {
	position: relative;
	z-index: 3;
	background: transparent;
	color: #1172c4;
	font-size: 14px;
	border-color: #1172c4;
	border-style: solid;
	border-width: 2px;
	border-radius: 22px;
	padding: 10px 40px;
	text-transform: uppercase;
	transition: all 0.2s linear;
}
button.outline:hover {
	color: white;
	background: #1172c4;
	border-color: white;
	transition: all 0.2s linear;
}
button.outline:active {
	border-radius: 22px;
}
button.white-green {
	font-weight: 700;
	color: #7dc21e;
	border-color: white;
	background: white;
}
button.white-green:hover {
	color: white;
	background: #7dc21e;
	border-color: white;
}
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.vue-modal-content {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 260px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translate(0, -100px);
}
</style>