const editName = document.querySelector('#nameEdit');
const editPn = document.querySelector('#pnEdit');
const editEmail = document.querySelector('#emailEdit');
const editTelnumber = document.querySelector('#telnumberEdit')
const errorMsg = document.querySelector('#errorP')
const editForm = document.querySelector('#editbox')


// NOW WE GET THE VALUE OF THE USER - OLD DETAILS
if (localStorage.getItem('auth-token')){
    fetch('/getDetails/aUser', {
        method: 'GET',
        headers : {
            'auth-token': localStorage.getItem('auth-token')
        } 
    }).then(result => result.json()).then(data => {
        console.log('here we get the data user --> ', data)
        editName.setAttribute("placeholder", `${data.name}`)
        editPn.setAttribute("placeholder", `${data.pn}` )
        editEmail.setAttribute("placeholder", `${data.email}` )
        editTelnumber.setAttribute("placeholder", `${data.telnumber}` )
         
        }
    )

}else{

    document.body.innerHTML = '';
    document.write('You are logged out =)')
}
//---------------------------------------------------------------------------------

// THIS FUNCTION VALIDATES THE USER INPUTS AND EVERYTHING
const validateDetails = ()=> {
    return {
    "name": editName.value ==''? editName.placeholder : editName.value,
    "pn": editPn.value ==''? editPn.placeholder: editPn.value ,
    "email": editEmail.value ==''? editEmail.placeholder: editEmail.value,
    "telnumber": editTelnumber.value ==''? editTelnumber.placeholder: editTelnumber.value,
    }
};

// WHEN SAVE CHANGES IS FIRED
editForm.addEventListener('submit', e => {
    e.preventDefault();
    // here we get the input value, validate and send
    const ourdata = validateDetails() 
    console.log('here is the final edits --> ', ourdata)
        try {
            fetch('/editUser/saveChanges', {
                method: 'PATCH', 
                headers: {"Content-type": "application/json; charset=UTF-8", 
                'auth-token': localStorage.getItem('auth-token')},
                body : JSON.stringify(ourdata)
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
        } catch(ex) {
            console.error('some error while sending the patch on save Edit button! -> ', ex);
        }

})