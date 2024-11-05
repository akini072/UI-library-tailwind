<template>
    <suspense>
        <template #default>
            <v-popup :title="title" @click="$emit('click:close')" medium>
                <template v-slot:body>
                    <div class="p-4">
                        <div class="responsive-container">
                            <div class="form-section">
                                <v-field v-model="saveTemplate.name" class="mb-4" label="Name" />
                                <v-select v-model="saveTemplate.tags" class="mb-4" label="Category" mode="tags"
                                    :options="tags" allow-create searchable />
                                <v-radio v-model="saveTemplate.is_type" value="popular" class="mb-4" label="Is popular?" />
                                <v-radio v-model="saveTemplate.is_type" value="trend" label="Is trending?" />
                            </div>

                            <div class="upload-section d-flex flex-column justify-center cursor-pointer">
                                <div class="favicon-preview" @click="$refs.inputImage.click()">
                                    <img v-if="imageUrl" :src="imageUrl" alt="Favicon Preview" />
                                    <v-icon v-else name="add-image" height="70px" color="var(--gray-300)"
                                        class="justify-center" />
                                    <input ref="inputImage" name="image" type="file" accept="image/*" @change="uploadImage"
                                        style="display: none;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:actions>
                    <v-button label="Cancel" variant="outlined" color="black" @click="$emit('click:close')" />
                    <v-button label="Save" color="primary" @click="save" />
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
            required: true
        },
    },
    data() {
        return {
            saveTemplate: {
                name: '',
                tags: [],
                is_type: 'popular'
            },
            imageUrl: null,
            formData: new FormData()
        }
    },
    methods: {
        uploadImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file.')
                return
            }

            this.imageUrl = URL.createObjectURL(file)

            this.formData.append('image', file);
        },
        save() {
            for (const [key, value] of Object.entries(this.saveTemplate)) {
                this.formData.append(key, value)
            }
            this.$emit('click:save', this.formData)
        }
    },
}
</script>

<style lang="scss" scoped>
.responsive-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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