<template>
  <v-popup :title="title" width="1380px" @close="close">
    <template v-slot:body>
      <div class="d-grid layout-new-funnel">
        <div class="py-4 px-2 border-b">
          <v-field
            v-model="searchTemplate"
            height="20px"
            icon="search"
            icon-color="var(--gray-500)"
            icon-size="14px"
            variant="plain"
            size="small"
            placeholder="Search"
            no-input-padding
          />
        </div>
        <div class="border-b">
          <templates-menu
            class="py-1"
            :current-option="menuTemplateSelected"
            @selected:option="menuTemplateSelected = $event"
          />
        </div>
        <scroll-area class="templates__section">
          <div class="d-grid column-4 pt-5 px-5 pb-10">
            <slot
              name="template-cards"
              :filtered-templates="filteredTemplates"
            />
          </div>
        </scroll-area>
        <scroll-area class="template-details__section pt-3">
          <slot name="template-details" />
        </scroll-area>
      </div>
    </template>
  </v-popup>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VPopup: defineAsyncComponent(() => import('@/components/base/VPopup')),
    VField: defineAsyncComponent(() => import('@/components/base/VField')),
    ScrollArea: defineAsyncComponent(() =>
      import('@/components/shadcn/scroll-area/ScrollArea.vue'),
    ),
    TemplatesMenu: defineAsyncComponent(() => import('./TemplatesMenu.vue')),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    templates: {
      type: Array,
      required: true,
    },
    templateSteps: {
      type: Array,
    },
    emptyCard: {
      type: Object,
      default: () => ({
        id: 'empty',
        name: 'Empty Funnel',
        description:
          'Start building your funnel from scratch, you can add steps to it once created...',
        button: 'Create funnel',
      }),
    },
  },
  data() {
    return {
      searchTemplate: '',
      menuTemplateSelected: 'all',
    }
  },

  watch: {
    isMobile(value) {
      if (value) this.menuTemplateSelected = 'all'
    },
    filteredTemplates: {
      handler(list) {
        this.$emit('select:template', list[0] || this.emptyCard)
      },
    },
  },
  computed: {
    isMobile() {
      return this.$screenSize.width <= 620
    },
    filteredTemplates() {
      let templates = JSON.parse(JSON.stringify(this.templates))
      const option = this.menuTemplateSelected

      if (option === 'like') {
        templates = templates.filter(({ liked }) => liked)
      } else if (option === 'trending') {
        templates = templates
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)
      } else if (option === 'popular') {
        templates = templates.sort((a, b) => b.uses - a.uses).slice(0, 5)
      } else if (option !== 'all') {
        templates = templates.filter(({ tags }) =>
          tags.split(',').includes(option),
        )
      }
      return templates.filter(({ name }) =>
        new RegExp(this.searchTemplate, 'i').test(name),
      )
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  mounted() {
    this.$emit('select:template', this.filteredTemplates[0] || this.emptyCard)
  },
}
</script>

<style lang="scss" scoped>
.column-4 {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 30px 20px;
}
.layout-new-funnel {
  display: grid;
  overflow: hidden;
  grid-template:
    'search details'
    'categories details'
    'templates details'
    / minmax(280px, auto) minmax(290px, 318px);

  .search-template__input {
    height: 20px;
  }
  .templates__section {
    grid-area: templates;
    height: calc(90vh - 170px);
    max-height: calc(855px - 150px);
  }

  .template-details__section {
    grid-area: details;
    border-left: 1px solid var(--gray-200);
  }
}
@media screen and (max-width: 620px) {
  .layout-new-funnel {
    grid-template:
      'search'
      'categories'
      'templates'
      'details' 1fr
      / 100%;

    .templates__section {
      height: calc(90vh - 360px);
      max-height: calc(855px - 360px);
      border-bottom: 1px solid var(--gray-200);
    }
    .template-details__section {
      border-left: none;
    }
  }
}
</style>
