// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

import Vue from "vue";
import VueOnsen from "vue-onsenui";
import store from "./store";
import App from "./App";
import firebase from "firebase";

Vue.config.productionTip = false;

Vue.use(VueOnsen);
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDgFemyTKXVrVt1MHd4gik0zox6lXiygfU",
  authDomain: "mcaexpf-2020.firebaseapp.com",
  databaseURL: "https://mcaexpf-2020.firebaseio.com",
  projectId: "mcaexpf-2020",
  storageBucket: "mcaexpf-2020.appspot.com",
  messagingSenderId: "516312906962",
  appId: "1:516312906962:web:389eec529241b08943410b",
  measurementId: "G-132GKBK5TS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  template: "<App/>",
  components: {
    App,
  },
});
