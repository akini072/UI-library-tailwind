<script setup lang="ts">
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/shadcn/popover'
import ShadToolTip from '@/components/shadcn/ShadToolTip.vue'

const props = defineProps({
    popoverTrigger: { type: Object, required: true },
    align: { type: String, required: false },
    alignOffset: { type: Number, required: false },
    tooltip: { type: String, required: false }
})
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <ShadToolTip :trigger="props.popoverTrigger" :tooltip="tooltip" v-if="tooltip"/>
            <component v-else :is="props.popoverTrigger" />
        </PopoverTrigger>
        <PopoverContent :align="align" :alignOffset="alignOffset">
            <slot />
        </PopoverContent>
    </Popover>
</template>