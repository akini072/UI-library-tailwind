<template>
  <label class="radio mr-3">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:model-value', $event.target.value)"
    />
    <span class="radiomark"></span>
    <span class="font-weight-medium text-capitalize">
      {{ label || value }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'VRadio',
  props: {
    modelValue: {
      type: [String, Boolean],
      required: false
    },
    label: {
      type: String
    },
    value: {
      type: String
    },
    name: {
      type: String
    }
  }
}
</script>

<style>
.radio {
  display: flex;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .radiomark {
    height: 18px;
    width: 18px;
    min-width: 18px;
    background-color: #fff;
    border: 1px solid var(--gray-300);
    border-radius: 100%;
    margin-right: 10px;
  }

  .radio input:checked ~ .radiomark {
    border-color: var(--primary-500);
  }

  .radiomark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .radio input:checked ~ .radiomark:after {
    display: block;
  }

  .radio .radiomark:after {
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary-500);
  }
}
</style>
