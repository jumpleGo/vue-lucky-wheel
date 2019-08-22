import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import * as firebase from 'firebase'

import 'firebase/firestore'


Vue.use(firestorePlugin)
Vue.config.productionTip = false


firebase.initializeApp({
   apiKey: "AIzaSyCcyZ8H1cBq2a1NtH4AB9sboJQSjLtSoxA",
   authDomain: "true-betters.firebaseapp.com",
   databaseURL: "https://true-betters.firebaseio.com",
   projectId: "true-betters",
   storageBucket: "",
   messagingSenderId: "563882817339",
   appId: "1:563882817339:web:da53010c4bfb93d3"
})
export var db = firebase.firestore();
export var auth = firebase.auth();


new Vue({
  render: h => h(App),
  
}).$mount('#app')
