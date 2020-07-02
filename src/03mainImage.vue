<template>
  <v-ons-card modifier="inset" class="card">
    <label v-show="!articleMainImgSource" class="input-item__label">
      画像を選択
      <input type="file" accept="image/*" @change="onFileChange" />
    </label>
    <div class="preview-item">
      <img
        v-show="articleMainImgSource"
        class="preview-item-file"
        :src="articleMainImgSource"
        alt
        style="width:40%"
      />
      <v-ons-button v-show="articleMainImgSource" @click="remove">画像を削除</v-ons-button>
      <p class="preview-item-name">{{ articleMainImg.name }}</p>
    </div>
  </v-ons-card>
</template>

<script>
import firebase from "firebase";
const crypto = require("crypto");
function md5hex(str /*: string */) {
  const md5 = crypto.createHash("md5");
  return md5.update(str, "binary").digest("hex");
}

export default {
  data() {
    return {
      articleMainImg: {
        name: "",
        url: ""
      },
      articleMainImgSource: ""
    };
  },
  created() {},
  methods: {
    async onFileChange(e) {
      let that = this;
      this.modalVisible = true;
      const files = e.target.files || e.dataTransfer.files;

      await this.createImage(files[0]); //awaitされてない
      this.modalVisible = false;

      let img_name = files[0].name;
      this.articleMainImg.name = img_name;

      let storageRef = firebase
        .storage()
        .ref(
          "article/mainImage/" +
            md5hex(JSON.stringify(new Date())) +
            files[0].name
        );
      storageRef.put(files[0]).then(function(snapshot) {
        storageRef.getDownloadURL().then(function(url) {
          that.articleMainImg.url = url;
          console.log(img_name + "保存成功");
        });
      });
    },
    remove() {
      this.articleMainImgSource = "";
      this.articleMainImg.name = "";
      this.articleMainImg.url = "";
    },
    createImage(file) {
      return new Promise((resolve, reject) => {
        let that = this;
        const reader = new FileReader();
        reader.onload = e => {
          that.articleMainImgSource = e.target.result;
        };

        reader.readAsDataURL(file);
        resolve(reader);
      });
    }
  },
  watch: {
    articleMainImg: {
      handler: function() {
        this.$emit("mainImagePass", this.articleMainImg);
        console.log("nnnnnnnnnnnnnnnn");
      },
      deep: true
    }
  }
};
</script>

<style scoped>
label > input {
  display: none;
}

label {
  padding: 0 1rem;
  border: solid 1px #888;
}

label::after {
  content: "+";
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>
