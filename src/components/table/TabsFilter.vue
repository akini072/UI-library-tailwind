<template>
  <div class="bg--gray-100 rounded py-1 d-flex">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab__btn mx-1 py-1 px-3 rounded-md font-weight-bold pointer text--gray-500"
      :class="{
        active: activeTab === tab.id,
      }"
      @click="handleClickTab(tab)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    defaultActive: {
      type: [String, Number],
      default: 'all'
    }
  },
  data() {
    return {
      activeTab: '',
    }
  },
  methods: {
    handleClickTab(tab) {
      this.activeTab = tab.id

      this.$emit('update:tabs', this.activeTab)
    },
  },
  mounted() {
    this.activeTab = this.defaultActive
  }
}
</script>

<style lang="scss" scoped>
.tab__btn {
  transition: 200ms all ease;
  &.active {
    box-shadow:
      0px 1px 3px 0px rgba(16, 24, 40, 0.1),
      0px 1px 2px 0px rgba(16, 24, 40, 0.06);
    background-color: white;
    color: var(--gray-700);
  }
}
</style>
