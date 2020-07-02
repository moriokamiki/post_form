<template>
  <v-ons-navigator
    swipeable
    swipe-target-width="5%"
    id="navigator"
    :page-stack="pageStack"
    var="navigator"
  ></v-ons-navigator>
</template>

<script>
import top from "./top.vue";

export default {
  beforeCreate() {
    this.$store.commit("navigator/push", top);
  },
  data() {
    return {};
  },
  computed: {
    pageStack() {
      return this.$store.state.navigator.stack;
    }
  }
};
</script>
