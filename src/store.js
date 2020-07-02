import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
      }
    }
  }
})

function shori(){
  var num =  Math.floor( Math.random() *5);
  var element = document.getElementById("text");
  element.textContent = num;
  alert("ここまでうまくいってるか3");
  /*switch(num){
      case 0 : element.innerHTML =  '<img src="png/soy1" width="200" height="200">'
      break;
      case 1 : element.innerHTML =  '<img src="png/soy2" width="200" height="200">';
      break;
      case 2 : element.innerHTML =  '<img src="png/soy3" width="200" height="200">';
      break;
      case 3 : element.innerHTML =  '<img src="png/soy4" width="200" height="200">';
      break;
      case 4 : element.innerHTML =  '<img src="png/soy5" width="200" height="200">';
      break;
      case 5 : element.innerHTML =  '<img src="png/soy6" width="200" height="200">';
      break;
  }*/
}