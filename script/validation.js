firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is logged in
        const uid = sessionStorage.getItem('uid');
        // const uid = user.uid;
        getUserDetails(uid);
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html';
    }
  });
  
  function getUserDetails(uid) {
    const user = firebase.auth().currentUser;
    if (uid) {
      const email = user.email;
      $("#email").val(email);
      document.getElementById("email").innerText = email;
                // Display user details on the dashboard
                // displayUserDetails(userDetails);
          
    } else {
      console.log("No user is currently logged in.");
    }
  };
// ------------------------------------------------------------
// Function to log out the user
function logout() {
    firebase.auth().signOut()
    .then(() => {
        // Sign-out successful.
        sessionStorage.removeItem('uid'); // Clear UID from session storage
        console.log("User logged out successfully");
        // Redirect to the login page or any other page after logout
        window.location.href = 'login.html';
    })
    .catch((error) => {
        // An error happened.
        console.error("Error logging out:", error);
    });
}
// ----------------------------------------------------------
// function isValidUserData(data) {
//     for (const key in data) {
//       if (!data[key]) {
//         return false;
//       }
//     }
//     return true;
//   }
function isValidUserData(data) {
    for (const key in data) {
      // Check if the value is null, undefined, or an empty string
      if (!data[key] && data[key] !== 0) {
        return false; // Return false if any field is empty
      }
    }
    return true; // Return true if all fields are filled
  }

  // ------------------------------------------------------------
