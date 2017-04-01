<template>
  <div @click="handle"></div>
</template>

<script>
export default {
  methods: {
    handle() {
      console.log(9);
    }
  }
}
</script>

<style scoped>
.vue {
  color: green;
}
</style>
