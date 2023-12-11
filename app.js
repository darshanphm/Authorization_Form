// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHNwnQxI6Lok-jc6K1cOac6ZdYm6kqtcg",
  authDomain: "loginform-c5d34.firebaseapp.com",
  projectId: "loginform-c5d34",
  storageBucket: "loginform-c5d34.appspot.com",
  messagingSenderId: "1089789232502",
  appId: "1:1089789232502:web:b58cddb110978ed49be657",
  measurementId: "G-W7CWBE5L27",
};

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

// let firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
// };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function register() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let full_name = document.getElementById("full_name").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email and Password is required !!");
    return;
  }
  if (validate_field(full_name) == false) {
    alert("Name is required!!");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      let user = auth.currentUser;

      let database_ref = database.ref();
      const currentDate = new Date().toDateString();
      // Create User data
      let user_data = {
        email: email,
        full_name: full_name,
        last_login: currentDate,
      };

      database_ref.child("users/" + user.uid).set(user_data);

      alert("User Created!!");
    })
    .catch(function (error) {
      let error_code = error.code;
      let error_message = error.message;
      alert(error_code, error_message);
    });
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email and Password is required!!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      let user = auth.currentUser;

      let database_ref = database.ref();

      let user_data = {
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).update(user_data);
      alert("User Logged In!!");
    })
    .catch(function (error) {
      let error_code = error.code;
      let error_message = error.message;
      alert(error_code, error_message);
    });
}

function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
