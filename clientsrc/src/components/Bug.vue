<template>
  <div class="row justify-content-center">
    <div class="col-3" v-if="bugData._id">
      <router-link :to="{ name: 'bug', params: { bugId: bugData._id } }">
        <p>{{ bugData.title }}</p>
      </router-link>
    </div>
    <div class="col-3">
      <p>{{ bugData.creator.name }}</p>
    </div>
    <div>
      <p class="col-3">{{ bugData.closed }}</p>
    </div>
    <div>
      <p class="col-3">{{ bugData.updatedAt }}</p>
    </div>
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
  methods: {},
};
</script>




<style scoped>
td {
  padding: 8px;
}
</style>