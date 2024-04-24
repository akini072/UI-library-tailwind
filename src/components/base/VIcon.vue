<template>
  <div class="icon d-flex" v-html="styledSvgContent" />
</template>

<script>
export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    height: {
      type: String,
      default: '20px'
    },
    width: {
      type: String,
      default: ''
    },
    folder: {
      type: String,
      default: 'icons'
    }
  },
  data() {
    return {
      svgContent: ''
    }
  },
  computed: {
    styledSvgContent() {
      return this.svgContent.replace(
        '<svg',
        `<svg color="${this.color || 'none'}" height="${this.height}" width="${this.width || this.height}"`
      )
    }
  },
  methods: {
    getUrl(name) {
      return new URL(`../../assets/icons/${this.name}.svg`, import.meta.url)
    }
  },
  async mounted() {
    try {
      const response = await fetch(this.getUrl())
      this.svgContent = await response.text()
    } catch (error) {
      this.$error(error)
    }
  }
}
</script>
