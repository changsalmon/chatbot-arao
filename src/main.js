import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// ...
library.add(fas, far, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
const config = {
  apiKey: "AIzaSyAo-LzU7pqPg-vQkVtfCy8tOtUmLbVwp3o",
  projectId: "chatbot-b2ec3",
  authDomain: "chatbot-b2ec3.firebaseapp.com",
  databaseURL: "https://chatbot-b2ec3.firebaseio.com",
  storageBucket: "chatbot-b2ec3.appspot.com",
  messagingSenderId: "258429407612"
};

firebase.initializeApp(config);

export default firebase;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
