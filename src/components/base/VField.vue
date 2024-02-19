<template>
  <div :class="$props.class">
    <fieldset
      :class="`${variant} ${isActive ? 'active' : ''}`"
      :style="{
        width,
        height,
        maxWidth,
        minWidth
      }"
    >
      <v-icon
        class="mx-3 my-2"
        :name="icon"
        :size="iconSize"
        :color="isActive ? 'var(--primary-500)' : iconColor"
      />
      <input
        :class="{ 'px-4': !noInputPadding }"
        :autocomplete="autocomplete"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isActive = true"
        @blur="isActive = false"
      />
    </fieldset>
  </div>
</template>
<script>
import VIcon from "./VIcon"

export default {
  name: 'VField',
  components: { VIcon },
  props: {
    class: {
      type: String
    },
    variant: {
      type: String,
      default: "default",
      validator: function (value) {
        return ["default", "plain"].includes(value)
      }
    },
    noInputPadding: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: () => null
    },
    iconColor: {
      type: String,
      required: false,
      default: "var(--gray-300)"
    },
    iconSize: {
      type: String,
      required: false,
      default: "20px"
    },
    placeholder: {
      type: String,
      required: false,
      default: () => null
    },
    autocomplete: {
      type: String,
      required: false,
      default: () => null
    },
    type: {
      type: String,
      required: false,
      default: () => null
    },
    modelValue: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    minWidth: {
      type: String
    },
    maxWidth: {
      type: String
    }
  },
  data() {
    return {
      isActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-color: var(--gray-200);
  border-radius: 8px;
	height: 41px;
	transition: 0.15s all ease-in-out;
  padding: 0;
  margin: 0;
  
  &:not(.plain):hover {
		border: 2px solid var(--gray-300);
  }
  input {
    border-radius: 6px;
    height: 100%;
    width: 100%;
    display: flex;
    flex: 1;
    color: var(--gray-500);
    &::placeholder {
      color: var(--gray-300);
    }
  }

  &.plain {
    border: 0px;
  }

  &.active {
    border-color: var(--primary-500)!important;
  }
}
</style>