<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
const props = defineProps({
    input: { type: Object, required: false },
})
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <component :is="input" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <slot />
        </DropdownMenuContent>
    </DropdownMenu>
</template>