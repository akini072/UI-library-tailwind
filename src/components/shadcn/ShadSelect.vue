<script setup>
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/select'
import VIcon from '../base/VIcon.vue';
import { ref } from 'vue';
import { cn } from '@/lib/utils';
const props = defineProps({
    options: { type: null, required: false, default: [] },
    width: { type: String, required: false },
    placeholder: { type: String, required: false },
    defaultValue: { type: String, required: false },
    triggerClass: { type: String, required: false },
    itemClass: { type: String, required: false },
    icon: { type: Object, required: false }
});

const selectedOption = defineModel('selected:value');
const isOpen = ref(false)
</script>

<template>
    <div :style="{ width, }">
        <Select v-model:modelValue="selectedOption" v-model:open="isOpen" :defaultValue="defaultValue">
            <SelectTrigger :isOpen="isOpen" :class="triggerClass">
                <!-- <SelectValue :placeholder="placeholder" /> -->
                <div class="flex gap-2 items-center select-icon" v-if="options.length">
                    <v-icon :name="icon.name" :color="icon.color" />
                    <span class="whitespace-nowrap overflow-hidden max-sm-none text-ellipse w-full ">{{ selectedOption
                    }}</span>
                </div>
                <span v-else>{{ placeholder }}</span>
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="option in options" :key="option.value" :value="option.value"
                    :class="cn(itemClass, selectedOption == option.value && 'active text--primary-700')">
                    <div class="flex items-center">
                        <div class="mr-2 flex select-icon">
                            <v-icon :name="icon.name" :color="icon.color" />
                        </div>
                        {{ option.name }}
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 640px) {
    .max-sm-none {
        display: none;
    }
}
</style>