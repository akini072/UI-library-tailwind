<template>
  <v-popup title="Select an image" width="900px">
    <template v-slot:body>
      <div class="container__layout">
        <div class="py-4 pl-3 pr-1 border-r">
          <scroll-area class="pr-3" max-height="75vh">
            <div
              class="folder-card d-block p-3 my-3 border rounded-md cursor-pointer"
              @click="pexels = true"
              :class="[pexels && 'selected']"
            >
              <div class="h-[50px] w-[50px] mx-auto my-2">
                <img
                  class="h-[50px] w-[50px]"
                  src="https://seeklogo.com/images/P/pexels-logo-EFB9232709-seeklogo.com.png"
                />
              </div>

              <p class="text-sm text-center font-medium">Pexels</p>
            </div>
            <image-folders-list
              :folders="folders"
              :selected="selectedFolder"
              :pexels="pexels"
              @select:folder="(pexels = false), $emit('click:folder', $event)"
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
        <div v-if="!pexels" class="pb-3">
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
          <div v-if="images.length > 0" class="px-4 py-4">
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
          <scroll-area class="px-4" max-height="64vh">
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
            <div v-else class="d-flex justify-center items-center h-[50vh]">
              <div
                @dragover.prevent.stop="dragging = true"
                @dragleave.prevent.stop="dragging = false"
                @drop.prevent="onDrop"
                class="flex items-center justify-center w-[80%]"
              >
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div
                    class="flex flex-col items-center justify-center pt-5 pb-6"
                  >
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    ref="inputImage"
                    name="image"
                    type="file"
                    accept="image/*"
                    @change="uploadImage"
                    id="dropzone-file"
                    class="hidden"
                  />
                </label>
              </div>
            </div>
            <div
              v-if="searchImages(searchInput).length == 0 && images.length > 0"
              class="d-flex justify-center pt-10 mt-10"
            >
              <h6>
                <b> Image not found </b>
              </h6>
            </div>
          </scroll-area>
        </div>
        <Pexels
          @search:pexels="searchPexels"
          @get:pexels="getPexelsImages"
          @select:image="selectImage"
          :images="pexelsImages"
          v-else
        />
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

const focus = {
  mounted: (el) => el.focus(),
};

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
    Pexels: defineAsyncComponent(() => import("./Pexels.vue")),
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
      pexels: false,
      showDelete: false,
      loadingDelete: false,
      loadingCreateFolder: false,
      folderName: "",
      searchInput: "",
      deleteData: {},

      pexelsImages: [],
      dragging: false,
    };
  },

  mounted() {
    this.getPexelsImages(40);
  },

  directives: {
    focus, // enables v-focus in template
  },

  methods: {
    searchImages(input) {
      return this.images.filter(
        (image) => image.name.toLowerCase().indexOf(input) > -1
      );
    },

    onDrop(e) {
      e.preventDefault();
      this.dragging = false;

      new Promise((resolve, reject) => {
        const formData = new FormData();
        const fileList = Array.from(e.dataTransfer.files);

        if (!fileList.length) return;

        fileList.map((file) => {
          if (file.type.split("/")[0] === "image")
            formData.append(file.type.split("/")[0], file, file.name);
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

    getPexelsImages(limit) {
      fetch(`https://api.pexels.com/v1/curated?per_page=${limit}`, {
        headers: {
          Authorization:
            "Y1syk1CDQnoCml0Drzn965LEufoWUBS1ZExXMEnwV2nljBLoounFQUqe",
        },
      })
        .then((res) => res.json())
        .then((data) => (this.pexelsImages = data.photos))
        .catch((error) => console.error(error));
    },

    searchPexels(term, limit) {
      fetch(
        `https://api.pexels.com/v1/search?query=${term}&per_page=${limit}`,
        {
          headers: {
            Authorization:
              "Y1syk1CDQnoCml0Drzn965LEufoWUBS1ZExXMEnwV2nljBLoounFQUqe",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => (this.pexelsImages = data.photos))
        .catch((error) => console.error(error));
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

        console.log(fieldName);

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

  .folder-card {
    &:hover,
    &.selected {
      border: 1px solid var(--primary-500);
    }
  }
}
</style>
