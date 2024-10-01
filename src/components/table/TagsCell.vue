<template>
  <div class="d-flex">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="px-1 bg--gray-100 text-capitalize mr-2 rounded-sm"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
    },
  },
  computed: {
    items() {
      const totalTags = this.value.length
      let tags = this.value

      if (totalTags > 3) {
        tags = tags.slice(0, 2)
        tags.push(`${totalTags - 2}+`)
      }

      return tags
    },
  },
}
</script>
