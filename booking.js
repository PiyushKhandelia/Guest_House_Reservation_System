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