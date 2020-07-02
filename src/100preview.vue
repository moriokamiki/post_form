<template>

  <v-ons-list>
    <div
      v-for="item in mainArticle"
      :key="item.index"
    >
      <v-ons-list-header v-if="item.type=='title'">{{item.contents}}</v-ons-list-header>
      <v-ons-list-item v-if="item.type=='detail'">{{item.contents}}</v-ons-list-item>
      <img
        v-if="item.type=='image'"
        :src="item.uploadedImage"
      >

    </div>

  </v-ons-list>

</template>

<script>
export default {
  props: ['mainArticle'],
  data () {
    return {
    };
  },
  created () {
  },
  methods: {

  }
};

</script>

<style scoped>
</style>
