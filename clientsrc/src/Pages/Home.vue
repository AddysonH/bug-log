<template>
  <div class="home">
    <h1>This is the home page</h1>
    <form>
      <input type="text" placeholder="title" />
      <input type="textarea" placeholder="text here" />
      <button type="submit">submit</button>
    </form>
    <div>
      <bug v-for="bug in bugs" :key="bug._id" :bugData="bug" />
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug.vue";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  components: {
    Bug,
  },
};
</script>
