<template>
  <v-ons-card modifier="inset" class="card">
    <div class="cp_ipselect">
      <select class="cp_sl06" required v-model="choiseAuthor">
        <option disabled value="未選択">著者を選択</option>
        <option
          v-for="(item,index) in authorArray"
          v-bind:value="item.name"
          v-bind:key="index"
        >{{item.name}}</option>
      </select>
      <span class="cp_sl06_highlight"></span>
      <span class="cp_sl06_selectbar"></span>
      <label class="cp_sl06_selectlabel">著者を選択</label>
    </div>
    <input
      v-show="choiseAuthor == '新規'"
      type="text"
      class="text-input"
      placeholder="著者名"
      style="width: 100%"
      v-model="inputAuthor"
    />
    <input
      v-show="choiseAuthor == '新規'"
      type="text"
      class="text-input"
      placeholder="筆者情報"
      style="width: 100%"
      v-model="inputInfo"
    />
    <label v-show="choiseAuthor == '新規' && !authorIcon.name" class="label">
      アイコン画像を選択
      <input v-show="!authorIcon.name" type="file" accept="image/*" @change="iconAdd" />
    </label>
    <div class="preview-item">
      <img v-show="authorIcon.name" :src="authorIcon.url" style="width:40%" alt />
      <v-ons-button v-show="authorIcon.name" @click="iconDelete">画像を削除</v-ons-button>
      <p class="preview-item-name"></p>
    </div>
    <label v-show="choiseAuthor == '新規' && !authorBackImg.name" class="label">
      背景画像を選択
      <input v-show="!authorBackImg.name" type="file" accept="image/*" @change="imgAdd" />
    </label>
    <div class="preview-item">
      <img v-show="authorBackImg.name" :src="authorBackImg.url" style="width:40%" alt />
      <v-ons-button v-show="authorBackImg.name" @click="imgDelete">画像を削除</v-ons-button>
      <p class="preview-item-name"></p>
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
      choiseAuthor: "",
      inputAuthor: "",
      inputInfo: "",
      author: {},
      id: {},
      authorArray: [],
      authorIcon: {
        name: "",
        url: ""
      },
      authorBackImg: {
        name: "",
        url: ""
      },
      inputSwith: false
    };
  },
  created() {
    const that = this;
    const rinrinAuthor = firebase.firestore().collection("rinrinAuthor");

    rinrinAuthor
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          that.author = doc.data();
          that.author.id = doc.id;
          that.authorArray.push(that.author);
        });
      })
      .then(function() {})
      .catch(function() {});
  },
  methods: {
    iconAdd(e) {
      const that = this;
      const files = e.target.files || e.dataTransfer.files;

      let imgName = files[0].name;
      this.authorIcon.name = imgName;

      let storageRef = firebase
        .storage()
        .ref(
          "author/icon/" + md5hex(JSON.stringify(new Date())) + files[0].name
        );

      storageRef.put(files[0]).then(function() {
        storageRef.getDownloadURL().then(function(url) {
          that.authorIcon.url = url;
          console.log(imgName + "保存成功");
        });
      });
    },
    iconDelete() {
      this.authorIcon.name = "";
      this.authorIcon.url = "";
    },
    imgAdd(e) {
      const that = this;
      const files = e.target.files || e.dataTransfer.files;

      let img_Name = files[0].name;
      this.authorBackImg.name = img_Name;

      let storageRef = firebase
        .storage()
        .ref(
          "author/backgroundImg/" +
            md5hex(JSON.stringify(new Date())) +
            files[0].name
        );

      storageRef.put(files[0]).then(function() {
        storageRef.getDownloadURL().then(function(url) {
          that.authorBackImg.url = url;
          console.log(img_Name + "保存成功");
        });
      });
    },
    imgDelete() {
      this.authorBackImg.name = "";
      this.authorBackImg.url = "";
    }
  },
  watch: {
    choiseAuthor: {
      handler: function() {
        this.$emit("authorPass", this.choiseAuthor);
      }
    },
    inputAuthor: {
      handler: function() {
        this.$emit("authorPass", this.inputAuthor);
      }
    },
    inputInfo: {
      handler: function() {
        this.$emit("authorInfoPass", this.inputInfo);
      }
    },
    authorIcon: {
      handler: function() {
        this.$emit("authorIconPass", this.authorIcon);
      },
      deep: true
    },
    authorBackImg: {
      handler: function() {
        this.$emit("authorImgPass", this.authorBackImg);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.cp_ipselect {
  position: relative;
  width: 90%;
  margin: 2em auto;
  text-align: center;
}
.cp_sl06 {
  position: relative;
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: 10px 10px 10px 0;
  font-size: 18px;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.cp_sl06:focus {
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}
.cp_ipselect .cp_sl06 {
  appearance: none;
  -webkit-appearance: none;
}
.cp_ipselect select::-ms-expand {
  display: none;
}
.cp_ipselect:after {
  position: absolute;
  top: 18px;
  right: 10px;
  width: 0;
  height: 0;
  padding: 0;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
.cp_sl06_selectlabel {
  color: rgba(0, 0, 0, 0.5);
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10px;
  transition: 0.2s ease all;
}
.cp_sl06:focus ~ .cp_sl06_selectlabel,
.cp_sl06:valid ~ .cp_sl06_selectlabel {
  color: #4d4d4d;
  top: -20px;
  transition: 0.2s ease all;
  font-size: 14px;
}
.cp_sl06_selectbar {
  position: relative;
  display: block;
  width: 100%;
}
.cp_sl06_selectbar:before,
.cp_sl06_selectbar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #4d4d4d;
  transition: 0.2s ease all;
}
.cp_sl06_selectbar:before {
  left: 50%;
}
.cp_sl06_selectbar:after {
  right: 50%;
}
.cp_sl06:focus ~ .cp_sl06_selectbar:before,
.cp_sl06:focus ~ .cp_sl06_selectbar:after {
  width: 50%;
}
.cp_sl06_highlight {
  position: absolute;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

.label > input {
  display: none;
}

.label {
  padding: 0 1rem;
  border: solid 1px #888;
}

.label::after {
  content: "+";
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>
