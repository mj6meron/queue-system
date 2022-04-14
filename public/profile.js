const name = document.querySelector('#name');
const pn = document.querySelector('#pn');
const email = document.querySelector('#email');
const telnumber = document.querySelector('#telnumber');
const leave = document.querySelector('#leave');

if (localStorage.getItem('auth-token')){
    
    fetch('/getDetails/aUser', {
        method: 'GET',
        headers : {
            'auth-token': localStorage.getItem('auth-token')
        } 
    }).then(result => result.json()).then(data => {
            name.innerHTML = `${data.name}`
            pn.innerHTML  = `${data.pn}`
            email.innerHTML  = `${data.email}`
            telnumber.innerHTML  = `${data.telnumber}`
        }
    )
    leave.addEventListener('click', leaveFunction)

}else{

    document.body.innerHTML = '';
    document.write('You are logged out =)')
}

// back function fired on the back button click - performs simmilar to login 
// redirects to dashboard aka main queue view channel
function backFunction(){
    const backDetails = {
        email: emailLogin.value
    };
    fetch('/authorize/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(backDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error) {
            console.log("Here is an error while getting BACK, fetching error")
        } else {
            localStorage.setItem('auth-token', response.token);
            location.href = response.redirect;
        }
    })   

}

// fired on leave button click 
function leaveFunction (){
    console.log('we hit this bitch - we tryna leave')
    localStorage.clear();
    }

