// X91: Forgot password page main scripts

window.onload = () => {
  document.body.style.opacity = "1";
  document.getElementById('forgotPassBlock').style.transform =  "rotateX(0deg)";
}


//1. CHECKING EMAIL
function checkMail() {
  let userMail = document.getElementById('fMail').value;
  let errMessage = document.getElementById('mailErrMess');
  let loginBlock = document.getElementById('forgotPassBlock');
  let verifyBlock = document.getElementById('verifyEmailBlock');
  if(checkMailInput(userMail, errMessage)) {
    checkMailDb(userMail, errMessage, loginBlock, verifyBlock);
  }
  userMail.value = "";
}

//1.1 checking user input
function checkMailInput(email, error) {
  if(email == "") {
    showErrorMsg(error, ERR_MSG_TXT_EMAIL_EMPTY);
    return false;
  }
  else if(email.length > 30) {
    showErrorMsg(error, ERR_MSG_TEXT_LENGTH_ALL);
    return false;
  }
    /*
  else if(htkEmailValidation(email) == false) {
    showErrorMsg(error, ERR_MSG_TXT_WORK_EMAIL);
    return false;
  }
  */
  else {
    synchro(error);
    return true;
  }
}

//1.1.1 HTK validation email function
function htkEmailValidation(htkemail) {
  if(htkemail.includes("@hyundai.kz")) {
    return true;
  }
  else {return false;}
}

//2. CHECK EMAIL IN DB 
function checkMailDb(email, error, block, newblock) {
  $.ajax({
    data : {userMail : email},
    type : 'POST',
    url : '/verifymailprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        error.style.color = "green";
        error.textContent = SUCCESS_MSG_MAIN;
        //Display verification code form
        block.style.transform = "rotateX(90deg)";
        setTimeout(() => {
          newblock.style.transform = "rotateX(0deg)";
        }, "1500");
      }
      else if(data == 'NOK'){
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_WRONG_MAIL;
      }
      else {
        errMsg.style.color = "red";
        errMsg.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}


//3. CHECK VERIFICATION CODE
function checkCode() {
  let userCode = document.getElementById('fCode').value;
  let errMessage = document.getElementById('codeErrMess');
  let loginBlock = document.getElementById('verifyEmailBlock');
  if(checkCodeInput(userCode, errMessage)) {
    
  }
}

//3.1 Check code input 
function checkCodeInput(code, error) {
  if(code == "") {
    showErrorMsg(error, ERR_MSG_TXT_CODE_EMPTY);
    return false;
  }
  else if(code.length > 5) {
    showErrorMsg(error, ERR_MSG_TXT_CODE_INCORRECT);
    return false;
  }
  else if(((/^[0-9]+$/).test(code)) == false) {
    showErrorMsg(error, ERR_MSG_TXT_CODE_INCORRECT);
    return false;
  }
  else {
    synchro(error);
    return true;
  }
}

//4. Clear error message field
function clearErrorMsg(errMsg) {
  errMsg.style.visibility = "hidden";
}

//5. Show error message field
function showErrorMsg(errMsg, text) {
  errMsg.style.color = "red";
  errMsg.textContent = text;
  errMsg.style.visibility = "visible";
}

//6. Synchronization function
function synchro(err) {
  err.style.color = "orange";
  err.textContent = SYNCHRO_MAIN;
  err.style.visibility = "visible";
}