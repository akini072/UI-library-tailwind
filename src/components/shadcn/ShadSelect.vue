<script setup>
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/select'

const props = defineProps({
    options: { type: null, required: false, default: [] },
    width: { type: String, required: false },
    placeholder: { type: String, required: false },
    defaultValue: { type: String, required: false },
    triggerClass: { type: String, required: false },
    itemClass: { type: String, required: false },
    icon: {type: Object, required: false}
});

const selectedOption = defineModel('selected:value');
</script>

<template>
    <div :style="{ width, }">
        <Select v-model="selectedOption" :defaultValue="defaultValue">
            <SelectTrigger :class="triggerClass">
                <SelectValue :placeholder="placeholder" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem :class="itemClass" v-for="option in options" :key="option.value" :value="option.value">
                    <div class="flex items-center">
                        <div class="mr-2 flex select-icon">
                            <component :is="icon" />
                        </div>
                        {{ option.name }}
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>