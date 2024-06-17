<script setup>
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/shadcn/tooltip'
const props = defineProps({
    tooltip: { type: String, required: true },
    trigger: { type: Object, required: true }
})
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <component :is="props.trigger" />
            </TooltipTrigger>
            <TooltipContent>
                <p class="text-xs">{{ props.tooltip }}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>