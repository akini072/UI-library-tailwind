<template>
  <div class="rounded-md bg--white">
    <div v-if="hasSearch" class="border-b d-flex align-center px-4 py-2">
      <slot v-if="!!$slots.search" name="search" />
      <search-menu
        v-else
        class="pr-5 mr-3"
        @update:model-value="$emit('update:search', $event)"
      />
    </div>
    <div v-if="!!$slots.filters" class="px-4 py-3 border-b d-flex">
      <slot name="filters" />
    </div>
    <Table>
      <table-header v-if="hasHeader">
        <table-row
          class="bg-muted/50"
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <table-head v-for="header in headerGroup.headers" :key="header.id">
            <flex-render
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </table-head>
        </table-row>
      </table-header>
      <table-body>
        <template v-if="loading">
          <table-row
            v-for="headerGroup in [
              ...table.getHeaderGroups(),
              ...table.getHeaderGroups(),
              ...table.getHeaderGroups(),
            ]"
            :key="headerGroup.id"
          >
            <table-cell v-for="header in headerGroup.headers" :key="header.id">
              <skeleton class="flex-grow py-3" />
            </table-cell>
          </table-row>
          <div class="my-10" />
        </template>
        <template v-else-if="table.getRowModel().rows?.length">
          <table-row
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            class="text--gray-600 pointer"
            @click="handleClickRow(row)"
          >
            <table-cell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              @click="$emit('click:cell', cell, $event)"
            >
              <flex-render
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </table-cell>
          </table-row>
        </template>
        <template v-else>
          <table-row>
            <table-cell
              :colspan="table.options.columns.length"
              class="h-24 text-center"
            >
              <slot name="empty" />
              <span v-if="!$slots.empty">
                <div
                  class="not-found"
                  v-if="searchValue && searchValue.length > 0"
                >
                  <div class="circle">
                    <v-icon name="alert" height="24px" />
                  </div>
                  <p class="no-orders mt-4">
                    <b>No results found</b>
                  </p>
                </div>
                <p v-else>No results.</p>
              </span>
            </table-cell>
          </table-row>
        </template>
      </table-body>
    </Table>
    <pagination
      v-if="hasPagination && table.getRowModel().rows?.length > 0"
      class="pagination__footer"
      :selected-rows="
        displaySelected ? table.getFilteredSelectedRowModel().rows.length : 0
      "
      :total-rows="table.getFilteredRowModel().rows.length"
      :total="totalCount"
      :current-page="currentPage"
      :per-page="perPage"
      @update:page="$emit('update:page', $event)"
    />
  </div>
</template>

<script>
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { defineAsyncComponent, h } from "vue";
import VIcon from "../base/VIcon.vue";

export default {
  components: {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    Table: defineAsyncComponent(() =>
      import("@/components/shadcn/table/Table")
    ),
    TableBody: defineAsyncComponent(() =>
      import("@/components/shadcn/table/TableBody")
    ),
    TableCell: defineAsyncComponent(() =>
      import("@/components/shadcn/table/TableCell")
    ),
    TableHead: defineAsyncComponent(() =>
      import("@/components/shadcn/table/TableHead")
    ),
    TableHeader: defineAsyncComponent(() =>
      import("@/components/shadcn/table/TableHeader")
    ),
    TableRow: defineAsyncComponent(() =>
      import("@/components/shadcn/table/TableRow")
    ),
    VButton: defineAsyncComponent(() => import("@/components/base/VButton")),
    SearchMenu: defineAsyncComponent(() =>
      import("@/components/base/SearchMenu.vue")
    ),
    Pagination: defineAsyncComponent(() => import("./Pagination.vue")),
    Skeleton: defineAsyncComponent(() =>
      import("@/components/shadcn/skeleton/Skeleton")
    ),
    VIcon: defineAsyncComponent(() => import("@/components/base/VIcon.vue")),
  },
  props: {
    headers: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
    rowActions: {
      type: Array,
    },
    searchValue: {
      type: [String, null],
      default: "",
    },
    displaySelected: {
      type: Boolean,
      default: true,
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    hasPagination: {
      type: Boolean,
      default: true,
    },
    hasHeader: {
      type: Boolean,
      default: true,
    },
    hasCheckbox: {
      type: Boolean,
      default: true,
    },
    hasQuickActions: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const Checkbox = defineAsyncComponent(() =>
      import("../shadcn/checkbox/Checkbox.vue")
    );
    const QuickActionsBtn = defineAsyncComponent(() =>
      import("../base/QuickActionsBtn.vue")
    );

    const columns = props.headers.map(({ id, label, component, props }) => ({
      accessorKey: id,
      header: () => h("div", label),
      cell: ({ row }) => {
        const value = row.getValue(id);
        const cellRender = component
          ? h(
              component,
              {
                value,
                row: row.original,
                ...props,
                ...(component.emits
                  ? component.emits.map(
                      (emit) => ({
                        [emit]: context.emit(emit),
                      }),
                      {}
                    )
                  : {}),
              },
              () => value
            )
          : h("div", value);

        return cellRender;
      },
    }));

    if (props.hasCheckbox) {
      columns.unshift({
        id: "select",
        header: ({ table }) =>
          h(Checkbox, {
            checked: table.getIsAllPageRowsSelected(),
            "onUpdate:checked": (value) => {
              table.toggleAllPageRowsSelected(!!value);
              let rows = table.getRowModel();
              // Emit event on rows checked/unchecked
              if (value) {
                context.emit(
                  "allRows:selected",
                  rows.rows.map((el) => el.original.id)
                );
              } else {
                context.emit("allRows:selected", []);
              }
            },
            ariaLabel: "Select all",
            theme: "blue",
          }),
        cell: ({ row }) =>
          h(Checkbox, {
            checked: row.getIsSelected(),
            "onUpdate:checked": (value) => {
              row.toggleSelected(!!value);
              // Emit event on row checked/unchecked
              context.emit("row:checked", {
                selected: value,
                rowId: row.original.id,
              });
            },
            ariaLabel: "Select row",
            theme: "blue",
          }),
      });
    }
    if (props.hasQuickActions) {
      columns.push({
        id: "actions",
        cell: ({ row }) => {
          return h(
            "div",
            { class: "relative" },
            h(QuickActionsBtn, {
              vertical: true,
              items: props.rowActions,
              onMenuClick: (evt) => {
                context.emit("quickAction:triggered", {
                  ...evt,
                  selected: row.original,
                });
              },
            })
          );
        },
      });
    }

    const table = useVueTable({
      get data() {
        return props.data;
      },
      get columns() {
        return columns;
      },
      getCoreRowModel: getCoreRowModel(),
    });

    return { table };
  },
  methods: {
    handleClickRow(row) {
      row.toggleSelected(!row.getIsSelected());
      this.$emit("click:row", row);
    },
    // handleQuickMenuClick(evt) {
    //   this.$emit("quickAction:triggered", evt);
    // },
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  .circle {
    width: 32px;
    height: 32px;
    background: #e4e6f1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
  }
  .no-orders {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: #636a7b;
    font-size: 13px;
  }
}
.pagination__footer {
  position: sticky;
  z-index: 10;
  background: white;
  bottom: 0;
  border-radius: 0 0 6px 6px;
}
</style>
