const apiUrl = "http://localhost:3000/users";

// SIGN UP
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Check if email already exists
    fetch(`${apiUrl}?email=${email}`)
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          alert("Email already registered!");
        } else {
          const newUser = { name, email, password };
          fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          })
            .then(res => res.json())
            .then(user => {
              localStorage.setItem("loggedInUser", JSON.stringify(user));
              window.location.href = "profile.html";
            });
        }
      });
  });
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch(`${apiUrl}?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(users => {
        if (users.length === 1) {
          localStorage.setItem("loggedInUser", JSON.stringify(users[0]));
          window.location.href = "profile.html";
        } else {
          alert("Invalid email or password!");
        }
      });
  });
}
