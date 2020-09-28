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
    <!-- <form @submit.prevent="editBug">
      <div>
        <input
          type="text"
          placeholder="New Bug Title..."
          v-model="editBugData.title"
        />
        <button type="submit">Edit</button>
      </div>
    </form> -->
    <div class="row">
      <form @submit.prevent="addNote">
        <input
          type="text"
          placeholder="New Note"
          v-model="noteData.description"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import NoteComp from "../components/NoteComp";
export default {
  name: "bug",
  data() {
    return {
      noteData: {},
    };
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
  methods: {
    addNote() {
      this.$store.dispatch("addNote", {
        bugId: this.$route.params.bugId,
        description: this.noteData.description,
      });
      this.noteData = {};
    },
    // editBug() {
    //   this.$store.dispatch("editBug", {
    //     id: this.bugProp.id,
    //     title: this.editBugData.title,
    //     bugId: this.bugProp.bugId,
    //   });
    // },
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