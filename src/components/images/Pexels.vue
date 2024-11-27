<template>
  <div class="pb-3">
    <div class="w-[100%] border-b">
      <div class="flex ml-5 my-3 items-center">
        <RiSearchLine class="w-[15px]" /><input
          v-model="searchInput"
          @keyup.enter="$emit('search:pexels', searchInput, limit)"
          class="ml-2 w-[100%]"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>

    <scroll-area class="pa-5" max-height="64vh">
      <div class="images__layout" v-if="images.length > 0">
        <div class="grid grid-cols-4 gap-3 py-3">
          <lazy v-for="image in images" :key="image.id" unrender>
            <img
              @click="
                $emit('select:image', {
                  id: image.id,
                  funnel_id: 0,
                  user_id: 0,
                  name: image.alt,
                  url: image.src.original,
                  path: image.src.original,
                })
              "
              :src="image.src.portrait"
              class="w-[100%] pb-1"
            />
          </lazy>
        </div>

        <v-button
          v-if="limit < 80"
          class="mx-auto"
          color="primary"
          size="medium"
          @click="loadMore()"
        >
          <v-icon class="mr-2" name="loadMore" height="20px" />
          Load More
        </v-button>
      </div>
      <div v-else class="d-flex justify-center pt-10 mt-10">
        <h6>
          <b> Image Not Found </b>
        </h6>
      </div>
    </scroll-area>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { RiSearchLine } from "vue-remix-icons";

export default {
  components: {
    RiSearchLine,
    ScrollArea: defineAsyncComponent(() =>
      import("@/components/shadcn/scroll-area/ScrollArea.vue")
    ),
    Lazy: defineAsyncComponent(() => import("@/components/base/Lazy")),
    ImageCard: defineAsyncComponent(() => import("./ImageCard.vue")),
    VButton: defineAsyncComponent(() => import("@/components/base/VButton")),
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchInput: "",
      limit: 40,
    };
  },

  methods: {
    loadMore() {
      if (this.limit <= 80) {
        this.limit += 20;

        if (this.searchInput == "") {
          this.$emit("get:pexels", this.limit);
        } else {
          this.$emit("search:pexels", this.searchInput, this.limit);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.images__layout {
  img {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      scale: 1.03;
    }
  }
}
</style>
