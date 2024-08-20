<template>
  <Carousel class="template-categories__carousel" @init-api="setCarouselApi">
    <CarouselContent>
      <CarouselItem
        v-for="{ name, title } in options"
        :key="name"
        class="basis-auto pointer carousel__item py-1"
        @click="$emit('selected:option', name)"
      >
        <div
          class="rounded bg--gray-100 text-nowrap py-1 px-3 d-flex align-center"
          :class="{ active: isActive(name) }"
        >
          <v-icon class="mr-2" :name="`category-${name}`" height="16px" />
          {{ title }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <div v-if="canScrollPrev" class="scroll__overlay --start">
      <carousel-previous class="prev__button" />
    </div>
    <div v-if="canScrollNext" class="scroll__overlay --end">
      <carousel-next class="next__button" />
    </div>
  </Carousel>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    Carousel: defineAsyncComponent(() =>
      import('@/components/shadcn/carousel/Carousel.vue'),
    ),
    CarouselContent: defineAsyncComponent(() =>
      import('@/components/shadcn/carousel/CarouselContent.vue'),
    ),
    CarouselItem: defineAsyncComponent(() =>
      import('@/components/shadcn/carousel/CarouselItem.vue'),
    ),
    CarouselPrevious: defineAsyncComponent(() =>
      import('@/components/shadcn/carousel/CarouselPrevious.vue'),
    ),
    CarouselNext: defineAsyncComponent(() =>
      import('@/components/shadcn/carousel/CarouselNext.vue'),
    ),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    direction: {
      type: String,
      default: 'horizontal',
    },
    currentOption: {
      type: String,
      default: 'all',
    },
    options: {
      type: Array,
      default: [
        {
          name: 'all',
          title: 'All',
        },
        {
          name: 'trending',
          title: 'Trending',
        },
        {
          name: 'popular',
          title: 'Popular',
        },
        {
          title: 'Like',
          name: 'like',
        },
        {
          title: 'Fashion & Beauty',
          name: 'fashion-beauty',
        },
        {
          title: 'Electronics',
          name: 'electronics',
        },
        {
          title: 'Food & Drinks',
          name: 'food-drinks',
        },
        {
          title: 'Arts & Craft',
          name: 'arts-craft',
        },
      ],
    },
  },
  data() {
    return { carouselApi: null, canScrollNext: true, canScrollPrev: false }
  },
  watch: {
    carouselApi(val) {
      val.on('select', ({ canScrollNext, canScrollPrev }) => {
        this.canScrollNext = canScrollNext()
        this.canScrollPrev = canScrollPrev()
      })
    },
  },
  methods: {
    isActive(option) {
      return option === this.currentOption
    },
    setCarouselApi(val) {
      this.carouselApi = val
      this.canScrollNext = val.canScrollNext()
      this.canScrollPrev = val.canScrollPrev()
    },
  },
}
</script>

<style lang="scss" scoped>
.template-categories__carousel {
  .carousel__item {
    font-weight: 500;
    color: var(--gray-600);
    &:hover {
      color: var(--gray-700);
    }

    .active {
      color: var(--primary-500);
      background-color: var(--primary-25);
      font-weight: 600;
    }
    &:first-child {
      margin-left: 12px;
    }
    &:last-child {
      margin-right: 12px;
    }
  }
  .scroll__overlay {
    width: 46px;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    &.--start {
      background: linear-gradient(
        90deg,
        #f9fafb 0%,
        rgb(249 250 251 / 0%) 79.39%,
        rgb(255 255 255 / 0%) 117.58%
      );
      left: 0;
    }
    &.--end {
      background: linear-gradient(
        270deg,
        #f9fafb 0%,
        rgb(249 250 251 / 0%) 79.39%,
        rgb(255 255 255 / 0%) 117.58%
      );
      right: 0px;
    }
    .prev__button,
    .next__button {
      width: 28px;
      height: 28px;
    }
    .prev__button {
      left: 12px;
    }
    .next__button {
      right: 12px;
    }
  }
}
</style>
