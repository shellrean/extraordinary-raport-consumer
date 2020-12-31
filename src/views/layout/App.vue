<template>
    <div>
        <app-sidebar/>
        <div class="c-wrapper">
            <app-header />
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
            <app-footer />
        </div >
    </div>
</template>
<script>
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
    components: {
        AppHeader,
        AppSidebar,
        AppFooter
    }
}
</script>