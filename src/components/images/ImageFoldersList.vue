<template>
  <div
    class="folder-card d-block pa-2 my-3 border rounded-md cursor-pointer"
    :class="{ selected: selected.id === 0 && !pexels }"
    @click="() => $emit('select:folder', { id: 0 })"
  >
    <div class="folderIcon mx-auto my-1">
      <RiFolderImageLine />
    </div>
    <p class="text-center font-weight-medium">My images</p>
  </div>

  <hr style="opacity: 20%" />

  <!-- Commented out for upcoming update feature
  <div
    class="folder-card d-block pa-2 my-3 border rounded-md pointer"
    v-for="folder in folders"
    :key="folder.id"
    :class="{ selected: selected.id === folder.id && !pexels }"
    @click="() => $emit('select:folder', folder)"
    @dblclick="
      folderEdit = folder + ('_' + folder.id);
      selectedFolder = folder.name;
    "
  > -->
  <div
    class="folder-card d-block pa-2 my-3 border rounded-md pointer"
    v-for="folder in folders"
    :key="folder.id"
    :class="{ selected: selected.id === folder.id && !pexels }"
    @click="() => $emit('select:folder', folder)"
  >
    <lazy @click="() => $emit('select:folder', folder)" unrender>
      <div class="folderIcon mx-auto my-1">
        <RiFolderLine />
      </div>
      <input
        v-if="folderEdit == folder + '_' + folder.id"
        v-model="selectedFolder"
        class="text-center font-weight-medium border w-full rounded-sm"
        v-focus
        @blur="folderEdit = ''"
        @keyup.enter=""
      />
      <p v-else class="text-center font-weight-medium text-ellipsis">
        {{ folder.name }}
      </p>
      <v-button
        class="delete__button"
        icon
        variant="text"
        size="small"
        color="red"
        @click="() => $emit('delete:folder', folder)"
      >
        <v-icon name="trash" height="14px" />
      </v-button>
    </lazy>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { RiFolderLine, RiFolderImageLine } from "vue-remix-icons";

const focus = {
  mounted: (el) => el.focus(),
};

export default {
  components: {
    RiFolderLine,
    RiFolderImageLine,
    VButton: defineAsyncComponent(() => import("@/components/base/VButton")),
    Lazy: defineAsyncComponent(() => import("@/components/base/Lazy")),
    VIcon: defineAsyncComponent(() => import("@/components/base/VIcon")),
  },
  props: {
    folders: {
      type: Object,
      default: [],
    },
    selected: {
      type: Object,
    },

    pexels: {
      type: Boolean,
    },
  },

  emits: ["delete:folder", "update:folder", "select:folder"],

  data() {
    return {
      folderEdit: "",
      selectedFolder: "",
    };
  },

  methods: {
    updateFolder() {
      new Promise((resolve, reject) => {
        this.$emit(
          "update:folder",
          {
            name: this.selectedFolder,
          },
          resolve,
          reject
        );
      })
        .then(() => {
          this.folderEdit = "";
          this.selectedFolder = "";
        })
        .catch((error) => {
          this.$error(error);
        });
    },
  },

  directives: {
    focus, // enables v-focus in template
  },
};
</script>

<style lang="scss" scoped>
.folder-card {
  position: relative;

  .folderIcon {
    height: 30px;
    width: 30px;
  }

  .delete__button {
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    opacity: 0;
    transition: ease 0.2s;
  }

  p,
  input {
    font-size: small;
  }

  &:hover {
    border: 1px solid var(--primary-500);

    .delete__button {
      opacity: 1;
    }
  }
  &.selected {
    border: 1px solid var(--primary-500);
    color: var(--primary-500);
  }
}
</style>
