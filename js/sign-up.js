/*

// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyACLgTzxec6kUV1T__xQsOk_sL3SSbW81U",
    authDomain: "guest-house-booking-4e024.firebaseapp.com",
    projectId: "guest-house-booking-4e024",
    storageBucket: "guest-house-booking-4e024.appspot.com",
    messagingSenderId: "613303744507",
    appId: "1:613303744507:web:5bb7c28f6bf02947e8bd5e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //get ref to database services
  const db = getDatabase(app);

  document.getElementById("submit").addEventListener('click', function(e) {
    e.preventDefault();
    set(ref(db, 'user/' + document.getElementById("username").value),
    {

        username: document.getElementById("username").value,
        name: document.getElementById("name").value,
        password: document.getElementById("password").value

    });
        alert("Login Successful");
  })
*/