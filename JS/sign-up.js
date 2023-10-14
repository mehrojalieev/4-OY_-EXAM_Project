    const SignUpForm = document.getElementById("signup-form");
const SignUpButton = document.querySelector("#signup-btn")
const Firstname = document.getElementById("firstname");
const Lastname = document.getElementById("lastname");
const Email = document.getElementById("email")
const passwordInput = document.querySelector(".password-input")
const Password = document.getElementById("password")
const passwordMessage = document.querySelector(".password-message")
const showPassword = document.querySelector(".showPassword");
const emailSuccess = document.querySelector(".success-message")
const emailError = document.querySelector(".error-message")
const Loading = document.querySelector(".lds-ring")
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


// EMAIL ma'lumotlarini tekshirish !!!
Email.addEventListener("input", () => {
    const checkStateEmail = EMAIL_REGEX.test(Email.value);
    if (checkStateEmail) {
        emailSuccess.style = "display: block; color: green";
        emailError.style = "display: none";
        Email.style = "border: 3px solid green"
    }
    else if (!checkStateEmail) {
        emailSuccess.style = "display: none";
        emailError.style = "display: block; color: red" ;
    }
    else {
        emailError.style = "display: block";
    }
});

Email.addEventListener("blur", () => {
    emailSuccess.style = "display: none"
    emailError.style = "display: none"
    Email.style = "border: 3px solid black;"
})


// PASSWORD ni tekshirish !!!
Password.addEventListener("input", () => {
    const checkStatePassword = PASSWORD_REGEX.test(Password.value);
    if (Password.value.trim().length > 1 && checkStatePassword) {
        passwordInput.style = "border: 3px solid green;" 
        passwordMessage.style = "display: none"
    }
    else if(!checkStatePassword){
        passwordInput.style = "border: 3px solid red;" 
        passwordMessage.style = "display: block"
    }
  
})

Password.addEventListener("blur", () => {
    passwordMessage.style = "display: none"
})


SignUpForm.addEventListener("submit", createUserData)   

    async  function createUserData(e){
    e.preventDefault()
    Loading.classList.add("signup-btn-load")
    SignUpButton.classList.add("loading-btn")
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                firstname: Firstname.value,
                lastname: Lastname.value,
                email: Email.value,
                password: Password.value,
                headers: {"Content-Type": "application/json"}
            })
            console.log(response);
            if(response.statusText == 'Created'){
              location.replace(location.origin + "/pages/log-in.html")
            }
          } 
     
          catch (err) {
            console.log(err);
        }
    }
   
        

        
        // // /Keyingi Loginga o'tishi
        //     const checkStateEmail = EMAIL_REGEX.test(Email.value);
        //     const checkStatePassword = PASSWORD_REGEX.test(Password.value);
        //     if(Firstname.value.trim().length > 1 && Lastname.value.trim() > 1 && Email.value > 9 && checkStatePassword){
               
        //         console.log("tugri");
        //     }
        //     else if(!checkStateEmail && !checkStatePassword){
        //         console.log(false);
        //     }
    










// Parol kiritilganda uni qiymatini ko'rish !!!
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
