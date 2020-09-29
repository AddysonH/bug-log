<template>
  <div class="fix container-fluid" v-if="bug._id">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1>{{ bug.title }}</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        {{ bug.creatorEmail }}
      </div>
      <!--@change="" edit box and check box should vanish-->
      <div class="col-6">
        <input type="checkbox" v-model="bug.closed" @change="updateStatus" />
        <label class="pl-3">{{ bug.closed }}</label>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 card">
        {{ bug.description }}
      </div>
    </div>
    <div>
      <div class="row my-3">
        <form @submit.prevent="editBug">
          <div>
            <input
              type="text"
              placeholder="New Bug Title..."
              v-model="editBugData.title"
            />
            <button type="submit">Edit</button>
          </div>
        </form>
        <form @submit.prevent="editBug"></form>
      </div>
      <div class="my-3">
        <h3>Notes</h3>
      </div>
      <div>
        <NoteComp v-for="note in notes" :key="note._id" :noteData="note" />
      </div>
    </div>
    <div class="row">
      <form @submit.prevent="addNote">
        <input type="text" placeholder="New Note" v-model="noteData.content" />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import NoteComp from "../components/NoteComp.vue";
export default {
  name: "bug",
  //Store checked data pushed here
  data() {
    return {
      noteData: {},
      editBugData: {},
      checked: [],
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
        content: this.noteData.content,
      });
      this.noteData = {};
    },
    editBug() {
      this.$store.dispatch("editBug", {
        id: this.bugId,
        title: this.editBugData.title,
      });
      this.editBugData = {};
    },

    //What happens when the check is checked
    updateStatus() {
      this.$store.dispatch("updateStatus", {
        id: this.bugId,
        closed: this.checked.closed,
      });
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