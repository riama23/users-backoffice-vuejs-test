<template>

</template>

<script lang="js">
export default ({
  name: "index",
  beforeMount() {
    return this.$router.push('/users');
  }
})
</script>

<style scoped>

</style>
