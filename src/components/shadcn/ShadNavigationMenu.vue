<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/shadcn/navigation-menu'

const props = defineProps({
    filteredTabs: { type: null, required: true}
});
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem v-for="tab in filteredTabs" :key="tab.name">
                <NavigationMenuLink :href="tab.route" :class="navigationMenuTriggerStyle()">
                    {{ tab.name }}
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<style lang="scss">

</style>