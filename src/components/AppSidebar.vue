<template>
    <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
        <div class="c-sidebar-brand">
            <img class="c-sidebar-brand-full" :src="'/img/logo.ico'" style="max-height: 46px" alt="Logo">
        </div>
        <ul class="c-sidebar-nav">
            <li class="c-sidebar-nav-item">
                <router-link class="c-sidebar-nav-link" to="/">
                    <i class="mr-3 flaticon-squares-4"></i>
                    Dashboard
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>