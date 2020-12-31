<template>
  <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
    <div class="c-sidebar-brand">
      <img class="c-sidebar-brand-full" :src="'/img/logo.ico'" style="max-height: 46px" alt="Logo">
    </div>
    <ul class="c-sidebar-nav">
      <li class="c-sidebar-nav-item">
        <router-link class="c-sidebar-nav-link" :to="{name: 'dashboard' }">
          <i class="mr-3 flaticon-layer"></i>
          Dashboard
        </router-link>
      </li>
      <li class="c-sidebar-nav-title">Menu utama</li>
      <li class="c-sidebar-nav-item c-sidebar-nav-dropdown">
        <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
          <i class="mr-3 flaticon2-layers"></i> Data master
        </a>
        <ul class="c-sidebar-nav-dropdown-items">
          <li class="c-sidebar-nav-item">
            <router-link class="c-sidebar-nav-link" to="/">
              <span class="c-sidebar-nav-icon"></span> Jurusan
            </router-link>
          </li>
          <li class="c-sidebar-nav-item">
            <router-link class="c-sidebar-nav-link" to="/">
              <span class="c-sidebar-nav-icon"></span> Kelas
            </router-link>
          </li>
          <li class="c-sidebar-nav-item">
            <router-link class="c-sidebar-nav-link" to="/">
              <span class="c-sidebar-nav-icon"></span> Guru
            </router-link>
          </li>
          <li class="c-sidebar-nav-item">
            <router-link class="c-sidebar-nav-link" to="/">
              <span class="c-sidebar-nav-icon"></span> Siswa
            </router-link>
          </li>
        </ul>
      </li>
      <li class="c-sidebar-nav-title">Konfigurasi aplikasi</li>
      <li class="c-sidebar-nav-item">
        <router-link class="c-sidebar-nav-link" :to="{name: 'dashboard' }">
          <i class="mr-3 flaticon2-settings"></i>
          Setting akademik
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