<template>
    <suspense>
        <template #default>
            <v-popup :title="title" @click="$emit('click:close')" medium>
                <template v-slot:body>
                    <div class="p-4">
                        <div class="responsive-container">
                            <!-- Form Section -->
                            <div class="form-section">
                                <v-field v-model="saveTemplate.name" class="mb-4" label="Name" value-key="label" />
                                <v-select v-model="saveTemplate.tags" class="mb-4" label="Category" value-key="label"
                                    mode="tags" :options="tags" allow-create searchable />
                                <v-radio v-model="saveTemplate.popular" class="mb-4" label="Is popular?"
                                    value-key="label" />
                                <v-radio v-model="saveTemplate.trending" label="Is trending?" value-key="label" />
                            </div>

                            <!-- Image Upload Section -->
                            <div class="upload-section d-flex flex-column justify-center cursor-pointer">
                                <div class="favicon-preview" @click="$refs.inputImage.click()">
                                    <img v-if="imageUrl" :src="imageUrl" alt="Favicon Preview" />
                                    <v-icon v-else name="add-image" height="70px" color="var(--gray-300)"
                                        class="justify-center" />
                                    <input ref="inputImage" name="image" type="file" accept="image/*" @change="uploadImage"
                                        style="display: none;" />
                                </div>
                                <!-- <div class="mt-4 section favicon" >
                                    <div class="set-favicon">
                                        <v-icon name="add-image" />
                                    </div>
                                    <div>
                                        <label>Template Image</label>
                                        <p>You can select the template cover image</p>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:actions>
                    <v-button label="Cancel" variant="outlined" color="black" @click="$emit('click:close')" />
                    <v-button label="Save" color="primary" />
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
        VIcon: defineAsyncComponent(() => import('@/components/base/VIcon.vue')),
        VButton: defineAsyncComponent(() => import('@/components/base/VButton.vue'))
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
    },
}
</script>

<style lang="scss" scoped>
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

    .upload-section {
        border-radius: 6px;
        padding: 4px;
        border: 1px solid white;
        &:hover {
            border: 1px dashed var(--primary-500);   
        }

        .favicon-preview {
            margin-top: 10px;
            display: flex;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 150px;
                width: auto;
                height: auto;
                object-fit: cover;
            }
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
        width: 50%;
    }
}
</style>