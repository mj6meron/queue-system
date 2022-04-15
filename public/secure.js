

//const name = document.querySelector('#QueueBox');
//const email = document.querySelector('#useremail');


//const employment = document.querySelector('#useremployment');
const profile = document.querySelector('#Profile');
const container = document.querySelector('#container');
const leave = document.querySelector('#leave');
let userId = 0
getId()

// HERE WE ONLY ACCEPT TERRAFIC WITH AUTHORIZATION TOKEN IN LOCAL STORAGE
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

    // LEAVE BUTTON EVENT LISTNERS
    leave.addEventListener('click',()=>{
        try {
            fetch('/deleteUser', {
                method: 'PATCH', 
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body : JSON.stringify({"id":userId})
            })
        } catch(ex) {
            console.error('some error while sending the patch on leave button! -> ', ex);
        }
    })

    // PROFILE BUTTON EVENT HANDLERS
    profile.addEventListener('click', ()=>{
        console.log('we hit this bitch --- Profile!')
        })  

// ELSE THERE IS NO AUTHORIZATION WE LEAVE!!!          
} else{
    document.body.innerHTML = '';
    document.write('You are logged out =)')
}

// -------------------------------------------------------------------------------------------

  //GET MY ID FETCH
  function getId () { 
    fetch('/getDetails/myId', {
        method: 'GET',
        headers : {
            'auth-token': localStorage.getItem('auth-token')
        } 
    }).then(data=>data.json())
    .then(result=> {
        console.log('id is result:-->' , result[0].id)
        console.log('id tobe set , ')
         setId(result[0].id)
        }
        )   
    }
    function setId(id){
        userId = id
    }

    // FUNCTION TO VIEW ALL USERS IN THE QUEUE ie ACTIVE
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