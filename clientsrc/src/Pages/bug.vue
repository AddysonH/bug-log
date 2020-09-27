<template>
  <div v-if="bug._id">
    <div>{{ bug.description }}</div>
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