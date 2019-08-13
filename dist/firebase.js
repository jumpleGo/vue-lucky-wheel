"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyCcyZ8H1cBq2a1NtH4AB9sboJQSjLtSoxA",
  authDomain: "true-betters.firebaseapp.com",
  databaseURL: "https://true-betters.firebaseio.com",
  projectId: "true-betters",
  storageBucket: "",
  messagingSenderId: "563882817339",
  appId: "1:563882817339:web:da53010c4bfb93d3"
};
firebase.initializeApp(firebaseConfig); // Add the Firebase products that you want to use

var auth = firebase.auth();
var firestore = firebase.firestore();
var settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);
auth.onAuthStateChanged(function (user) {
  if (user) {
    setupUI(user);
  } else {
    console.log('user log out');
    setupUI();
  }
});

var setupUI = function setupUI(user) {
  if (!user) {
    modal.style.visibility = "visible";
  } else {
    mail_head.textContent = user.email;
    button.style.visibility = "visible";
  }
};

var user = firebase.auth().currentUser;
var wheel = document.querySelector('.content__wrapper');
var opred = document.querySelector('.opred');
var button = document.querySelector('.wheel__controller');
var mail = document.querySelector('.email');
var pass = document.querySelector('.pass');
var modal = document.querySelector('.modal');
var registration = document.querySelector('.registration');
var mail_head = document.querySelector('.mail_head');
var btnSignIn = document.querySelector('.log_button'); //нажатие на кнопку вход'

btnSignIn.addEventListener("click", function (e) {
  var email = mail.value;
  var password = pass.value;
  var promise = auth.signInWithEmailAndPassword(email, password).then(function (cred) {
    modal.style.visibility = "hidden";
    button.style.visibility = "visible";
  })["catch"](function (error) {
    document.querySelector(".err").innerHTML = "Error! Please, check your login and password";
  });
  promise["catch"](function (e) {
    return console.log(e.message);
  });
});
var btnReg = document.querySelector('.reg_button');
var reg_mail = document.querySelector('.email_reg');
var reg_pass = document.querySelector('.pass_reg');
btnReg.addEventListener('click', function (e) {
  var email = reg_mail.value;
  var password = reg_pass.value;
  auth.createUserWithEmailAndPassword(email, password).then(function (cred) {
    firestore.collection('users').doc(cred.user.uid).set({
      email: reg_mail.value
    });
    registration.style.visibility = "hidden";
    button.style.visibility = "visible";
  })["catch"](function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode == 'auth/weak-password') {
      document.querySelector('.err').innerHTML = 'Пароль неверный.';
    } else {
      document.querySelector('.err').innerHTML = errorMessage;
    }
  });
});
var exit = document.querySelector('.exit'); //нажатие на кнопку выйти

exit.addEventListener("click", function (e) {
  auth.signOut().then(function () {});
  location.reload();
});