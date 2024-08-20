<template>
  <div>
    <loading v-if="loadingNew" style="opacity: 0.7" />
    <div v-if="isEmpty" class="px-5">
      <div class="font-weight-medium text--gray-700">
        {{ template.name }}
      </div>
      <template-card
        v-if="allowPreview"
        class="d-flex align-center justify-center mt-3"
        is-empty
        static
      />
      <v-button color="primary" class="my-4" :loading="loadingCreate" @click="useTemplate">
        Create
      </v-button>
    </div>
    <template v-else>
      <div class="d-flex align-center mb-4 px-5">
        <div>
          <div v-if="!hideName" class="mb-2 font-weight-medium text--gray-700">
            {{ template.name }}
          </div>
          <div class="d-flex">
            <h6 class="mr-3 d-flex">
              <v-icon
                name="laptop"
                class="mr-1"
                color="var(--primary-500)"
                height="16px"
              />
              {{ shortValue(template.uses) }} uses
            </h6>
            <h6 class="d-flex">
              <v-icon
                v-if="template.liked"
                name="heart-full"
                color="var(--primary-500)"
                height="14px"
                class="mr-1"
              />
              <v-icon
                v-else
                name="heart"
                color="var(--primary-500)"
                height="16px"
                class="mr-1"
              />
              {{ shortValue(template.likes) }} likes
            </h6>
          </div>
        </div>
        <v-button
          class="like__button ml-auto"
          variant="outlined"
          size="large"
          icon
          :color="template.liked ? '' : ''"
          :loading="loadingLike"
          @click="like"
        >
          <v-icon
            v-if="template.liked"
            name="heart-full"
            color="var(--primary-500)"
            height="18px"
          />
          <v-icon
            v-else
            name="heart"
            color="var(--primary-500)"
            height="20px"
          />
        </v-button>
      </div>
      <div class="d-flex flex-wrap mb-5 px-5">
        <v-button
          color="primary"
          class="mr-3 flex-grow"
          size="medium"
          :loading="loadingCreate"
          @click="useTemplate"
        >
          Use Template
        </v-button>
        <v-button @click="previewTemplate" size="medium" class="flex-grow mr-1">
          Preview
        </v-button>
      </div>
      <div v-if="allowPreview" class="preview__section">
        <div class="divider" />
        <tabs
          :tabs="stepPreviewTabs"
          :current-tab="currentStepPreview"
          @selected:tab="
            getPreviewThumbnail({ step: $event, mode: deviceMode })
          "
        />
        <div v-if="stepPreviewTabs.length > 0" class="device__switch">
          <v-button
            icon
            v-bind="getDeviceButtonProps('desktop')"
            @click="
              getPreviewThumbnail({
                mode: 'desktop',
                step: currentStepPreview,
              })
            "
          >
            <v-icon
              name="desktop"
              height="14px"
              :color="isDesktopDeviceMode ? '' : 'var(--gray-500)'"
            />
          </v-button>
          <v-button
            class="ml-2"
            v-bind="getDeviceButtonProps('mobile')"
            icon
            @click="
              getPreviewThumbnail({
                mode: 'mobile',
                step: currentStepPreview,
              })
            "
          >
            <v-icon
              name="phone"
              height="14px"
              :color="isDesktopDeviceMode ? 'var(--gray-500)' : ''"
            />
          </v-button>
        </div>
        <scroll-area
          class="px-5 pt-1"
          :height="stepsHeight ? stepsHeight : 'calc(100vh - 230px)'"
          :max-height="stepsHeight ? stepsMaxHeight : 'calc(100vh - 230px)'"
        >
          <div class="rounded border step-thumbnail mb-4 mt-3">
            <slot
              name="thumbnail-preview"
              :mode="deviceMode"
              :step="currentStepPreview"
            />
          </div>
          <div class="pb-6" />
        </scroll-area>
      </div>
    </template>
  </div>
</template>

<script>
import shortValue from '@/helpers/shortValue'
import stepTypes from '@/helpers/stepTypes'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    Loading: defineAsyncComponent(() => import('@/components/base/Loading')),
    ScrollArea: defineAsyncComponent(() =>
      import('@/components/shadcn/scroll-area/ScrollArea.vue'),
    ),
    TemplateCard: defineAsyncComponent(() => import('./TemplateCard.vue')),
    Tabs: defineAsyncComponent(() => import('./Tabs.vue')),
  },
  props: {
    template: {
      type: Object,
      required: true,
    },
    templateSteps: {
      type: Array,
    },
    stepsMaxHeight: {
      type: String,
      default: '618px',
    },
    stepsHeight: {
      type: String,
      default: 'calc(90vh - 266px)',
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
    showPreview: {
      type: Boolean,
      default: true,
    },
    loadingLike: {
      type: Boolean,
      default: false,
    },
    loadingCreate: {
      type: Boolean,
      default: false,
    },
    hideName: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deviceMode: 'desktop',
      loadingNew: false,
      currentStepPreview: 0,
      stepTypes: stepTypes,
    }
  },
  watch: {
    templateSteps() {
      this.getPreviewThumbnail({
        mode: this.deviceMode,
        step: this.currentStepPreview,
      })
    },
  },
  computed: {
    stepPreviewTabs() {
      if (this.templateSteps.length === 0) return []
      return this.templateSteps.map(({ type }) => ({
        label: this.stepTypes[type].title,
        icon: this.stepTypes[type].icon,
      }))
    },
    isDesktopDeviceMode() {
      return this.deviceMode === 'desktop'
    },
    isMobile() {
      return this.$screenSize.width <= 620
    },
    allowPreview() {
      return !this.isMobile && this.$screenSize.height > 450 && this.showPreview
    },
  },
  methods: {
    getDeviceButtonProps(mode) {
      return mode === this.deviceMode
        ? { color: 'primary' }
        : { variant: 'text' }
    },
    shortValue(value) {
      return shortValue(value)
    },
    getPreviewThumbnail({ mode, step }) {
      this.deviceMode = mode
      this.currentStepPreview = step
      this.$emit('get:preview', { mode, step })
    },
    async previewTemplate() {
      const url = `https://${this.templateSteps[0].url}?utm_source=fnsh&utm_campaign=get-started`

      window.open(url, '_blank')
    },
    async like() {
      this.$emit('like:template', {
        id: this.template.id,
        liked: this.template.liked,
      })
    },
    async useTemplate() {
      this.$emit('click:use-template', {
        funnelId: this.isEmpty ? '1' : this.template.funnel_id,
        name: this.isEmpty ? 'Blank Funnel' : this.template.name,
      })
    },
  },
}
</script>
<style lang="scss">
.step-thumbnail {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px 4px;

  img {
    width: 100%;
    object-fit: cover;
    object-position: top;
    transition: 2s all ease-in;
  }

  &:hover {
    img {
      object-position: 0 50%;
    }
  }
}
</style>
<style lang="scss" scoped>
.like__button {
  border-radius: 100%;
  &:hover {
    background-color: var(--primary-50);
    border-color: var(--primary-100);
  }
}

.preview__section {
  position: relative;
  .device__switch {
    display: flex;
    position: absolute;
    z-index: 10;
    top: 46px;
    right: 12px;
    height: 38px;
    padding: 4px;
    border: 1px solid var(--gray-200);
    background-color: var(--gray-50);
    border-radius: 8px;
  }
}
</style>
