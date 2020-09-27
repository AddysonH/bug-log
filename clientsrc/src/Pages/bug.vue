<template>
  <div v-if="bug._id" class="bg-light">
    <div>{{ bug.title }}</div>
    <div>{{ bug.creatorEmail }}</div>
    <div>{{ bug.description }}</div>
    <div>{{ bug.closed }}</div>

    <p>This is detail page</p>
  </div>
</template>

<script>
export default {
  name: "bug",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("setActive", this.$route.params.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
  },
};
</script>

<style scoped>
</style>