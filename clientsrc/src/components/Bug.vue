<template>
  <h1>{{ bugData.title }}</h1>
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