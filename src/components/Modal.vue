<template>
  <div class="vue-modal" v-show="open">
      <transition name="fade">
        <div class="veu-modal-inner"  v-show="open">
          <div class="vue-modal-content">
			 <slot name="body">
			</slot>
            <slot name="buttons">
            	<button type="button"  class="outline white-green" @click='close'>No</button>
			</slot>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    }
	// note: {
    //   type: Number,
    //   required: ''
    // }
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };
    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));
    return { close };
  },
};
</script>

<style  scoped>
button {
	appearance: none;
	border: 1px solid black;
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