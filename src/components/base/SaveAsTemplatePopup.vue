<template>
  <v-popup :title="title" @close="$emit('click:close')" medium>
    <template v-slot:body>
      <div class="pa-4">
        <div class="form-section">
          <v-field v-model="saveTemplate.name" class="mb-4" label="Name" />
          <v-select
            v-model="saveTemplate.tags"
            class="mb-4"
            label="Category"
            mode="tags"
            :options="tags"
            allow-create
            searchable
          />
          <v-radio
            v-model="saveTemplate.is_type"
            value="popular"
            class="mb-4"
            label="Is popular?"
          />
          <v-radio
            v-model="saveTemplate.is_type"
            value="trend"
            label="Is trending?"
          />

          <div
            class="mt-4 border--gray-300 pa-2 rounded-md hover-bg--gray-50 pointer d-flex align-center favicon__wrapper"
            @click="$emit('show:select-image')"
          >
            <div class="favicon--empty" v-if="!saveTemplate.image_url">
              <v-icon name="add-image" height="24px" color="var(--gray-300)" />
            </div>
            <img :src="saveTemplate.image_url" v-else />
            <div class="ml-4">
              <p class="font-weight-medium">Template image</p>
              <p class="mt-1 text--gray-500">
                This is the image that will be associated with the template
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <v-button
        label="Cancel"
        variant="outlined"
        color="black"
        @click="$emit('click:close')"
      />
      <v-button label="Save" color="primary" @click="save" />
    </template>
  </v-popup>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VPopup: defineAsyncComponent(() => import('@/components/base/VPopup.vue')),
    ScrollArea: defineAsyncComponent(() =>
      import('@/components/shadcn/scroll-area/ScrollArea.vue'),
    ),
    VField: defineAsyncComponent(() => import('@/components/base/VField.vue')),
    VSelect: defineAsyncComponent(() =>
      import('@/components/base/VSelect.vue'),
    ),
    VRadio: defineAsyncComponent(() => import('@/components/base/VRadio.vue')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon.vue')),
    VButton: defineAsyncComponent(() =>
      import('@/components/base/VButton.vue'),
    ),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      saveTemplate: {
        name: '',
        tags: [],
        is_type: 'popular',
        image_url: '',
      },
      formData: new FormData(),
    }
  },
  methods: {
    save() {
      this.$emit('click:save', this.saveTemplate)
    },
  },
}
</script>

<style lang="scss" scoped>
.responsive-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>
