
const LoginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const showPassword = document.querySelector(".showPassword");

LoginForm.addEventListener("submit", userLoginData)

async function userLoginData(e) {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
            email: loginEmail.value,
            password: loginPassword.value,
            headers: { "Content-Type": "application/json" }
        })
        console.log(response);
        if(response.status == 200){
            localStorage.setItem("user-token", response.data.token)
            location.pathname = "./index.html"
        } 
        else{
            console.log(false);
        }
    } 
    catch (err) {
           console.log(err); 
    }
}


showPassword.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.closest(".showPassword").previousElementSibling.type == "password") {
        e.target.closest(".showPassword").previousElementSibling.type = "text"
        e.target.closest(".showPassword").firstElementChild.className = "fa-solid fa-eye-slash"

    }
    else {
        e.target.closest(".showPassword").previousElementSibling.type = "password"
        e.target.closest(".showPassword").firstElementChild.className = "fa-solid fa-eye"
    }
})