// forms
const signUpForm = document.querySelector('#register');
const loginForm = document.querySelector('#login');

// Sign up inputs
const registerName = document.querySelector('#name');
const registerPn = document.querySelector('#pn');
const registerEmail = document.querySelector('#email');
const registerTelnumber = document.querySelector('#telnumber');

// Login inputs
const emailLogin = document.querySelector('#emailLogin');

// error messages
const errorMsg = document.querySelector('#error');
const error2 = document.querySelector('#error2');

signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const registerDetails = {
        name: registerName.value,
        pn: registerPn.value,
        email: registerEmail.value,
        telnumber: registerTelnumber.value,
    };

    fetch('/authorize/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerDetails)
    })
    .then(res => res.json())
    .then(response => { 
        if(response.error) {
            errorMsg.innerHTML = response.error;
        } else {
            console.log(response);
            errorMsg.innerHTML = '';
            localStorage.setItem('auth-token', response.token);
            location.href = response.redirect;
        }
    });
});



loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginDetails = {
        email: emailLogin.value
    };
    fetch('/authorize/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error) {
            error2.innerHTML = response.error;
        } else {
            error2.innerHTML = '';
            localStorage.setItem('auth-token', response.token);
            location.href = response.redirect;
        }
    })
});