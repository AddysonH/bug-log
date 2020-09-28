<template>
  <div class="home container-fluid">
    <div class="row justify-content-center my-3">
      <form class="card col-3" @submit.prevent="addBug">
        <div class="card-body">
          <input type="text" placeholder="title" v-model="newBug.title" />
          <input
            type="textarea"
            placeholder="text here"
            v-model="newBug.description"
          />
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
    <div class="row justify-content-center">
      <h1>Bugs</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-3"><h2>Title</h2></div>
      <div class="col-3"><h2>Reported By</h2></div>
      <div class="col-3"><h2>status</h2></div>
      <div class="col-3"><h2>Last Modified</h2></div>
    </div>
    <div>
      <bug v-for="bug in bugs" :key="bug._id" :bugData="bug" />
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug.vue";
export default {
  name: "home",
  data() {
    return {
      newBug: {},
    };
  },
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
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = {};
    },
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
