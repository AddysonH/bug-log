<template>
  <div class="fix container-fluid" v-if="bug._id">
    <div class="row justify-content-center">
      <div class="col-6">
        {{ bug.title }}
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        {{ bug.creatorEmail }}
      </div>
      <div class="col-6">
        {{ bug.closed }}
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 card">
        {{ bug.description }}
      </div>
    </div>
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
.fix {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>