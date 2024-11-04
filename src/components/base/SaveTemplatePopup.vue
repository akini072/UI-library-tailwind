<template>
    <suspense>
        <template #default>
            <v-popup :title="title" width="1024px" @close="close">
                <template v-slot:body>
                    <div class="responsive-container p-10">
                        <!-- Form Section -->
                        <div class="form-section">
                            <v-field v-model="saveTemplate.name" class="mb-4" label="Name" value-key="label" />
                            <v-select v-model="saveTemplate.tags" class="mb-4" label="Category" value-key="label"
                                mode="tags" :options="tags" allow-create searchable />
                            <v-radio v-model="saveTemplate.popular" class="mb-4" label="Popular" value-key="label" />
                            <v-radio v-model="saveTemplate.trending" class="mb-4" label="Trending" value-key="label" />
                        </div>

                        <!-- Image Upload Section -->
                        <div class="upload-section">
                            <div class="mt-auto">
                                <div class="favicon-preview">
                                    <img v-if="imageUrl" :src="imageUrl" alt="Favicon Preview" />
                                    <v-icon v-else name="add-image" height="70px" color="var(--gray-300)"
                                        class="justify-center" />
                                </div>
                                <div class="mt-6 section favicon" @click="$refs.inputImage.click()">
                                    <input ref="inputImage" name="image" type="file" accept="image/*" @change="uploadImage"
                                        style="display: none;" />
                                    <div class="set-favicon">
                                        <v-icon name="add-image" />
                                    </div>
                                    <div>
                                        <label>Template Image</label>
                                        <p>This is the template cover image</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </v-popup>
        </template>
    </suspense>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        VPopup: defineAsyncComponent(() => import('@/components/base/VPopup.vue')),
        ScrollArea: defineAsyncComponent(() =>
            import('@/components/shadcn/scroll-area/ScrollArea.vue'),
        ),
        VField: defineAsyncComponent(() => import('@/components/base/VField.vue')),
        VSelect: defineAsyncComponent(() => import('@/components/base/VSelect.vue')),
        VRadio: defineAsyncComponent(() => import('@/components/base/VRadio.vue')),
        VIcon: defineAsyncComponent(() => import('@/components/base/VIcon.vue'))
    },
    props: {
        title: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: false
        },
    },
    data() {
        return {
            saveTemplate: {
                name: '',
                tags: [],
                popular: 'off',
                trending: 'off'
            },
            imageUrl: null,
        }
    },
    methods: {
        uploadImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            //check if the file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file.')
                return
            }

            //Optional: Preview the image before uploading
            this.imageUrl = URL.createObjectURL(file)

            // Initialize FormData for file upload
            const formData = new FormData();
            formData.append('image', file);

            //Simulating an upload (e.g., POST request to the server)
            // Uncomment and replace 'uploadURL' with your actual endpoint
            // fetch("uploadURL", {
            //     method: "POST",
            //     body: formData,
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log("File uploaded successfully:", data);
            //         // You can store the uploaded file's URL or ID from the server response
            //     })
            //     .catch(error => {
            //         console.error("Error uploading file:", error);
            //     });
        },
        close() {
            this.$emit('close')
        },
    },
}
</script>

<style lang="scss" scoped>
/* Container styling */
.responsive-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* Style for .favicon section */
    .section {
        border-radius: 6px;
        border: 1px solid var(--gray-300);
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.favicon {
            justify-content: flex-start;
            padding: 8px;
            cursor: pointer;

            &:hover {
                background: var(--gray-50);
                border: 1px solid var(--primary-500);
            }
        }

        .set-favicon {
            width: 44px;
            height: 44px;
            border-radius: 6px;
            border: 1px dashed var(--gray-300);
            margin-right: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
            }

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                color: var(--gray-300);
            }
        }

        label {
            color: var(--gray-700);
            font-weight: 500;
        }
    }

    /* Favicon Preview Image */
    .favicon-preview {
        margin-top: 10px;
        justify-content: center;

        img {
            max-width: 100%;
            max-height: 250px;
            width: auto;
            height: auto;
            object-fit: cover;
        }
    }
}

/* Flex layout for larger screens */
@media (min-width: 768px) {
    .responsive-container {
        flex-direction: row;
    }

    .form-section,
    .upload-section {
        width: 48%;
    }
}

/* General spacing adjustments */
.p-10 {
    padding: 1rem;
}

.mb-4 {
    margin-bottom: 1rem;
}
</style>
