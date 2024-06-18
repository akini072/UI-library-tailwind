<template>
    <NavigationMenuLink :class="cn(navigationMenuTriggerStyle(), { 'font-medium bg-activeBG text-[var(--primary-500)] items-center hover:!bg-activeBG hover:!text-[var(--primary-500)]': props.active }, props.class)">
        <div class="flex items-center">
            <div class=" flex flex-row mr-1 relative right-[1px]" v-if="menuData.icon">
                <component :is="menuData.icon" />
            </div>
            <p class="text-center">{{ menuData.name }}</p>
            <span class="relative uppercase flex items-center mt-1 left-1 self-start bottom-1 bg-[var(--primary-500)] px-1.5 py-0.5 text-xxs text-white font-medium rounded-sm" v-if="menuData.badge" style="height: 16px">{{ menuData.badge }}</span>
        </div>
    </NavigationMenuLink>
</template>

<script setup>
    import { NavigationMenuLink } from './navigation-menu';
    import { navigationMenuTriggerStyle } from './navigation-menu';
    import { cn } from '@/lib/utils';

    const props = defineProps({
        active: { type: Boolean, required: false },
        menuData: { type: Object, required: true },
        class: { type: String, required: false }
    });
</script>