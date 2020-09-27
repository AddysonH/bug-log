<template>
  <div>
    <router-link :to="{ name: 'bug', params: { bugId: bugData._id } }">
      <td>{{ bugData.title }}</td>
    </router-link>
    <td>{{ bugData.creator.name }}</td>
    <td>{{ bugData.closed }}</td>
    <td>{{ bugData.updatedAt }}</td>
  </div>
</template>

<script>
export default {
  name: "Bug",
  props: {
    bugData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
td {
  padding: 8px;
}
</style>