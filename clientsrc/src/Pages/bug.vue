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
    <div>
      <div>
        <h3>Notes</h3>
      </div>
      <div>
        <NoteComp v-for="note in notes" :key="note._id" :noteData="note" />
      </div>
    </div>
  </div>
</template>

<script>
import NoteComp from "../components/NoteComp";
export default {
  name: "bug",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("setActive", this.$route.params.bugId);
    this.$store.dispatch("getNotesByBugId", this.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
  },
  props: ["bugId"],
  components: {
    NoteComp,
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