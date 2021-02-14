<template>
  <div class="h-screen overflow-hidden flex items-center justify-center font-poppins">
    <section class="h-screen w-screen bg-gray-50 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
      <aside class="sm:h-full sm:w-16 w-full h-12 bg-gray-800 text-gray-200">
        <ul class="text-center flex flex-row sm:flex-col w-full">
          <li class="h-14 border-b border-gray-900 hidden sm:block">
            <a href="/" class="h-full w-full hover:bg-gray-700 block p-3">
              <img class="object-contain h-full w-full" src="/img/logo.ico"
                alt="" />
            </a>
          </li>
          <li class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Beranda">
            <router-link to="/" class="h-full w-full hover:bg-gray-700 block p-3">
              <HomeIconLine class="mx-auto"/>
            </router-link>
          </li>
          <li v-if="authorized_user.role == 2" class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Resulting">
            <router-link :to="{name: 'resulting.index' }" class="h-full w-full hover:bg-gray-700 block p-3">
              <TaskIconLine class="mx-auto h-6" />
            </router-link>
          </li>
          <li v-if="authorized_user.role == 1" class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Dunia">
            <router-link :to="{name: 'master.index' }" class="h-full w-full hover:bg-gray-700 block p-3">
              <DatabaseIconLine class="mx-auto"/>
            </router-link>
          </li>
          <li v-if="authorized_user.role == 1" class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Akademik">
            <router-link :to="{name: 'academic.index' }" class="h-full w-full hover:bg-gray-700 block p-3">
              <AttachmentIconLine class="mx-auto"/>
            </router-link>
          </li>
          <li v-if="authorized_user.role == 1" class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Pengaturan">
            <router-link :to="{name: 'setting.index'}" class="h-full w-full hover:bg-gray-700 block p-3">
              <SettingIconLine class="mx-auto"/>
            </router-link>
          </li>
          <li class="sm:border-b border-gray-900 flex-1 sm:w-full" title="Logout">
            <button @click="logoutFromDashboard" class="h-full w-full hover:bg-gray-700 block p-3">
              <LogoutIconLine class="mx-auto"/>
            </button>
          </li>
        </ul>
      </aside>
      <main class="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
        <nav class="border-b-2 border-gray-300 bg-white px-2 sm:px-6 py-2 flex items-center min-w-0 h-14">
          <h1 class="font-semibold text-lg"></h1>
          <span class="flex-1" v-if="typeof academic_active != 'undefined'">
            <span class="py-1 sm:px-3 text-xs sm:text-sm font-semibold text-gray-500" v-if="academic_active.id == (academics[academics.length - 1] ? academics[academics.length - 1].id : '-')">Akademik {{ academic_active.name }} semester {{ academic_active.semester }}</span>
            <span class="py-1 px-3 bg-yellow-300 rounded-full text-xs text-gray-500" v-else>Akademik Arsip {{ academic_active.name }} semester {{ academic_active.semester }}</span>
          </span>
          <span class="mr-2">
          </span>
          <button
            class="ml-auto border rounded-full ml-2 w-10 h-10 text-center leading-none text-gray-200 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user h-6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
        </nav>
        <section class="flex-1 pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0 overflow-y-scroll">
          <router-view></router-view>
        </section>
        <footer class="px-6 py-3 border-t flex w-full items-end">
          <p class="text-gray-600 text-xs">Powered by extraordinary-raport</p>
        </footer>
      </main>
    </section>
    <div class="absolute top-0 left-0 w-full">
      <div class="flex justify-center">
        <LoadBar v-if="isLoading" />
      </div>
    </div>
  </div>
</template>
<script>
import HomeIconLine from '@/components/icons/HomeIconLine'
import SettingIconLine from '@/components/icons/SettingIconLine'
import DatabaseIconLine from '@/components/icons/DatabaseIconLine'
import AttachmentIconLine from '@/components/icons/AttachmentIconLine'
import LogoutIconLine from '@/components/icons/LogoutIconLine'
import TaskIconLine from '@/components/icons/TaskIconLine'
import LoadBar from '@/components/nano/LoadBar'
import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    HomeIconLine,
    SettingIconLine,
    DatabaseIconLine,
    AttachmentIconLine,
    LogoutIconLine,
    TaskIconLine,
    LoadBar,
  },
  data() {
    return {
      notif: [],
      academic: {}
    }
  },
  computed: {
    ...mapState(['isLoading', 'academic_active']),
    ...mapState('sett', ['settings']),
    ...mapState('academic', ['academics']),
    ...mapState('auth', ['authorized_user']),
  },
  methods: {
    ...mapActions(['setAcademicYear','logout']),
    ...mapActions('sett', ['fetchSettings']),
    ...mapActions('academic',['fetchAcademics']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchData() {
      (async() => {
        try {
          await this.fetchSettings(['academic_active'])
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchData()
            return
          }
          this.showError(err)
        }
      })()
    },
    fetchDataAcademics() {
      (async() => {
        try {
          await this.fetchAcademics()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataAcademics()
            return
          }
          this.showError(err)
        }
      })()
    },
    setAcademic() {
      const set_academic = this.settings.filter((item) => item.name == 'academic_active')
      if (set_academic.length > 0) {
        const academic = this.academics.filter((item) => item.id == set_academic[0].value)
        if (academic.length > 0) {
          if(academic[0].id != this.academics[this.academics.length - 1].id) {
            academic[0].archive = true
          } else {
            academic[0].archive = false
          }
          this.setAcademicYear(academic[0])
        }
      }
    },
    logoutFromDashboard() {
      (async() => {
        try {
          await this.logout()
          this.$store.state.auth.authorized_user = {}
          this.$router.replace({name: 'login' })
        } catch (err) {
          this.showError(err)
        }
      })()
    }
  },
  created() {
    this.fetchData()
    this.fetchDataAcademics()
  },
  mounted() {
    
  },
  watch: {
    academics(val) {
      if(this.settings.length > 0) {
        this.setAcademic()
      }
    },
    settings(val) {
      if(this.academics.length > 0) {
        this.setAcademic()
      }
    }
  }
};
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>