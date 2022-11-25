const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let divMessage = document.getElementById('fail-msg');



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
    .then(async response =>  {
        if(!response.ok){
            const err = await response.json();
            divMessage.style.display = 'flex' ;
            divMessage.innerHTML = err.error;
            console.log(err);
            throw Error(response.statusText);
        }
        return response.json();//
    })
    .then(result => {
        const userData = result;
        const userDataAsJson = JSON.stringify(userData);
        sessionStorage.setItem('myData', userDataAsJson);
        console.log(userData);
    })
    .then(setTimeout(function(){
        window.location.href = '../pages/quiz.html'
    }, 500))
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


    function validatePassword(fPassword, fRePassword){
        if(fPassword != fRePassword) {
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


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch("http://18.228.39.241:3333/auth/register", requestOptions)
        .then(async response =>  {
            if(!response.ok){
                const err = await response.json();
                console.log(err)
                divMessage.style.display = 'flex' ;
                divMessage.innerHTML = err.error;
                throw Error(response.statusText)
            }
            return response.json()//
        })
        .then(result => {
            const userData = result
            console.log(userData)//
            const userDataAsJson = JSON.stringify(userData);
            sessionStorage.setItem('myData', userDataAsJson);
            divMessage.style.display = 'flex' ;
            divMessage.innerHTML = "Cadastro Efetuado";
            divMessage.style.color = 'green';
        })
        .then(setTimeout(function(){
          window.location.href = '../pages/quiz.html'
        }, 500))
        .catch(error => console.log("error", error));
    }
    else{
        divMessage.style.display = 'flex' ;
        divMessage.innerHTML = "Senhas Diferentes";
    }
}


function resultQuiz(){
  const form = document.getElementById('wizard');
  let answers = [];
  let resultado = 0;
  let text = ' ';

  //Pegar as respostas formulário
  answers.push(parseInt(form.stp_1_valor_selecao.value));
  answers.push(parseInt(form.stp_2_valor_selecao.value));
  answers.push(parseInt(form.stp_3_valor_selecao.value));
  answers.push(parseInt(form.stp_4_valor_selecao.value));
  answers.push(parseInt(form.stp_5_valor_selecao.value));
  answers.push(parseInt(form.stp_6_valor_selecao.value));
  answers.push(parseInt(form.stp_7_valor_selecao.value));
  answers.push(parseInt(form.stp_8_valor_selecao.value));

  //Cálculo do resultado do quiz
  for(let i = 0 ; i<9 ; i++){
    if((i === 0) || (i === 1) || (i === 2) || (i === 4)){
      switch(answers[i]){
        case 0:
          resultado += 0*0.10;
          break;
        case 1:
          resultado += 0.25*0.10;
          break;
        case 2:
          resultado += 0.5*0.10;
          break;
        case 3:
          resultado += 1*0.10;
          break;
      }
    }
    else if(i === 3){
      switch(answers[i]){
        case 0:
          resultado += 0*0.15;
          break;
        case 1:
          resultado += 0.25*0.15;
          break;
        case 2:
          resultado += 0.5*0.15;
          break;
        case 3:
          resultado += 1*0.15;
          break;
      }
    }
    else if(i === 5){
      switch(answers[i]){
        case 0:
          resultado += 0*0.05;
          break;
        case 1:
          resultado += 0.25*0.05;
          break;
        case 2:
          resultado += 0.5*0.05;
          break;
        case 3:
          resultado += 1*0.05;
          break;
      }
    }
    else if((i === 6) || (i === 7)){
      switch(answers[i]){
        case 0:
          resultado += 0*0.20;
          break;
        case 1:
          resultado += 0.25*0.20;
          break;
        case 2:
          resultado += 0.5*0.20;
          break;
        case 3:
          resultado += 1*0.20;
          break;
      }
    }
  }


  resultado  = resultado * 10;


  if (resultado < 2.99) {
      text = 'Iniciante';
      console.log(text);
  }
  else if ((resultado >= 3.00) && (resultado <= 4.99)){
      text = 'Básico';
      console.log(text);
  }
  else if ((resultado >= 5.00) && (resultado <= 6.99)){
      text = 'Intermediário';
      console.log(text);
  }
  else if ((resultado >= 7.00) && (resultado <= 8.99)){
      text = 'Intermediário Superior';
      console.log(text);
  }
  else if (resultado >= 9.00){
      text = 'Avançado';
      console.log(text);
  }


  const keyValue = sessionStorage.getItem('myData')
  const data = JSON.parse(keyValue);


  myHeaders.append("Authorization", `Bearer ${data.token}`);


  const raw = JSON.stringify({
    result: text,
    userId: data.user.id
  });


  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


  fetch("http://18.228.39.241:3333/quiz/register", requestOptions)
  .then(async response =>  {
    if(!response.ok){
        throw Error(response.statusText)
    }
    return response.json()//
  })
  .then(
    result => {
      const resultAsJson = JSON.stringify(result);
      sessionStorage.setItem('myResult', resultAsJson);
    }
  )
  .then(setTimeout(function(){
    window.location.href = '../pages/result.html'
  }, 500))
  .catch(error => console.log("error", error));
}


function loadResult(){

  const keyValue = sessionStorage.getItem('myResult')
  const data = JSON.parse(keyValue);

  document.getElementById("result").innerHTML = data.result.result;
}