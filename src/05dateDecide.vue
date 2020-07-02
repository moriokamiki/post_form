<template>

  <v-ons-card
    modifier="inset"
    class="card"
  >
    公開日(入力無しの場合は投稿直後に公開されます)
    <input
      type="date"
      v-model="date"
      style="width: 100%"
    >
  </v-ons-card>

</template>

<script>
export default {
  data () {
    return {
      date: ""
    };
  },
  created () {
  },
  methods: {

  },
  watch: {
    date: {
      handler: function () {
        this.$emit('datePass', this.date)
      },
    }
  }
};

</script>

<style scoped>
</style>
