<template>
  <div
    class="rounded template-card"
    :class="{
      'empty-card': isEmpty,
      active: isActive,
      static: static,
      pointer: !static,
    }"
  >
    <div v-if="isEmpty" class="d-flex flex-column align-center">
      <v-icon
        class="mb-5"
        name="plus-circle"
        height="30px"
        color="var(--primary-500)"
      />
      {{ text }}
    </div>
    <div v-else>
      <div v-if="isTrending" class="trending__flag text--white">
        <v-icon name="trending" class="mr-2" />
        <b>Trending</b>
      </div>
      <v-button
        v-if="hasLike"
        class="like__button"
        variant="outlined"
        size="large"
        icon
        :color="liked ? '' : ''"
        :loading="loadingLike"
        @click.stop="like"
      >
        <v-icon
          v-if="liked"
          name="heart-full"
          color="var(--primary-500)"
          height="18px"
        />
        <v-icon v-else name="heart" color="var(--primary-500)" height="20px" />
      </v-button>
      <div class="funnel-thumbnail d-flex align-center justify-center">
        <img
          v-if="!imageFail"
          v-lazy="{
            src: thumbnailUrl,
            lifecycle: { error: () => (imageFail = true) },
          }"
        />
        <v-icon v-else name="image-empty" height="60px" />
        <div v-if="overlay">
          <div class="overlay" />
          <div class="buttons flex-column align-center">
            <v-button
              class="use-template text-nowrap"
              color="primary"
              @click="(event) => $emit('click:use-template', event)"
            >
              <b>Use template</b>
            </v-button>
            <v-button
              class="mt-4 px-2 see-details__button"
              variant="outlined"
              size="small"
              color="white"
              @click="(event) => $emit('click:details', event)"
            >
              <h6 class="text--white">See details</h6>
            </v-button>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 border-t">
        <div class="d-flex align-center justify-space-between">
          <div class="font-weight-medium">
            {{ name }}
          </div>
          <div class="active__flag">
            <v-icon class="mr-1" name="dot" height="8px" />
            Active
          </div>
        </div>
        <div v-if="hasLike" class="d-flex mt-1">
          <h6 class="mr-3 d-flex align-center">
            <v-icon
              name="laptop"
              class="mr-1"
              color="var(--primary-500)"
              height="16px"
            />
            {{ shortValue(uses) }} uses
          </h6>
          <h6 class="d-flex align-center">
            <v-icon
              v-if="liked"
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
            {{ shortValue(Math.abs(likes)) }} likes
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import shortValue from '@/helpers/shortValue'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    static: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    hasLike: {
      type: Boolean,
      default: true,
    },
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    uses: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    loadingLike: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Use default template'
    }
  },
  data() {
    return {
      imageFail: false,
    }
  },
  methods: {
    shortValue(value) {
      return shortValue(value)
    },
    async like() {
      this.$emit('like:template', { id: this.id, liked: this.liked })
    },
  },
}
</script>
<style lang="scss" scoped>
.template-card {
  min-height: 252px;
  outline-color: #eaecf0;
  outline-width: 1px;
  outline-style: solid;
  position: relative;
  .like__button {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1;
    border-radius: 100%;
    &:hover {
      background-color: var(--primary-50);
      border-color: var(--primary-100);
    }
  }
  &.empty-card {
    outline: 2px dashed #d0d5dd;
    background: linear-gradient(0deg, #f6f8fa 0%, #f6f8fa 100%), #fff;
  }
  &:not(.static):hover {
    outline-color: var(--primary-500);
    outline-width: 2px;
    box-shadow: 0px 10px 10px 0px rgba(6, 21, 44, 0.1);
    .overlay {
      opacity: 0.7;
    }
    .buttons {
      display: flex;
    }
  }
  &.active {
    outline-color: var(--primary-500) !important;
    outline-width: 2px;
    box-shadow: 0px 10px 10px 0px rgba(6, 21, 44, 0.1);
    .active__flag {
      visibility: visible;
    }
  }
  .trending__flag {
    border-radius: 50px;
    background: linear-gradient(90deg, #fc3a3a 0%, #ff5050 100%);
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: 'Inter';
    padding: 4px 12px 4px 8px;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
  }
  .active__flag {
    display: flex;
    align-items: center;
    border-radius: 16px;
    border: 1px solid var(--primary-200);
    background: var(--primary-50);
    color: var(--primary-700);
    font-size: 12px;
    font-family: 'Inter';
    padding: 2px 6px;
    visibility: hidden;
  }
}
.funnel-thumbnail {
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: inherit;
  img {
    height: 200px;
    width: 100%;
    object-position: top;
    border-radius: 8px 8px 0px 0px;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px 8px 0px 0px;
    background-color: #1d2939;
    opacity: 0;
    transition: opacity 400ms ease;
  }
  .buttons {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -20%);
    .see-details__button {
      border-radius: 5px;
    }
  }
}
</style>
