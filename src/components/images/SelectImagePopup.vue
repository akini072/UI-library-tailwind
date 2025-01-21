<template>
  <v-popup title="Select an image" width="900px">
    <template v-slot:body>
      <div class="container__layout">
        <div class="py-4 pl-3 pr-1 border-r">
          <scroll-area class="pr-3" max-height="75vh">
            <div
              class="folder-card d-block pa-2 my-3 border rounded-md pointer"
              @click="pexels = true"
              :class="[pexels && 'selected']"
            >
              <div class="pexelsLogo mx-auto my-2">
                <img src="@/assets/icons/pexels-logo.png" />
              </div>

              <p class="text-center font-weight-medium">Pexels</p>
            </div>
            <image-folders-list
              :folders="folders"
              :selected="selectedFolder"
              :pexels="pexels"
              @select:folder="(pexels = false), $emit('click:folder', $event)"
              @delete:folder="setDeletePopup($event, false)"
            />

            <div
              class="folder-card d-block pa-2 my-3 border rounded-md pointer"
              v-if="addFolder"
            >
              <div class="folderIcon mx-auto my-2">
                <RiFolderLine />
              </div>
              <input
                v-model="folderName"
                class="text-center font-weight-medium border w-full rounded-sm"
                v-focus
                @blur="addFolder = false"
                @keyup.enter="newFolder"
              />
            </div>

            <div
              class="folder-card d-block pa-2 my-3 border rounded-md pointer"
              @click="addFolder = true"
            >
              <div class="plusIcon mx-auto my-1">
                <RiAddLine />
              </div>
              <p class="text-center font-weight-medium">New folder</p>
            </div>
          </scroll-area>
        </div>
        <div v-if="!pexels" class="pb-3">
          <div class="w-full border-b">
            <div class="">
              <SearchMenu
                :modelValue="searchInput"
                class="pa-3"
                @update:model-value="
                  (val) => {
                    searchInput = val;
                    searchImages(val);
                  }
                "
              />
            </div>
          </div>

          <scroll-area class="px-4" max-height="64vh">
            <div v-if="images.length > 0" class="pa-4">
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

            <div
              v-else
              @dragover.prevent.stop="dragging = true"
              @dragleave.prevent.stop="dragging = false"
              @drop.prevent="onDrop"
              class="d-flex align-center justify-center w-full dropContainer"
            >
              <div
                class="dropzone d-flex flex-column align-center justify-center rounded-lg cursor-pointer"
              >
                <div
                  class="d-flex flex-column align-center justify-center pt-5 pb-3 px-3"
                >
                  <div class="uploadIcon pb-2">
                    <RiUploadCloud2Line class="uploadCloud" />
                  </div>

                  <p class="text-center" style="color: var(--gray-900)">
                    Select a file or drag and drop here
                  </p>
                  <p class="text-center">
                    JPG or PNG, file size no more than 10MB
                  </p>
                </div>

                <label class="select_btn mb-6" for="dropzone-file">
                  Select file
                </label>
                <input
                  ref="inputImage"
                  name="image"
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
                  id="dropzone-file"
                  class="hidden"
                />
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
import {
  RiFolderLine,
  RiAddLine,
  RiSearchLine,
  RiUploadCloud2Line,
} from "vue-remix-icons";

const focus = {
  mounted: (el) => el.focus(),
};

export default {
  components: {
    RiFolderLine,
    RiAddLine,
    RiSearchLine,
    RiUploadCloud2Line,
    ScrollArea: defineAsyncComponent(() =>
      import("@/components/shadcn/scroll-area/ScrollArea.vue")
    ),
    VPopup: defineAsyncComponent(() => import("@/components/base/VPopup")),
    VField: defineAsyncComponent(() => import("@/components/base/VField")),
    SearchMenu: defineAsyncComponent(() =>
      import("@/components/base/SearchMenu")
    ),
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

      search: false,

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

  computed: {},

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
          Authorization: import.meta.env.VITE_PEXELS_KEY,
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
            Authorization: import.meta.env.VITE_PEXELS_KEY,
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
          if (!this.deleteData.isImage) this.$emit("click:folder", { id: 0 });
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
// @import "@/assets/styles/utilities.scss";
.container__layout {
  display: grid;
  grid-template-columns: 1fr 6fr;
  overflow: scroll;

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

    .pexelsLogo {
      width: 50px;
      height: 50px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    p,
    input {
      font-size: small;
    }

    .folderIcon {
      height: 30px;
      width: 30px;
    }

    .plusIcon {
      height: 24px;
      width: 24px;
    }
  }

  // .searchIcon {
  //   width: 15px;
  // }
  .dropContainer {
    height: 50vh;
    .dropzone {
      background-color: rgba(67, 104, 224, 0.05);
      border: rgba(67, 104, 224, 0.4);
      border-style: dashed;
      width: 80%;
      padding: 25px 0;

      &:hover {
        background-color: rgba(67, 104, 224, 0.1);
      }

      .select_btn {
        background-color: rgba(67, 104, 224, 1);
        color: white;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          background-color: rgb(57, 92, 210);
        }
      }

      .uploadCloud {
        color: rgba(0, 0, 0, 0.5);
        height: 48px;
        width: 48px;
      }
    }
  }
}
</style>
