<template>
  <div class="home container-fluid bg-light">
    <form>
      <input type="text" placeholder="title" />
      <input type="textarea" placeholder="text here" />
      <button type="submit">submit</button>
    </form>

    <div class="row">
      <h1 class="text-center">Bugs</h1>
    </div>
    <div class="col-12 justify-content-center">
      <table>
        <tr>
          <th>Title</th>
          <th>Reported By</th>
          <th>status</th>
          <th>Last Modified</th>
        </tr>
        <tr>
          <bug v-for="bug in bugs" :key="bug._id" :bugData="bug" />
        </tr>
      </table>
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

<style scoped>
table {
  width: 100%;
}
th,
td {
  padding: 8px;
}
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
