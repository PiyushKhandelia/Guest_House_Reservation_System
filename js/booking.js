      function checkAvailability() {
          // Simulating room availability check
          var roomsAvailable = Math.floor(Math.random() * 5); // Random number of available rooms (0 to 4)
          var roomList = document.getElementById("room-list");
          roomList.innerHTML = ""; // Clear previous list

          if (roomsAvailable > 0) {
              for (var i = 1; i <= roomsAvailable; i++) {
                  var li = document.createElement("li");
                  li.textContent = "Room " + i + " - Available";
                  roomList.appendChild(li);
              }
              document.getElementById("booking-form").style.display = "block"; // Show booking form
          } else {
              var li = document.createElement("li");
              li.textContent = "No rooms available for selected dates";
              roomList.appendChild(li);
              document.getElementById("booking-form").style.display = "none"; // Hide booking form
          }
      }

      function booknow() {
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            databaseURL: "https://guest-house-reservation-system-default-rtdb.firebaseio.com",
            projectId: "guest-house-reservation-system",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "196552872269",
            appId: "YOUR_APP_ID"
          };
          
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
      }