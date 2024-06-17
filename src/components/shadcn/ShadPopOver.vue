<script setup lang="ts">
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/shadcn/popover'

const props = defineProps({
    popoverTrigger: { type: Object, required: true },
    align: { type: String, required: false },
    alignOffset: { type: Number, required: false }
})
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <component :is="props.popoverTrigger" />
        </PopoverTrigger>
        <PopoverContent :align="align" :alignOffset="alignOffset">
            <slot />
        </PopoverContent>
    </Popover>
</template>