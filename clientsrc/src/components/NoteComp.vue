<template>
  <div>
    <div class="row card my-3">
      <div>
        <p>{{ noteData.content }}</p>
      </div>
      <button @click="deleteNote">del</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteComp",

  props: {
    noteData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.noteData);
    },
  },
};
</script>