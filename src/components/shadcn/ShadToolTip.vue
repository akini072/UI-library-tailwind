<script setup>
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/shadcn/tooltip'
const props = defineProps({
    tooltip: { type: String, required: true }
})
</script>

<template>
    <TooltipProvider>
        <Tooltip :delay-duration="0">
            <TooltipTrigger>
                <slot />
            </TooltipTrigger>
            <TooltipContent>
                <p class="text-xsm">{{ props.tooltip }}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>