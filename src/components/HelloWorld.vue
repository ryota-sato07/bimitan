<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="main">
    <h1 class="main-text">{{ msg }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.main {
  color: #888;
  &-text {
    font-size: 120px;
    font-weight: bold;
  }
}
</style>
