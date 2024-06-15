<script setup lang="ts">
import {
    NavigationMenu,
    // NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/shadcn/navigation-menu'

const props = defineProps({
    filteredTabs: { type: null, required: true}
});
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem v-for="tab in filteredTabs" :key="tab.name" :class="{active: tab.isActive}">
                <NavigationMenuLink :href="tab.route" :class="navigationMenuTriggerStyle()">
                    {{ tab.name }}
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<style lang="scss">

</style>