var loginForm = document.querySelector("form.login");
var signupForm = document.querySelector("form.signup");
var toastContainer = document.getElementById("liveToast");
var toastBody = toastContainer.querySelector(".toast-header").innerHTML;
var users = JSON.parse(localStorage.getItem("users")) || [];
const wrapper = document.querySelector(".wrapper"),
signupHeader = document.querySelector(".signup header"),
loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () => {
    wrapper.classList.add("active");
  });
  signupHeader.addEventListener("click", () => {
      wrapper.classList.remove("active");
  });


function generateUserId(email) {
    return email.replace(/[^a-zA-Z0-9]/g, '') + Date.now();
}

function showToast(header, msg, textcolr,boycolor) {
    const toast = new bootstrap.Toast(toastContainer);
    toastContainer.querySelector(".toast-header").innerHTML = header + toastBody;
    toastContainer.querySelector(".toast-body").innerText = msg;
    toastContainer.querySelector(".toast-header").style.color = textcolr;
    toastContainer.querySelector(".toast-body").style.color = textcolr;
    toastContainer.querySelector(".toast-body").style.background = boycolor;
    toastContainer.querySelector(".toast-header").style.background = boycolor;
    toast.show();
}

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(event.currentTarget);
    var email = formData.get("email");
    var password = formData.get("password");
    var fullName = formData.get("fullname");
    var regex = /^.{8,}$/;
    if(!regex.test(password)){
        showToast("Error", "password must be at least 8 chracters long", "red", "white")
        return;
    }

    if (!users.find(function (user) { return user.email === email; })) {
        var userId = generateUserId(email);
        users.push({ id: userId, email: email, password: password, fullName: fullName, });
        showToast("Thanks", "Account created successfully", "white","green");
    } else {
        showToast("Error", "Account already exists", "white","red");
    }

    localStorage.setItem("users", JSON.stringify(users));
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(event.currentTarget);
    var userCred = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    var userExist = users.find(function (user) {
        return user.email === userCred.email;
    });

    if (!userExist || userExist.password !== userCred.password) {
        showToast("Error", "Invalid email or password", "white","red");
        return;
    }

    localStorage.setItem("islogdin", "true");
    localStorage.setItem("loggedInUserId", userExist.id); 
    location.href = "index.html";
});



