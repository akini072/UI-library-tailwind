<template>
  <div class="d-flex align-center py-2 px-5 justify-end border-t">
    <div class="text--gray-500 mr-auto">
      {{ selectedRows }} of {{ totalRows }} row(s) selected.
    </div>
    <Pagination
      class="d-flex align-center"
      v-slot="{ page, pageCount }"
      show-edges
      :total="total"
      :items-per-page="perPage"
      :default-page="currentPage"
      @update:page="$emit('update:page', { page: $event, limit: perPage })"
    >
      <span v-if="total > 0" class="page-num text-nowrap text--gray-600">
        Page {{ page > pageCount ? pageCount : page }} of {{ pageCount }}
      </span>
      <PaginationList class="flex items-center gap-2 mx-10">
        <PaginationFirst class="pagination_button responsive-md mr-2" />
        <PaginationPrev class="pagination_button mr-2" />
        <PaginationNext class="pagination_button mr-2" />
        <PaginationLast class="pagination_button responsive-md" />
      </PaginationList>
    </Pagination>
  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Pagination: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination').then((m) => m.Pagination),
    ),
    PaginationFirst: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination/PaginationFirst'),
    ),
    PaginationLast: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination/PaginationLast'),
    ),
    PaginationList: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination').then((m) => m.PaginationList),
    ),
    PaginationNext: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination/PaginationNext'),
    ),
    PaginationPrev: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination/PaginationPrev'),
    ),
    PaginationListItem: defineAsyncComponent(() =>
      import('@/components/shadcn/pagination').then(
        (m) => m.PaginationListItem,
      ),
    ),
    Select: defineAsyncComponent(() =>
      import('@/components/shadcn/select/Select'),
    ),
    SelectTrigger: defineAsyncComponent(() =>
      import('@/components/shadcn/select/SelectTrigger'),
    ),
    SelectContent: defineAsyncComponent(() =>
      import('@/components/shadcn/select/SelectContent'),
    ),
    SelectItem: defineAsyncComponent(() =>
      import('@/components/shadcn/select/SelectItem'),
    ),
    SelectValue: defineAsyncComponent(() =>
      import('@/components/shadcn/select/SelectValue'),
    ),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    totalRows: {
      type: Number,
      required: true,
    },
    selectedRows: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectPage: this.currentPage,
    }
  },
  watch: {
    currentPage(newPage) {
      this.selectPage = newPage
    },
    selectedOption(newValue) {
      this.$emit('handle-per-page', Number(newValue))
    },
  },
}
</script>

<style scoped lang="scss">
.page-num {
  font-weight: 500;
  font-size: 14px;
  margin-left: 18px;
  margin-right: 8px;
}
.pagination_button {
  height: 32px;
  width: 32px;
}

.footer-hover {
  width: 70px;
}
.responsive-sm {
  @media screen and (max-width: 640px) {
    display: none;
  }
}
.responsive-md {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
