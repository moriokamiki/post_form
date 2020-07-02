<template>

  <v-ons-card
    modifier="inset"
    class="card"
  >
    <textarea
      class="textarea--transparent"
      placeholder="場所など追加情報(未入力可)"
      style="width: 100%; height: 20vh"
      v-model="info"
    ></textarea>
  </v-ons-card>

</template>

<script>
export default {
  data () {
    return {
      info: ""
    };
  },
  created () {
  },
  methods: {

  },
  watch: {
    info: {
      handler: function () {
        this.$emit('infoPass', this.info)
      },
    }
  }
};

</script>

<style scoped>
</style>
