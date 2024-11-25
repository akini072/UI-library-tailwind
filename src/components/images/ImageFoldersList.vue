<template>
  <div class="folder-card d-block p-3 my-3 border rounded-md cursor-pointer">
    <div class="h-[50px] w-[50px] mx-auto my-2">
      <img
        class="h-[50px] w-[50px]"
        src="https://seeklogo.com/images/P/pexels-logo-EFB9232709-seeklogo.com.png"
      />
    </div>

    <p class="text-sm text-center font-medium">Pexels</p>
  </div>

  <div
    class="folder-card d-block p-3 my-3 border rounded-md cursor-pointer"
    :class="{ selected: selected.id === 0 }"
    @click="() => $emit('select:folder', { id: 0 })"
  >
    <div class="w-[30px] h-[30px] mx-auto my-2">
      <RiFolderImageLine />
    </div>
    <p class="text-sm text-center font-medium">My images</p>
  </div>

  <hr class="opacity-20" />

  <div
    class="folder-card d-block p-3 my-3 border rounded-md cursor-pointer"
    v-for="folder in folders"
    :key="folder.id"
    :class="{ selected: selected.id === folder.id }"
    @click="() => $emit('select:folder', folder)"
    @dblclick="
      folderEdit = folder + ('_' + folder.id);
      selectedFolder = folder.name;
    "
  >
    <lazy @click="() => $emit('select:folder', folder)" unrender>
      <div class="w-[30px] h-[30px] mx-auto my-2">
        <RiFolderLine />
      </div>
      <input
        v-if="folderEdit == folder + '_' + folder.id"
        v-model="selectedFolder"
        class="text-sm text-center font-medium border w-[100%] rounded"
        v-focus
        @blur="folderEdit = ''"
        @keyup.enter=""
      />
      <p v-else class="text-sm text-center font-medium">{{ folder.name }}</p>
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
  },

  data() {
    return {
      folderEdit: "",
      selectedFolder: "",
    };
  },

  directives: {
    focus, // enables v-focus in template
  },
};
</script>

<style lang="scss" scoped>
.folder-card {
  position: relative;

  .delete__button {
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    opacity: 0;
    transition: ease 0.2s;
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
