<template>
  <div class="row card">
    <p>{{ noteData.content }}</p>
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
};
</script>