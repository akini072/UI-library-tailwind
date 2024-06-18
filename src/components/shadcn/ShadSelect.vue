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
                <SelectValue :placeholder="placeholder" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="option in options" :key="option.value" :value="option.value"
                    :class="cn(itemClass, selectedOption == option.value && 'bg-activeBG')">
                    <div class="flex items-center">
                        <div class="mr-2 flex select-icon">
                            <v-icon :name="icon.name" :color="icon.color" />
                        </div>
                        <span class="whitespace-nowrap overflow-hidden text-ellipse w-full md:w-auto ">{{ option.name }}</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>