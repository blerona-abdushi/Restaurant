
function isValidEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/; 
    return emailRegex.test(email);

    
}

function validateForm(event) {
    event.preventDefault(); 

    
    const name = document.getElementById("name");
    const email = document.getElementById("emailInput");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");


    document.querySelectorAll('.error-message').forEach(error => error.remove());

    let isValid = true; 
    
    function showError(input){
        const error = document.createElement("p");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "14px"
        error.textContent = "Please fill all inputs";
        input.after(error);
    }
    if(name.value.trim()=== ""){
        showError(name, "Please fill in your name");
        isValid = false;
    };
    if(email.value.trim()=== ""){
        showError(email, "Please fill in your email");
        isValid = false;
    };
    if(subject.value.trim()=== ""){
        showError(subject, "Please fill in your subject");
        isValid = false;
    };
    if(message.value.trim()=== ""){
        showError(message,"Please fill in your message");
        isValid = false
    }
    if(isValid) {
        alert("form submidet sccussfully");
        
    }
}
document.querySelector(".email-form").addEventListener("submit", validateForm);
