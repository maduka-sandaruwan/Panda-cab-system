
const googleSignInButton = document.getElementById('google-sign');
const errorMessageElement = document.getElementById('error-message');

googleSignInButton.addEventListener('click', signInWithGoogle);

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log('User signed in successfully:', result.user);
        const user = result.user;
        const uid = user.uid;
        sessionStorage.setItem('uid', uid); // Store UID in session storage
        window.location.href = `dashbord.html?uid=${uid}`; // Redirect to dashboard
    })
    .catch((error) => {
        const errorMessage = error.message;
        showErrorMessage(errorMessage); // Show error message to user
    });
}

function showErrorMessage(message) {
    errorMessageElement.textContent = message;
}
// ------------------------------------------------------------


const signUp=()=> {
  const email = document.getElementById('email').value;
  const Name = document.getElementById('Name').value;
  const password = document.getElementById('password').value;
  const confirePassword = document.getElementById('confirePassword').value;

  if (password !== confirePassword) {
    alert("Passwords do not match.");
    return;
  }
  // Check if the email is already in use
  firebase.auth().fetchSignInMethodsForEmail(email)
  .then((signInMethods) => {
      if (signInMethods.length > 0) {
          // Email is already in use
          showError('Email is already registered');
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Send email verification
            sendEmailVerification();
            return firebase.firestore().collection('users').doc(userCredential.user.uid).set({
              Name: Name,
              email: email,
              confirePassword: confirePassword,
              });
            console.log('User signed up successfully');
          })
          .catch((error) => {
              const errorMessage = error.message;
              showErrorMessage(errorMessage);
              alert(error.message);
          });
          clearData();
      }
    })
  
};

function sendEmailVerification() {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
  .then(() => {
    alert('Email verification sent');
  })
  .catch((error) => {
      const errorMessage = error.message;
      showError(errorMessage);
  });
}

function showErrorMessage(message) {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = message;
}

// ------------------------------------------------------------------

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
          // User is logged in and email is verified
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 3500
          });
          const user = firebase.auth().currentUser;
          if (user) {
              const uid = user.uid;
              sessionStorage.setItem('uid', uid); // Store UID in session storage
              window.location.href = `dashbord.html?uid=${uid}`;
          }
          // const uid = user.uid;
          // window.location.href = `dashbord.html?uid=${uid}`; // Redirect to home page
      } else {
          // Email is not verified
          alert('Please verify your email before logging in.');
      }
  })
  .catch((error) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Invalid Email or Password",
      showConfirmButton: false,
      timer: 2500
    });
  });
}

function showErrorMessage(message) {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = message;
}
// -------------------------------------------------------------------
const clearData = () => {
  email.value = "";
  Name.value = "";
  password.value = "";
  confirePassword.value = "";
};



