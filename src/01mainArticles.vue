<template>
  <v-ons-card
    modifier="inset"
    class="card"
  >
    <div
      v-for="(item,$index) in dataArray"
      :key=$index
    >
      <div v-if="item.type=='title'">
        <input
          type="text"
          class="text-input"
          placeholder="章タイトル(20文字以内を推奨)"
          style="width: 50%"
          v-model="item.contents"
        >
        <v-ons-button @click="deleteData($index)">欄を削除</v-ons-button>
        <hr>
      </div>

      <div v-if="item.type=='detail'">
        <textarea
          class="textarea--transparent"
          placeholder="詳細"
          style="width: 50%; height: 30vh"
          v-model="item.contents"
        ></textarea>
        <v-ons-button @click="deleteData($index)">欄を削除</v-ons-button>
        <hr>
      </div>

      <div v-if="item.type=='image'">
        <label
          v-show="!item.uploadedImage"
          class="input-item__label"
        >画像を選択
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            @click="clickTarget=$index"
          />
        </label>
        <div class="preview-item">
          <img
            v-show="item.uploadedImage"
            class="preview-item-file"
            :src="item.uploadedImage"
            alt=""
            style="width:40%"
          />
          <v-ons-button
            v-show="item.uploadedImage"
            @click="remove"
          >
            画像を削除
          </v-ons-button>
          <p class="preview-item-name">{{ item.img_name }}</p>
          <input
            type="text"
            class="text-input"
            placeholder="画像の説明"
            style="width: 50%"
            v-model="item.imageDesc"
          >
        </div>
        <v-ons-button @click="deleteData($index)">欄を削除</v-ons-button>
        <hr>
      </div>
    </div>

    <v-ons-button
      modifier="small"
      @click="add('title')"
    >タイトルを追加</v-ons-button>
    <v-ons-button
      modifier="small"
      @click="add('detail')"
    >詳細を追加</v-ons-button>
    <v-ons-button
      modifier="small"
      @click="add('image')"
    >画像を追加</v-ons-button>

    <v-ons-modal :visible="modalVisible">
      <p style="text-align: center">
        読み込み中
        <br>しばらくお待ちください。
      </p>
    </v-ons-modal>

  </v-ons-card>
</template>

<script>
import firebase from 'firebase'
const crypto = require('crypto')
function md5hex (str /*: string */) {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}

export default {
  data () {
    return {
      dataArray: [],
      clickTarget: "",
      modalVisible: false
    };
  },
  created () {
    this.dataArray.push({ type: "title", contents: "" }, { type: "detail", contents: "" });
  },
  methods: {
    add (type) {
      if (type == "image") {
        this.dataArray.push({
          type: type, contents: "", imageDesc: "", img_name: "", uploadedImage: false
        })
      } else {
        this.dataArray.push({
          type: type, contents: "",
        });
      }
    },
    deleteData (index) {
      this.dataArray.splice(index, 1)
    },
    async onFileChange (e) {
      let that = this;
      this.modalVisible = true;
      const files = e.target.files || e.dataTransfer.files;
      let img_name = files[0].name;
      //const img_nameBytes = encodeURIComponent(img_name).replace(/%../g, 'x').length;
      await this.createImage(files[0]);//awaitされてない
      this.modalVisible = false;
      this.dataArray[this.clickTarget].img_name = img_name;

      let storageRef = firebase.storage().ref("article/image/" + md5hex(JSON.stringify(new Date())) + files[0].name);
      storageRef.put(files[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          that.dataArray[that.clickTarget].contents = url;
        });
      });
    },
    remove () {
      this.dataArray[this.clickTarget].uploadedImage = false;
      this.dataArray[this.clickTarget].contents = "";
      this.dataArray[this.clickTarget].img_name = "";
    },
    createImage (file) {
      return new Promise((resolve, reject) => {
        let that = this;
        const reader = new FileReader();
        reader.onload = e => {
          that.dataArray[that.clickTarget].uploadedImage = e.target.result;
        };

        reader.readAsDataURL(file);
        resolve(reader)
      })
    }
  },
  watch: {
    dataArray: {
      handler: function () {
        this.$emit('dataPass', this.dataArray)
      },
      deep: true
    }
  }
};

</script>

<style scoped>
hr {
  border-top: 1px dashed #8c8b8b;
  border-bottom: 1px dashed #fff;
}
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
