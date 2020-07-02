<template>
  <v-ons-card modifier="inset" class="card">
    <div class="cp_ipselect">
      <!-- <v-ons-list> -->
      <!-- <v-ons-list-header>カテゴリを選択</v-ons-list-header> -->
      <!-- <v-ons-list-item -->
      <!-- v-for="(category, $index) in options" -->
      <!-- :key="category" -->
      <!-- tappable -->
      <!-- > -->
      <!-- <label class="left"> -->
      <!-- <v-ons-checkbox -->
      <!-- :input-id="'checkbox-' + $index" -->
      <!-- :value="category" -->
      <!-- v-model="checkedCategorys" -->
      <!-- ></v-ons-checkbox> -->
      <!-- </label> -->
      <!-- <label -->
      <!-- class="center" -->
      <!-- :for="'checkbox-' + $index" -->
      <!-- >{{ category }}</label> -->
      <!-- </v-ons-list-item> -->
      <!-- </v-ons-list>  -->
      <select class="cp_sl06" required v-model="checkedCategorys">
        <option disabled value="未選択">カテゴリーを選択</option>
        <option
          v-for="option in options"
          v-bind:value="option"
          v-bind:key="option"
        >
          {{ option }}
        </option>
      </select>
      <span class="cp_sl06_highlight"></span>
      <span class="cp_sl06_selectbar"></span>
      <label class="cp_sl06_selectlabel">カテゴリーを選択</label>
    </div>
    <input
      v-show="inputSwith == true"
      type="text"
      class="text-input"
      placeholder="カテゴリー名"
      style="width: 100%"
      v-model="inputCategory"
    />
  </v-ons-card>
</template>

<script>
export default {
  data() {
    return {
      checkedCategorys: [],
      inputCategory: '',
      options: ['インタビュー', '観光', 'サークル', '生活', 'グルメ', '音楽'],
      inputSwith: false,
    };
  },
  created() {},
  methods: {},
  watch: {
    checkedCategorys: {
      handler: function() {
        if (this.checkedCategorys == '新規') {
          this.inputSwith = true;
        }
        this.$emit('categoryPass', this.checkedCategorys);
      },
    },
    inputCategory: {
      handler: function() {
        this.$emit('categoryPass', this.inputCategory);
      },
    },
  },
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
  content: '';
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
  content: '';
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
</style>
