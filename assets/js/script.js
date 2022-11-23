const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


let userData;


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
        userData = result;
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
            userData = result
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


$(function(){
    // "use strict";
    
    // ========== Form-select-option ========== //
    $('.radio-list input').click(function () {
      $('input:not(:checked)').parent().removeClass("active");
      $('input:checked').parent().addClass("active");
    }); 
    
    
    $('.check-list label').on('change', function(e) {
      e.stopPropagation();
      if($(this).hasClass('active')) {
        $(this).removeClass("active");
      } else if( !$(this).hasClass('active') ) {
        $(this).addClass("active");
      }
    });
   
    
    //multi form ===================================
    //DOM elements
    const DOMstrings = {
      stepsBtnClass: 'step',
      stepsBtns: document.querySelectorAll(`.step`),
      stepsBar: document.querySelector('.progress_bar'),
      stepsForm: document.querySelector('.multisteps_form'),
      stepFormPanelClass: 'multisteps_form_panel',
      stepFormPanels: document.querySelectorAll('.multisteps_form_panel'),
      stepPrevBtnClass: 'js-btn-prev',
      stepNextBtnClass: 'js-btn-next'
    };
    
    
    //remove class from a set of items
    const removeClasses = (elemSet, className) => {
      
      elemSet.forEach(elem => {
        
        elem.classList.remove(className);
        
      });
      
    };
    
    //return exect parent node of the element
    const findParent = (elem, parentClass) => {
      
      let currentNode = elem;
      
      while (!currentNode.classList.contains(parentClass)) {
        currentNode = currentNode.parentNode;
      }
      
      return currentNode;
      
    };
    
    //get active button step number
    const getActiveStep = elem => {
      return Array.from(DOMstrings.stepsBtns).indexOf(elem);
    };
    
    //set all steps before clicked (and clicked too) to active
    const setActiveStep = activeStepNum => {
      
      //remove active state from all the state
      removeClasses(DOMstrings.stepsBtns, 'active');
      removeClasses(DOMstrings.stepsBtns, 'current');
      
      //set picked items to active
      DOMstrings.stepsBtns.forEach((elem, index) => {
        if (index <= activeStepNum) {
          elem.classList.add('active');
          $(elem).addClass(index);
          
        }
        
        if (index == activeStepNum) {
          elem.classList.add('current');
        }
        
      });
    };
    
    //get active panel
    const getActivePanel = () => {
      
      let activePanel;
      
      DOMstrings.stepFormPanels.forEach(elem => {
        
        if (elem.classList.contains('active')) {
          
          activePanel = elem;
          
        }
        
      });
      
      return activePanel;
      
    };
    
    //open active panel (and close unactive panels)
    const setActivePanel = activePanelNum => {
      
      const animation = $(DOMstrings.stepFormPanels, 'active').attr("data-animation");
      
      //remove active class from all the panels
      removeClasses(DOMstrings.stepFormPanels, 'active');
      removeClasses(DOMstrings.stepFormPanels, animation);
      removeClasses(DOMstrings.stepFormPanels, 'animate__animated');
      
      //show active panel
      DOMstrings.stepFormPanels.forEach((elem, index) => {
        if (index === activePanelNum) {
          
          elem.classList.add('active');
          // stepFormPanels
          elem.classList.add('animate__animated', animation);
          
          setTimeout(function() {
            removeClasses(DOMstrings.stepFormPanels, 'animate__animated', animation);
          }, 1200);
          
          setFormHeight(elem);
          
        }
      });
      
    };
    
    
    //set form height equal to current panel height
    const formHeight = activePanel => {
      
      const activePanelHeight = activePanel.offsetHeight;
      
      DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
      
    };
    
    const setFormHeight = () => {
      const activePanel = getActivePanel();
      
      formHeight(activePanel);
    };
    
    //STEPS BAR CLICK FUNCTION
    DOMstrings.stepsBar.addEventListener('click', e => {
      
      //check if click target is a step button
      const eventTarget = e.target;
      
      if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
        return;
      }
      
      //get active button step number
      const activeStep = getActiveStep(eventTarget);
      
      //set all steps before clicked (and clicked too) to active
      // setActiveStep(activeStep);
      
      //open active panel
      // setActivePanel(activeStep);
    });
    
    //PREV/NEXT BTNS CLICK
    DOMstrings.stepsForm.addEventListener('click', e => {
      
      const eventTarget = e.target;
      
      //check if we clicked on `PREV` or NEXT` buttons
      if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
        return;
      }
      
      //find active panel
      const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
      
      let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
      
      
      //set active step and active panel onclick
      if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ) {
        activePanelNum--;
        
        setActiveStep(activePanelNum);
        setActivePanel(activePanelNum);
        
      } else if(eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)  ) { 
        
        var form = $('#wizard');
        
        var parent_fieldset = $('.multisteps_form_panel.active');
        var next_step = true;
        
        parent_fieldset.find('.required').each( function(){
          next_step = false;
          var form = $('.required');
          form.validate();
          $(this).addClass('invalid is-invalid');
        }); 
        
        if( next_step === true || form.valid() === true ) {
          // $("html, body").animate({
          //     scrollTop: 0
          // }, 600);
          activePanelNum++;
          setActiveStep(activePanelNum);
          setActivePanel(activePanelNum);
        }
        
        
      } 
      
      
    });
    
    //SETTING PROPER FORM HEIGHT ONLOAD
    window.addEventListener('load', setFormHeight, true);
    
    //SETTING PROPER FORM HEIGHT ONRESIZE
    window.addEventListener('resize', setFormHeight, true);
    
    
  });


function resultQuiz(){
  let form = document.getElementById('wizard');
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
  /*.then(setTimeout(function(){
    window.location.href = '../pages/result.html'
  }, 500))*/
  .catch(error => console.log("error", error));
}