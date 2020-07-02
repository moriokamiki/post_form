<template>
  <v-ons-alert-dialog modifier="rowfooter" :visible.sync="modalVisible">
    <slot></slot>
    <template slot="footer">
      <v-ons-alert-dialog-button @click="modalClose">Ok</v-ons-alert-dialog-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  props: ["modalVisible"],
  data() {
    return {};
  },
  created() {},
  methods: {
    modalClose() {
      this.$emit("modalClose", false);
    }
  }
};
</script>

<style scoped>
</style>
