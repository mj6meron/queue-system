

//const name = document.querySelector('#QueueBox');
//const email = document.querySelector('#useremail');
//const employment = document.querySelector('#useremployment');
const profile = document.querySelector('#Profile');
const container = document.querySelector('#container');
const leave = document.querySelector('#leave');

if (localStorage.getItem('auth-token')){
    fetch('/getDetails/allUsers', {
        method: 'GET',
        headers : {
            'auth-token': localStorage.getItem('auth-token')
        } 
    })
    .then(result => result.json())
    .then(data => {
        viewall(data)
        console.log('Here we have a list of all users: -> ', data)
        }
    )
    leave.addEventListener('click', ()=>{
        console.log('we hit this bitch')
        localStorage.clear();
    })
    profile.addEventListener('click', ()=>{
        console.log('we hit this bitch --- Profile!')
    })    
} else{
    document.body.innerHTML = '';
    document.write('You are logged out =)')
}



function viewall(allnotes) {
    allnotes.forEach((item)=> {
        queueBox = document.createElement('div')
        queueBox.setAttribute("id", "queueBoxxx")
        document.getElementById('container').appendChild(queueBox);
        let nameP = document.createElement('p');
        let emailP = document.createElement('p');
            //let pnP = document.createElement('p');
            //let telnumberP = document.createElement('p');
        // assign them ids
        nameP.setAttribute("id", "nameUser")
        emailP.setAttribute("id", "emailUser")
            //pnP.setAttribute("id", "pnUser")
            //telnumberP.setAttribute("id", "telnumberUser")
        // append Children to the new box
        queueBox.appendChild(nameP)
        queueBox.appendChild(emailP)
            //queueBox.appendChild(pnP)
            //queueBox.appendChild(telnumberP)
        // Fill the values from the list
        nameP.innerHTML = item.name;
            //pnP.innerHTML = item.pn;
        emailP.innerHTML = item.email;
            //telnumberP.innerHTML = item.telnumber;
    });
}


 /**
     name.innerHTML = `${data.name}`
     pn.innerHTML  = `${data.pn}`
     email.innerHTML  = `${data.email}`
     telnumber.innerHTML  = `${data.telnumber}`
     */