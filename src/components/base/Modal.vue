<template>
  <div v-if="isOpen" class="modal-mask" @click="handleOutsideClick">
    <div class="modal-container" ref="target">
      <div class="modal-container__header">
        <h3>{{ headerText }}</h3>
        <div class="exit">
          <v-icon
            name="close"
            height="14px"
            color="var(--gray-500)"
          />
        </div>
      </div>
      <div class="modal-container__sub-header">
        <slot name="subHeader"></slot>
      </div>
      <div class="modal-container__content">
        <slot name="content"></slot>
      </div>
      <div class="modal-container__footer">
        <div class="buttons-group">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VIcon from "./VIcon.vue"

export default {
  components: { VIcon },
  props: {
    isOpen: Boolean,
    headerText: String,
    nextStep: Function,
    modalClose: Function
  },
  mounted() {
    // Bind click event listener to modal mask when component is mounted
    this.$el.addEventListener("click", this.handleOutsideClick)
  },
  beforeUnmount() {
    // Unbind click event listener when component is unmounted
    this.$el.removeEventListener("click", this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(event) {
      // Check if the click target is outside the modal container
      if (event.target === this.$el) {
        this.modalClose()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(37, 42, 50, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}
.modal-container {
  width: 740px; // width prop
  background-color: white;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(206, 207, 216, 0.32);
    padding: 6px 12px;

    h3 {
      font-size: 16px;
      font-weight: 500;
    }

    .exit {
      margin-left: auto;
      padding: 5px;
      &:hover {
        background: #f5f5f5;
        cursor: pointer;
        border-radius: 5px;
      }
    }
  }

  &__sub-header {
    padding: 0 20px;
    margin-top: 16px;
    display: flex;
    align-items: center;
  }

  &__content {
    padding: 15px 0 10px 0;
  }

  &__footer {
    border-top: 1px solid rgba(206, 207, 216, 0.32);
  }

  .buttons-group {
    padding: 10px 20px;
    border-top: 1px solid rgba(206, 207, 216, 0.32);
    display: flex;
    align-items: center;
    gap: 30px;
    justify-content: flex-end;
  }
}
</style>
