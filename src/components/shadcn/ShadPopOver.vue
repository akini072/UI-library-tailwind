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
    tooltipText: { type: String, required: false }
})
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <ShadToolTip :tooltip="tooltipText" v-if="tooltipText">
                <component :is="props.popoverTrigger" />
            </ShadToolTip>
            <component v-else :is="props.popoverTrigger" />
        </PopoverTrigger>
        <PopoverContent :align="align" :alignOffset="alignOffset">
            <slot />
        </PopoverContent>
    </Popover>
</template>