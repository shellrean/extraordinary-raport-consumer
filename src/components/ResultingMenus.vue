<template>
  <div class="w-full min-h-0 min-w-0">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <router-link :to="{name: 'resulting.subject.plan'}" class="px-2 space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/green-book-mark.svg" class="h-8 md:h-16">
        <span>Rencana Penilaian</span>
      </router-link>
      <router-link :to="{name: 'resulting.plan.result'}" class="px-2 space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/pencil-case.svg" class="h-8 md:h-16">
        <span>Pengisian Nilai</span>
      </router-link>
    </div>
  </div>
</template>