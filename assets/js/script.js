const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


let userData;


function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    let raw = JSON.stringify({
        email: email,
        password: password
    })


    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    fetch("http://18.228.39.241:3333/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => {
        userData = result
        console.log(result)
        userData = JSON.parse(userData)
        console.log(userData)
    })
    /*.then(setTimeout(function(){
        window.location.href = '../pages/termo.html'
    }, 5000))*/
    .catch(error => console.log('error', error));
}


function register(){
    const firstName = (document.getElementById('register-firstName').value).toUpperCase();
    const lastName = (document.getElementById('register-lastName').value).toUpperCase();
    const companyName = (document.getElementById('register-companyName').value).toUpperCase();
    const email = (document.getElementById('register-email').value);
    const phone = (document.getElementById('register-phone').value);
    const password = (document.getElementById('register-password').value);
    const rePassword = (document.getElementById('register-confirm-password').value);


    let divMessage = document.getElementById('form_msg');


    function validatePassword(password, rePassword){
        if(password != rePassword) {
            return false;
        } 
        else {
            return true;
        }
    }


    if(validatePassword(password, rePassword)){
        let raw = JSON.stringify({
            firstName,
            lastName,
            companyName,
            email,
            phone,
            password
        });

        divMessage.style.display = 'flex' ;
        divMessage.innerHTML = "Cadastro Efetuado";
        console.log(raw);
    }
    else{
        divMessage.style.display = 'flex' ;
        divMessage.innerHTML = "Senhas Diferentes";
    }
}


