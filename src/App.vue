<script setup lang="ts">
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import PageTop from './pages/Top.vue'
</script>

<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <AppHeader/>
      <AppFooter/>
      <PageTop/>
    </q-layout>
  </div>
</template>
