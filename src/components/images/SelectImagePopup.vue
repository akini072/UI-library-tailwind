<template>
  <v-popup title="Select an image" width="900px">
    <template v-slot:body>
      <div class="container__layout">
        <div class="py-4 pl-3 pr-1 border-r">
          <scroll-area class="pr-3" max-height="75vh">
            <image-folders-list
              :folders="folders"
              :selected="selectedFolder"
              @select:folder="$emit('click:folder', $event)"
              @delete:folder="setDeletePopup($event, false)"
            />

            <div
              class="folder-card d-block p-3 my-3 border rounded-md cursor-pointer"
              v-if="addFolder"
            >
              <div class="w-[30px] h-[30px] mx-auto my-2">
                <RiFolderLine />
              </div>
              <input
                v-model="folderName"
                class="text-sm text-center font-medium border w-[100%] rounded"
                v-focus
                @blur="addFolder = false"
                @keyup.enter="newFolder"
              />
            </div>

            <div
              class="folder-card d-block p-3 my-3 border rounded-md cursor-pointer"
              @click="addFolder = true"
            >
              <div class="w-[24px] h-[24px] mx-auto my-1">
                <RiAddLine />
              </div>
              <p class="text-sm text-center font-medium">New folder</p>
            </div>
          </scroll-area>
        </div>
        <div class="pb-3">
          <div class="w-[100%] border-b">
            <div class="flex ml-5 my-3 items-center">
              <RiSearchLine class="w-[15px]" /><input
                @keyup="searchImages(searchInput)"
                v-model="searchInput"
                class="ml-2 w-[100%]"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div class="px-5 py-5">
            <input
              ref="inputImage"
              name="image"
              type="file"
              accept="image/*"
              style="display: none"
              @change="uploadImage"
            />
            <v-button
              class="ml-auto"
              color="primary"
              size="medium"
              @click="$refs.inputImage.click()"
            >
              <v-icon class="mr-2" name="upload" height="20px" />
              Upload new image
            </v-button>
          </div>
          <scroll-area class="pa-5" max-height="64vh">
            <div class="d-grid images__layout" v-if="images.length > 0">
              <lazy
                v-for="image in searchImages(searchInput)"
                :key="image.id"
                :min-height="160"
                unrender
              >
                <image-card
                  :image="image"
                  @click="selectImage(image)"
                  @show:delete="setDeletePopup($event, true)"
                />
              </lazy>
            </div>
            <div v-else class="d-flex justify-center pt-10 mt-10">
              <h6>
                <b> There are no images in this folder yet </b>
              </h6>
            </div>
            <div
              v-if="searchImages(searchInput).length == 0"
              class="d-flex justify-center pt-10 mt-10"
            >
              <h6>
                <b> Image not found </b>
              </h6>
            </div>
          </scroll-area>
        </div>
      </div>
      <teleport to="body">
        <confirmation-popup
          v-if="showDelete"
          :loading="loadingDelete"
          confirm-button="Delete"
          :title="`Are you sure you want to delete this ${
            deleteData.isImage ? 'image' : 'folder'
          }?`"
          :content="deleteData.name"
          @confirm="confirmDelete"
          @cancel="showDelete = false"
        />
      </teleport>
    </template>
  </v-popup>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { RiFolderLine, RiAddLine, RiSearchLine } from "vue-remix-icons";

export default {
  components: {
    RiFolderLine,
    RiAddLine,
    RiSearchLine,
    ScrollArea: defineAsyncComponent(() =>
      import("@/components/shadcn/scroll-area/ScrollArea.vue")
    ),
    VPopup: defineAsyncComponent(() => import("@/components/base/VPopup")),
    VField: defineAsyncComponent(() => import("@/components/base/VField")),
    VButton: defineAsyncComponent(() => import("@/components/base/VButton")),
    VIcon: defineAsyncComponent(() => import("@/components/base/VIcon")),
    ConfirmationPopup: defineAsyncComponent(() =>
      import("@/components/base/ConfirmationPopup")
    ),
    Lazy: defineAsyncComponent(() => import("@/components/base/Lazy")),
    SaveableInput: defineAsyncComponent(() =>
      import("@/components/base/SaveableInput.vue")
    ),
    ImageCard: defineAsyncComponent(() => import("./ImageCard.vue")),
    ImageFoldersList: defineAsyncComponent(() =>
      import("./ImageFoldersList.vue")
    ),
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    folders: {
      type: Array,
      default: () => [],
    },
    selectedFolder: {
      type: Object,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addFolder: false,
      showDelete: false,
      loadingDelete: false,
      loadingCreateFolder: false,
      folderName: "",
      searchInput: "",
      deleteData: {},
    };
  },

  // mounted() {
  //   this.searchImages(this.searchInput);
  // },

  methods: {
    searchImages(input) {
      return this.images.filter(
        (image) => image.name.toLowerCase().indexOf(input) > -1
      );
    },

    newFolder() {
      new Promise((resolve, reject) => {
        this.loadingCreateFolder = true;

        this.$emit(
          "new:folder",
          {
            name: this.folderName,
          },
          resolve,
          reject
        );
      })
        .then(() => {
          this.addFolder = false;
          this.folderName = "";
        })
        .catch((error) => {
          this.$error(error);
        })
        .finally(() => {
          this.loadingCreateFolder = false;
        });
    },
    uploadImage(e) {
      new Promise((resolve, reject) => {
        const fileList = e.target.files;
        const fieldName = e.target.name;

        const formData = new FormData();

        if (!fileList.length) return;

        Array.from(Array(fileList.length).keys()).map((x) => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

        this.$emit(
          "upload:image",
          {
            folder_id: this.selectedFolder.id,
            formData,
          },
          resolve,
          reject
        );
      })
        .then(() => {})
        .catch((error) => {
          this.$error(error, "Server error. Please try again later");
        });
    },
    confirmDelete() {
      new Promise((resolve, reject) => {
        this.loadingDelete = true;
        if (this.deleteData.isImage) {
          this.$emit("delete:image", this.deleteData, resolve, reject);
        } else {
          this.$emit("delete:folder", this.deleteData, resolve, reject);
        }
      })
        .then(() => {
          this.addFolder = false;
          this.folderName = "";
        })
        .catch((error) => {
          this.$error(error);
        })
        .finally(() => {
          this.loadingDelete = false;
          this.showDelete = false;
        });
    },
    setDeletePopup(data, isImage) {
      this.deleteData = {
        ...data,
        isImage,
      };
      this.showDelete = true;
    },
    selectImage(image) {
      this.$emit("select:image", image);
      this.closePopup();
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.container__layout {
  display: grid;
  grid-template-columns: 124px 1fr;

  .images__layout {
    display: grid;
    grid-gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .folder-card:hover,
  .folder-card.active {
    border: 1px solid #4368e0;
  }
}
</style>
